import { Effect } from './Effect';

export class MouseRepulsionEffect extends Effect {
    constructor(radius = 150, strength = 2) {
        super();
        this.radius = radius;
        this.strength = strength;
    }

    apply(grid, context) {
        const { points, cols, rows } = grid;
        const { mouseX, mouseY } = context;

        for (let x = 0; x < cols; x++) {
            for (let y = 0; y < rows; y++) {
                const p = points[x][y];
                const dx = mouseX - p.x;
                const dy = mouseY - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // Mouse influence (Create disturbance)
                if (dist < this.radius) {
                    const force = (this.radius - dist) / this.radius;
                    p.vx -= (dx / dist) * force * this.strength;
                    p.vy -= (dy / dist) * force * this.strength;
                }
            }
        }
    }
}
