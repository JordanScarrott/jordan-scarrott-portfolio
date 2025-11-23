export class SpatialGrid {
    constructor(width, height, cellSize) {
        this.cellSize = cellSize;
        this.cols = Math.ceil(width / cellSize);
        this.rows = Math.ceil(height / cellSize);
        this.buckets = new Map();
    }

    clear() {
        this.buckets.clear();
    }

    add(particle) {
        const key = this.getKey(particle.x, particle.y);
        if (!this.buckets.has(key)) {
            this.buckets.set(key, []);
        }
        this.buckets.get(key).push(particle);
    }

    getKey(x, y) {
        const cx = Math.floor(x / this.cellSize);
        const cy = Math.floor(y / this.cellSize);
        return `${cx},${cy}`;
    }

    getNeighbors(particle, searchRadius) {
        const neighbors = [];
        const col = Math.floor(particle.x / this.cellSize);
        const row = Math.floor(particle.y / this.cellSize);
        const radiusInCells = Math.ceil(searchRadius / this.cellSize);

        for (let i = -radiusInCells; i <= radiusInCells; i++) {
            for (let j = -radiusInCells; j <= radiusInCells; j++) {
                const key = `${col + i},${row + j}`;
                const cellParticles = this.buckets.get(key);
                if (cellParticles) {
                    for (const other of cellParticles) {
                        if (other !== particle) {
                            neighbors.push(other);
                        }
                    }
                }
            }
        }
        return neighbors;
    }
}
