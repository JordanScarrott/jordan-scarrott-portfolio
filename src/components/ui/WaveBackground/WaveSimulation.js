export class WaveSimulation {
    constructor(canvas, spacing = 25) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.spacing = spacing;
        this.points = [];
        this.cols = 0;
        this.rows = 0;
        this.effects = [];
        this.width = 0;
        this.height = 0;
    }

    addEffect(effect) {
        this.effects.push(effect);
        effect.init?.({ width: this.width, height: this.height });
    }

    init() {
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.cols = Math.ceil(this.width / this.spacing);
        this.rows = Math.ceil(this.height / this.spacing);
        this.points = [];

        for (let x = 0; x < this.cols; x++) {
            this.points[x] = [];
            for (let y = 0; y < this.rows; y++) {
                this.points[x][y] = {
                    x: x * this.spacing,
                    y: y * this.spacing,
                    baseX: x * this.spacing,
                    baseY: y * this.spacing,
                    vx: 0,
                    vy: 0,
                    force: 0,
                    damp: 0.95, // Damping factor for wave decay
                    color: "rgba(56, 189, 248, 0.4)" // Default color
                };
            }
        }

        // Re-init effects if needed
        this.effects.forEach(effect => effect.init?.({ width: this.width, height: this.height }));
    }

    update(context) {
        // Grid object to pass to effects
        const grid = {
            points: this.points,
            cols: this.cols,
            rows: this.rows,
            spacing: this.spacing
        };

        // 1. Apply all effects (External forces)
        for (const effect of this.effects) {
            effect.apply(grid, context);
        }

        // 2. Physics Update
        for (let x = 0; x < this.cols; x++) {
            for (let y = 0; y < this.rows; y++) {
                const p = this.points[x][y];

                // Spring back to grid (Elasticity)
                const dxBase = p.baseX - p.x;
                const dyBase = p.baseY - p.y;
                p.vx += dxBase * 0.05;
                p.vy += dyBase * 0.05;

                // Apply velocity
                p.x += p.vx;
                p.y += p.vy;

                // Damping
                p.vx *= p.damp;
                p.vy *= p.damp;
            }
        }
    }

    draw() {
        const { ctx, width, height, points, cols, rows } = this;
        ctx.clearRect(0, 0, width, height);

        // Draw connections (Grid lines)
        ctx.beginPath();
        ctx.strokeStyle = "rgba(56, 189, 248, 0.15)"; // Sky-400 with low opacity

        // Horizontal lines
        for (let y = 0; y < rows; y++) {
            if (!points[0] || !points[0][y]) continue;
            ctx.moveTo(points[0][y].x, points[0][y].y);
            for (let x = 1; x < cols; x++) {
                const p = points[x][y];
                const prevP = points[x - 1][y];
                const xc = (p.x + prevP.x) / 2;
                const yc = (p.y + prevP.y) / 2;
                ctx.quadraticCurveTo(prevP.x, prevP.y, xc, yc);
            }
        }

        // Vertical lines
        for (let x = 0; x < cols; x++) {
            if (!points[x] || !points[x][0]) continue;
            ctx.moveTo(points[x][0].x, points[x][0].y);
            for (let y = 1; y < rows; y++) {
                const p = points[x][y];
                const prevP = points[x][y - 1];
                const xc = (p.x + prevP.x) / 2;
                const yc = (p.y + prevP.y) / 2;
                ctx.quadraticCurveTo(prevP.x, prevP.y, xc, yc);
            }
        }
        ctx.stroke();

        // Draw Nodes (Particles)
        for (let x = 0; x < cols; x++) {
            for (let y = 0; y < rows; y++) {
                const p = points[x][y];
                // Only draw if displaced significantly to save performance
                if (
                    Math.abs(p.x - p.baseX) > 0.5 ||
                    Math.abs(p.y - p.baseY) > 0.5
                ) {
                    ctx.beginPath();
                    ctx.fillStyle = p.color; // Use dynamic color
                    ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }
    }
}
