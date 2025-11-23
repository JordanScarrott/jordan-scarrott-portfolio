/**
 * Base class for WaveBackground simulations.
 * All simulations must implement these methods.
 */
export class Simulation {
    constructor(canvas, config = {}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.width = 0;
        this.height = 0;
        this.config = config;
    }

    /**
     * Initialize the simulation (e.g., create particles/grid).
     */
    init() {
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }

    /**
     * Update the simulation state.
     * @param {object} context - { mouseX, mouseY, time, ... }
     */
    update(context) {
        throw new Error("Simulation must implement update()");
    }

    /**
     * Render the simulation to the canvas.
     */
    draw() {
        throw new Error("Simulation must implement draw()");
    }

    /**
     * Add an effect or interaction to the simulation.
     * @param {object} effect
     */
    addEffect(effect) {
        // Optional implementation
    }
}
