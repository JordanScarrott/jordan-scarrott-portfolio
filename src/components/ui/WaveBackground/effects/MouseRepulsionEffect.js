import { Effect } from './Effect';

export class MouseRepulsionEffect extends Effect {
    constructor(radius = 150, strength = 2) {
        super();
        this.radius = radius;
        this.strength = strength;
    }

    apply(grid, context) {
        const { points, cols, rows, spacing } = grid;
        const { mouseX, mouseY } = context;

        // Optimization: Only iterate points near the mouse using spatial hashing logic.
        // We calculate the bounding box of the effect radius in grid coordinates.
        // We add a safety buffer (e.g., 4 cells) because points can be displaced from their base grid position.

        // If mouse is far off screen, we can skip entirely
        // width ~ cols * spacing, height ~ rows * spacing
        const width = cols * spacing;
        const height = rows * spacing;

        if (mouseX < -this.radius || mouseX > width + this.radius ||
            mouseY < -this.radius || mouseY > height + this.radius) {
            return;
        }

        const buffer = 4; // Buffer in grid cells to account for particle displacement
        const radiusInCells = Math.ceil(this.radius / spacing) + buffer;

        const mouseCol = Math.round(mouseX / spacing);
        const mouseRow = Math.round(mouseY / spacing);

        const minCol = Math.max(0, mouseCol - radiusInCells);
        const maxCol = Math.min(cols, mouseCol + radiusInCells);
        const minRow = Math.max(0, mouseRow - radiusInCells);
        const maxRow = Math.min(rows, mouseRow + radiusInCells);

        const radiusSq = this.radius * this.radius;

        for (let x = minCol; x < maxCol; x++) {
            for (let y = minRow; y < maxRow; y++) {
                const p = points[x][y];
                const dx = mouseX - p.x;
                const dy = mouseY - p.y;

                // Use squared distance check first to avoid expensive sqrt
                const distSq = dx * dx + dy * dy;

                if (distSq < radiusSq) {
                    const dist = Math.sqrt(distSq);
                    // Avoid divide by zero if dist is tiny (unlikely but safe)
                    if (dist > 0.001) {
                        const force = (this.radius - dist) / this.radius;
                        p.vx -= (dx / dist) * force * this.strength;
                        p.vy -= (dy / dist) * force * this.strength;
                    }
                }
            }
        }
    }
}
