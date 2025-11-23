import { Simulation } from '../Simulation';
import { SpatialGrid } from '../utils/SpatialGrid';

export class FluidSimulation extends Simulation {
    constructor(canvas, config = {}) {
        super(canvas, config);
        this.particleCount = config.particleCount || 400;
        this.particles = [];
        this.interactions = [];
        this.baseColor = config.baseColor || "rgba(56, 189, 248, 0.6)";

        // SPH Constants (Tunable for visual effect)
        this.smoothingRadius = config.smoothingRadius || 60; // Interaction radius (h)
        this.targetDensity = config.targetDensity || 3; // Rest density
        this.pressureMultiplier = config.pressureMultiplier || 150; // Stiffness (k)
        this.viscosityStrength = config.viscosityStrength || 0.1;

        this.grid = null;
    }

    addInteraction(interaction) {
        this.interactions.push(interaction);
    }

    init() {
        super.init();
        this.particles = [];
        this.grid = new SpatialGrid(this.width, this.height, this.smoothingRadius);

        const rows = Math.sqrt(this.particleCount);
        const cols = this.particleCount / rows;
        const startX = (this.width - cols * 20) / 2;
        const startY = (this.height - rows * 20) / 2;

        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: startX + (i % cols) * 20 + Math.random() * 5,
                y: startY + Math.floor(i / cols) * 20 + Math.random() * 5,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                radius: Math.random() * 2 + 2, // Slightly larger
                color: this.baseColor,
                density: 0,
                pressure: 0,
                fx: 0,
                fy: 0
            });
        }
    }

    // Smoothing Kernel (Poly6)
    poly6(dist, radius) {
        if (dist >= radius) return 0;
        const diff = radius * radius - dist * dist;
        // Normalization constant approx for 2D: 315 / (64 * PI * h^9)
        // We simplify constant since pressureMultiplier is arbitrary
        return diff * diff * diff;
    }

    // Spiky Gradient Kernel for Pressure
    spikyGradient(dist, radius) {
        if (dist >= radius) return 0;
        const diff = radius - dist;
        return diff * diff; // Simplified, direction handled in force loop
    }

    update(context) {
        // 1. Build Grid
        this.grid.clear();
        for (const p of this.particles) {
            this.grid.add(p);
            p.fx = 0;
            p.fy = 0;
        }

        // 2. Compute Density & Pressure
        for (const p of this.particles) {
            let density = 0;
            const neighbors = this.grid.getNeighbors(p, this.smoothingRadius);

            for (const other of neighbors) {
                const dx = p.x - other.x;
                const dy = p.y - other.y;
                const distSq = dx * dx + dy * dy;

                if (distSq < this.smoothingRadius * this.smoothingRadius) {
                    const dist = Math.sqrt(distSq);
                    density += this.poly6(dist, this.smoothingRadius);
                }
            }
            // Avoid zero density
            p.density = Math.max(0.1, density);
            // Equation of state: P = k * (rho - rho0)
            p.pressure = this.pressureMultiplier * (p.density - this.targetDensity);
        }

        // 3. Compute Forces (Pressure + Viscosity)
        for (const p of this.particles) {
            const neighbors = this.grid.getNeighbors(p, this.smoothingRadius);

            for (const other of neighbors) {
                const dx = p.x - other.x;
                const dy = p.y - other.y;
                const distSq = dx * dx + dy * dy;

                if (distSq > 0 && distSq < this.smoothingRadius * this.smoothingRadius) {
                    const dist = Math.sqrt(distSq);

                    // Pressure Force
                    // Fp = - mass * (Pi + Pj)/(2 * rho_j) * grad(W)
                    // Simplified SPH Force
                    const forceMag = (p.pressure + other.pressure) / (2 * other.density) * this.spikyGradient(dist, this.smoothingRadius);
                    const dirX = dx / dist;
                    const dirY = dy / dist;

                    p.fx += dirX * forceMag;
                    p.fy += dirY * forceMag; // Newton's 3rd law handled by loop visiting both? No, we iterate all, so applying once is correct per pair if we visit all pairs. But getNeighbors visits all.
                }
            }
        }

        // 4. External Interactions
        for (const interaction of this.interactions) {
            interaction.apply(this.particles, context, { width: this.width, height: this.height });
        }

        // 5. Integration (Euler)
        for (const p of this.particles) {
            // F = ma (assume m=1) -> a = F
            // Apply forces
            // Limit force to prevent explosion
            const maxForce = 20;
            p.fx = Math.max(-maxForce, Math.min(maxForce, p.fx));
            p.fy = Math.max(-maxForce, Math.min(maxForce, p.fy));

            p.vx += p.fx * 0.05; // Time step
            p.vy += p.fy * 0.05;

            // Global Damping (Drag)
            p.vx *= 0.98;
            p.vy *= 0.98;

            // Apply Velocity
            p.x += p.vx;
            p.y += p.vy;

            // Boundaries (Bounce)
            const margin = p.radius;
            const damping = 0.6;
            if (p.x < margin) { p.x = margin; p.vx *= -damping; }
            if (p.x > this.width - margin) { p.x = this.width - margin; p.vx *= -damping; }
            if (p.y < margin) { p.y = margin; p.vy *= -damping; }
            if (p.y > this.height - margin) { p.y = this.height - margin; p.vy *= -damping; }
        }
    }

    draw() {
        const { ctx, width, height } = this;
        ctx.clearRect(0, 0, width, height);

        // Render SPH particles (Blobs)
        // To make it look "fluid", we could use thresholding or metaballs,
        // but for clean 2D canvas, we draw soft circles and connections.

        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            ctx.beginPath();
            // Vary alpha based on pressure/density for visual effect?
            ctx.fillStyle = p.color;
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
        }

        // Connections (Tensile strength visualization)
        ctx.beginPath();
        ctx.strokeStyle = "rgba(56, 189, 248, 0.15)";
        ctx.lineWidth = 1;

        // Optimization: Draw connections only for neighbors using grid
        for (const p of this.particles) {
             const neighbors = this.grid.getNeighbors(p, this.smoothingRadius * 0.8);
             for (const other of neighbors) {
                 // Draw line to neighbor
                 // Optimization: Only draw if index is greater to avoid double draw
                 // But we don't have indices easily accessible here without extra lookups.
                 // We'll just draw.
                 if (p.x < other.x) { // Simple deduplication
                     ctx.moveTo(p.x, p.y);
                     ctx.lineTo(other.x, other.y);
                 }
             }
        }
        ctx.stroke();
    }
}
