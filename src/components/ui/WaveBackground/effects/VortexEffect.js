import { Effect } from './Effect';

export class VortexEffect extends Effect {
    constructor(config = {}) {
        super();
        this.radius = config.radius || 200;
        this.strength = config.strength || 0.5;
        this.swirlSpeed = config.swirlSpeed || 0.1;
    }

    apply(grid, context) {
        const { points, cols, rows } = grid;
        const { mouseX, mouseY, time } = context;

        // Add a pulsing effect to the radius
        const pulse = Math.sin(time * 0.005) * 50;
        const effectiveRadius = this.radius + pulse;

        for (let x = 0; x < cols; x++) {
            for (let y = 0; y < rows; y++) {
                const p = points[x][y];
                const dx = p.x - mouseX;
                const dy = p.y - mouseY;
                const distSq = dx * dx + dy * dy;
                const dist = Math.sqrt(distSq);

                if (dist < effectiveRadius && dist > 1) { // Avoid division by zero
                    const factor = (effectiveRadius - dist) / effectiveRadius;

                    // Rotational force (The Vortex)
                    // We want to push the point perpendicular to the radius vector
                    // Tangent vector is (-dy, dx)
                    const rotX = -dy;
                    const rotY = dx;

                    // Normalize and apply strength
                    p.vx += (rotX / dist) * factor * this.strength * 2;
                    p.vy += (rotY / dist) * factor * this.strength * 2;

                    // Attraction force (Gravity)
                    // Pull towards center
                    p.vx -= (dx / dist) * factor * this.strength * 0.5;
                    p.vy -= (dy / dist) * factor * this.strength * 0.5;

                    // Color effect: Change color based on proximity/energy
                    // Closer to center = hotter/brighter
                    if (factor > 0.5) {
                        // Purple/Pink/Cyan gradient
                        // Standard is rgba(56, 189, 248, 0.4) (Sky-400)
                        // Let's make it shift to purple/magenta
                        const r = Math.floor(56 + (200 * factor));
                        const g = Math.floor(189 - (100 * factor));
                        const b = 248;
                        const a = 0.4 + (factor * 0.6); // More opaque near center
                        p.color = `rgba(${r}, ${g}, ${b}, ${a})`;
                    } else {
                        // Reset to default-ish smoothly if we want, but the simulation
                        // re-inits colors or we should set it back if we want it temporary.
                        // However, the WaveSimulation init sets default.
                        // If we don't set it back, it stays this color until re-init or overwritten.
                        // Let's reset it if it's not affected, or just let it fade?
                        // The simulation loop doesn't reset color every frame.
                        // So we must reset it if we want it to return to normal.

                        // BUT: Iterating all points to reset color might be expensive if we do it carelessly.
                        // Actually, let's just set it for points in range.
                        // Ideally, we should have a "baseColor" property on points to revert to.
                        // But I don't want to modify the core simulation too much.
                        // Let's just assume we want the trail to persist or fade slowly?
                        // Let's set it back if it's NOT in range? No, that's iterating everything.

                        // Let's just set it.
                        // p.color = "rgba(56, 189, 248, 0.4)";
                    }
                } else {
                     // Slowly revert color
                     // This is a bit hacky, checking string values, but let's just force reset for now to ensure cleanliness
                     // Optimization: Only do this if it's not the default color?
                     // p.color = "rgba(56, 189, 248, 0.4)";

                     // To avoid string parsing/creation overhead every frame for every point,
                     // maybe we accept that points outside stay colored?
                     // Or we only color them when they are moving fast?

                     // Let's try to be efficient.
                     if (p.color !== "rgba(56, 189, 248, 0.4)") {
                         p.color = "rgba(56, 189, 248, 0.4)";
                     }
                }
            }
        }
    }
}
