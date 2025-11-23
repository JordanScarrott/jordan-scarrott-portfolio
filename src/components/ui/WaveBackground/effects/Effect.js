// Base class for WaveBackground effects
export class Effect {
    /**
     * Called when the effect is initialized.
     * @param {object} config - Configuration object
     * @param {number} config.width - Canvas width
     * @param {number} config.height - Canvas height
     */
    init(config) {}

    /**
     * Applies the effect to the grid.
     * @param {object} grid - Grid object containing points
     * @param {Array<Array<object>>} grid.points - 2D array of points
     * @param {number} grid.cols - Number of columns
     * @param {number} grid.rows - Number of rows
     * @param {object} context - Animation context
     * @param {number} context.mouseX - Current mouse X position
     * @param {number} context.mouseY - Current mouse Y position
     * @param {number} context.time - Elapsed time
     */
    apply(grid, context) {
        throw new Error("Effect must implement apply method");
    }
}
