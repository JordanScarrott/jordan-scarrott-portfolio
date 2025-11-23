import React, { useEffect, useRef } from 'react';
import { GridSimulation } from './simulations/grid/GridSimulation';
import { FluidSimulation } from './simulations/fluid/FluidSimulation';
import { MouseRepulsionEffect } from './effects/MouseRepulsionEffect';
import { CursorObstruction } from './simulations/fluid/CursorObstruction';
import { ClickSplash } from './simulations/fluid/ClickSplash';

const WaveBackground = ({
    behaviors = [],
    variant = 'grid', // 'grid' | 'fluid'
    simulationConfig = {}
}) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        let simulation;
        let animationFrameId;

        // Mouse interaction state
        let mouseX = -1000;
        let mouseY = -1000;
        let isClicked = false;

        // Instantiate Simulation based on variant
        if (variant === 'fluid') {
            simulation = new FluidSimulation(canvas, simulationConfig);
            // Add default fluid interactions
            simulation.addInteraction(new CursorObstruction());
            simulation.addInteraction(new ClickSplash());
        } else {
            simulation = new GridSimulation(canvas, simulationConfig);
            // Add default grid effect
            simulation.addEffect(new MouseRepulsionEffect());
        }

        // Initialize simulation
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        simulation.init();

        // Add custom behaviors (Consumers must ensure behaviors match the variant)
        if (variant === 'grid') {
             behaviors.forEach(behavior => simulation.addEffect(behavior));
        } else if (variant === 'fluid') {
             behaviors.forEach(behavior => simulation.addInteraction(behavior));
        }

        const animate = (time) => {
            simulation.update({ mouseX, mouseY, isClicked, time });
            simulation.draw();
            // Reset click state after one frame of processing if needed,
            // but for continuous splash while holding, we keep it.
            // If ClickSplash is instantaneous, it should handle 'just pressed' logic,
            // but here we pass 'isClicked' as "is mouse down".

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        };

        const handleMouseDown = () => {
            isClicked = true;
        };

        const handleMouseUp = () => {
            isClicked = false;
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            simulation.init();
        };

        animate(0);

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            cancelAnimationFrame(animationFrameId);
        };
    }, [behaviors, variant, simulationConfig]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none bg-slate-950"
        />
    );
};

export default WaveBackground;
