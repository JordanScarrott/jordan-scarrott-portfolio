import React, { useEffect, useRef } from 'react';
import { WaveSimulation } from './WaveSimulation';
import { MouseRepulsionEffect } from './effects/MouseRepulsionEffect';

const WaveBackground = ({ behaviors = [] }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const simulation = new WaveSimulation(canvas);
        let animationFrameId;

        // Mouse interaction state
        let mouseX = -1000;
        let mouseY = -1000;

        // Initialize simulation
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        simulation.init();

        // Add default mouse effect
        simulation.addEffect(new MouseRepulsionEffect());

        // Add custom behaviors
        behaviors.forEach(behavior => simulation.addEffect(behavior));

        const animate = (time) => {
            simulation.update({ mouseX, mouseY, time });
            simulation.draw();
            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            simulation.init();
        };

        animate(0);

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [behaviors]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none bg-slate-950"
        />
    );
};

export default WaveBackground;
