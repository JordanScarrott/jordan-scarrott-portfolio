import { Effect } from './Effect';

export class SineWaveEffect extends Effect {
    constructor(amplitude = 10, frequency = 0.05, speed = 0.002) {
        super();
        this.amplitude = amplitude;
        this.frequency = frequency;
        this.speed = speed;
    }

    apply(grid, context) {
        const { points, cols, rows } = grid;
        const { time } = context;

        for (let x = 0; x < cols; x++) {
            for (let y = 0; y < rows; y++) {
                const p = points[x][y];
                // Apply a vertical offset based on x position and time
                const offset = Math.sin(x * this.frequency + time * this.speed) * this.amplitude;

                // We add to the velocity or position?
                // If we modify position directly, the spring force will fight it.
                // If we modify velocity, it will create a wave.
                // Let's modify the target 'baseY' temporarily or just add a force?

                // Adding a force (acceleration) is more physically correct for this system.
                // But simple displacement is easier to control.

                // Let's try adding to velocity (force)
                // p.vy += offset * 0.01;

                // Alternatively, we can modulate the spring target (baseY).
                // But the current implementation uses `p.baseY` which is static.
                // If we want a standing wave, we could change `p.baseY`.

                // Let's try adding a small force based on the wave derivative (velocity of the wave)
                // or just push it.

                p.vy += Math.cos(x * this.frequency + time * this.speed) * this.amplitude * 0.05;
            }
        }
    }
}
