import { PerlinNoise } from '../utils/PerlinNoise';

export class NoiseFlowField {
    constructor(config = {}) {
        this.noise = new PerlinNoise();
        this.scale = config.scale || 0.005; // Scale of the noise pattern
        this.forceStrength = config.forceStrength || 0.2; // Strength of the force
        this.timeScale = config.timeScale || 0.0005; // Speed of noise evolution
    }

    apply(particle, { width, height, time }) {
        // Calculate noise value based on particle position and time
        // We offset time to make the field evolve
        const n = this.noise.noise(
            particle.x * this.scale,
            particle.y * this.scale + time * this.timeScale
        );

        // Map noise value (-1 to 1) to an angle (0 to 2*PI or similar)
        const angle = n * Math.PI * 4;

        // Convert angle to force vector
        const fx = Math.cos(angle) * this.forceStrength;
        const fy = Math.sin(angle) * this.forceStrength;

        // Apply force to particle
        particle.fx += fx;
        particle.fy += fy;
    }
}
