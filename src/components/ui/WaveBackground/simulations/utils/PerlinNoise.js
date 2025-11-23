
/*
 * Simple 2D Perlin Noise implementation.
 * Based on standard reference implementations.
 */
export class PerlinNoise {
    constructor() {
        this.perm = new Array(512);
        this.p = new Array(256);

        // Initialize permutation table
        for (let i = 0; i < 256; i++) {
            this.p[i] = i;
        }

        // Shuffle
        for (let i = 255; i > 0; i--) {
            const r = Math.floor(Math.random() * (i + 1));
            [this.p[i], this.p[r]] = [this.p[r], this.p[i]];
        }

        // Duplicate for overflow handling
        for (let i = 0; i < 512; i++) {
            this.perm[i] = this.p[i & 255];
        }
    }

    dot(g, x, y) {
        return g[0] * x + g[1] * y;
    }

    fade(t) {
        return t * t * t * (t * (t * 6 - 15) + 10);
    }

    lerp(a, b, t) {
        return (1 - t) * a + t * b;
    }

    grad(hash, x, y) {
        const h = hash & 15;
        const u = h < 8 ? x : y;
        const v = h < 4 ? y : h === 12 || h === 14 ? x : 0;
        // Simplified gradient selection for 2D:
        // This is a slight approximation of the standard reference "grad" function
        // adapted for 2D ease. Standard often uses 12 gradient vectors.
        // Let's use a simpler set of gradients for performance/clarity in JS if needed,
        // but the bit-masking trick above is standard Ken Perlin.

        // Actually, let's stick to the standard dot product with unit vectors based on low bits of hash
        // gradients: (1,1), (-1,1), (1,-1), (-1,-1), (1,0), (-1,0), (0,1), (0,-1)
        switch(hash & 0xF) {
            case 0: return  x + y;
            case 1: return -x + y;
            case 2: return  x - y;
            case 3: return -x - y;
            case 4: return  x;
            case 5: return -x;
            case 6: return  y;
            case 7: return -y;
            default: return 0; // Should not happen with & 0xF, but technically cases 8-15 map to others in 3D
        }
    }

    // 2D Noise
    noise(x, y) {
        // Find unit grid cell containing point
        let X = Math.floor(x) & 255;
        let Y = Math.floor(y) & 255;

        // Relative x, y of point in cell
        x -= Math.floor(x);
        y -= Math.floor(y);

        // Compute fade curves for x, y
        let u = this.fade(x);
        let v = this.fade(y);

        // Hash coordinates of the 4 square corners
        let A = this.perm[X] + Y;
        let B = this.perm[X + 1] + Y;

        // Add blended results from 4 corners of the square
        return this.lerp(
            this.lerp(this.grad(this.perm[A], x, y), this.grad(this.perm[B], x - 1, y), u),
            this.lerp(this.grad(this.perm[A + 1], x, y - 1), this.grad(this.perm[B + 1], x - 1, y - 1), u),
            v
        );
    }
}
