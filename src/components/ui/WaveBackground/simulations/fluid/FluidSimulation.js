import { Simulation } from '../Simulation';

export class FluidSimulation extends Simulation {
    constructor(canvas, config = {}) {
        super(canvas, config);
        this.particleCount = config.particleCount || 400;
        this.particles = [];
        this.interactions = [];
        this.baseColor = config.baseColor || "rgba(56, 189, 248, 0.6)";
    }

    addInteraction(interaction) {
        this.interactions.push(interaction);
    }

    init() {
        super.init();
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push(this.createParticle());
        }
    }

    createParticle() {
        return {
            x: Math.random() * this.width,
            y: Math.random() * this.height,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5,
            radius: Math.random() * 2 + 1,
            color: this.baseColor,
            mass: 1
        };
    }

    update(context) {
        // Apply interactions
        for (const interaction of this.interactions) {
            interaction.apply(this.particles, context, { width: this.width, height: this.height });
        }

        // Physics update
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];

            // Apply velocity
            p.x += p.vx;
            p.y += p.vy;

            // Boundary wrap
            if (p.x < 0) p.x = this.width;
            if (p.x > this.width) p.x = 0;
            if (p.y < 0) p.y = this.height;
            if (p.y > this.height) p.y = 0;

            // Simple friction/damping if needed, but for now free flow
            // p.vx *= 0.99;
            // p.vy *= 0.99;
        }
    }

    draw() {
        const { ctx, width, height } = this;
        ctx.clearRect(0, 0, width, height);

        // Render particles
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            ctx.beginPath();
            ctx.fillStyle = p.color;
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
        }

        // Optional: Render connections for close particles (Simulate fluid tension visually)
        ctx.beginPath();
        ctx.strokeStyle = "rgba(56, 189, 248, 0.1)";
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const p1 = this.particles[i];
                const p2 = this.particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distSq = dx * dx + dy * dy;

                if (distSq < 4000) { // Distance < ~63
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                }
            }
        }
        ctx.stroke();
    }
}
