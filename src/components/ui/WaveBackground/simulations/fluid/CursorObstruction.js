import { FluidInteraction } from './FluidInteraction';

export class CursorObstruction extends FluidInteraction {
    constructor(radius = 100, strength = 0.5) {
        super();
        this.radius = radius;
        this.strength = strength;
    }

    apply(particles, context, bounds) {
        const { mouseX, mouseY } = context;
        if (mouseX == null || mouseY == null) return;

        const radiusSq = this.radius * this.radius;

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            const dx = p.x - mouseX;
            const dy = p.y - mouseY;
            const distSq = dx * dx + dy * dy;

            if (distSq < radiusSq && distSq > 0) {
                const dist = Math.sqrt(distSq);
                const force = (this.radius - dist) / this.radius;
                const fx = (dx / dist) * force * this.strength;
                const fy = (dy / dist) * force * this.strength;

                p.vx += fx;
                p.vy += fy;
            }
        }
    }
}
