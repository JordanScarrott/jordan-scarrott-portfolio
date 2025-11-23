import { Effect } from './Effect';

export class ColorShiftEffect extends Effect {
    apply(grid, context) {
        const { points, cols, rows } = grid;
        const { time } = context;

        for (let x = 0; x < cols; x++) {
            for (let y = 0; y < rows; y++) {
                const p = points[x][y];

                // Calculate speed
                const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);

                // If moving fast, shift to cyan/purple
                // Base color: rgba(56, 189, 248, 0.4) (Sky-400)

                // We can modulate opacity based on speed
                const opacity = Math.min(0.8, 0.4 + speed * 0.1);

                // We can modulate hue if we were using HSL, but we are using RGB strings.
                // Let's stick to opacity for now, or simple string replacement.

                if (speed > 0.5) {
                    p.color = `rgba(168, 85, 247, ${opacity})`; // Purple
                } else {
                    p.color = `rgba(56, 189, 248, ${opacity})`; // Sky Blue
                }
            }
        }
    }
}
