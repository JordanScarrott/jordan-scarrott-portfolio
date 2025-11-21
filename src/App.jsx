import React, { useState, useEffect, useRef, useMemo } from "react";
import {
    Github,
    Linkedin,
    Mail,
    ExternalLink,
    Terminal,
    Cpu,
    Waves,
    Code2,
    Database,
    Activity,
    Zap,
    Box,
    Layers,
    BrainCircuit,
    Trophy,
    Minus,
    Maximize2,
    Search,
} from "lucide-react";

// --- COMPONENT: INTERACTIVE WAVE BACKGROUND ---
// A nod to "Boussinesq Waves" and Numerical Fluid Simulation
const WaveBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let animationFrameId;

        // Grid settings
        const spacing = 25;
        let cols, rows;
        let points = [];

        // Mouse interaction
        let mouseX = -1000;
        let mouseY = -1000;

        const init = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            cols = Math.ceil(canvas.width / spacing);
            rows = Math.ceil(canvas.height / spacing);
            points = [];

            for (let x = 0; x < cols; x++) {
                points[x] = [];
                for (let y = 0; y < rows; y++) {
                    points[x][y] = {
                        x: x * spacing,
                        y: y * spacing,
                        baseX: x * spacing,
                        baseY: y * spacing,
                        vx: 0,
                        vy: 0,
                        force: 0,
                        damp: 0.95, // Damping factor for wave decay
                    };
                }
            }
        };

        const update = () => {
            // Interaction force
            for (let x = 0; x < cols; x++) {
                for (let y = 0; y < rows; y++) {
                    const p = points[x][y];
                    const dx = mouseX - p.x;
                    const dy = mouseY - p.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    // Mouse influence (Create disturbance)
                    if (dist < 150) {
                        const force = (150 - dist) / 150;
                        p.vx -= (dx / dist) * force * 2;
                        p.vy -= (dy / dist) * force * 2;
                    }

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
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw connections (Grid lines)
            ctx.beginPath();
            ctx.strokeStyle = "rgba(56, 189, 248, 0.15)"; // Sky-400 with low opacity

            // Horizontal lines
            for (let y = 0; y < rows; y++) {
                ctx.moveTo(points[0][y].x, points[0][y].y);
                for (let x = 1; x < cols; x++) {
                    // Simple quadratic curve for smoother lines
                    const xc = (points[x][y].x + points[x - 1][y].x) / 2;
                    const yc = (points[x][y].y + points[x - 1][y].y) / 2;
                    ctx.quadraticCurveTo(
                        points[x - 1][y].x,
                        points[x - 1][y].y,
                        xc,
                        yc
                    );
                }
            }

            // Vertical lines
            for (let x = 0; x < cols; x++) {
                ctx.moveTo(points[x][0].x, points[x][0].y);
                for (let y = 1; y < rows; y++) {
                    const xc = (points[x][y].x + points[x][y - 1].x) / 2;
                    const yc = (points[x][y].y + points[x][y - 1].y) / 2;
                    ctx.quadraticCurveTo(
                        points[x][y - 1].x,
                        points[x][y - 1].y,
                        xc,
                        yc
                    );
                }
            }
            ctx.stroke();

            // Draw Nodes (Particles)
            ctx.fillStyle = "rgba(56, 189, 248, 0.4)";
            for (let x = 0; x < cols; x++) {
                for (let y = 0; y < rows; y++) {
                    const p = points[x][y];
                    // Only draw if displaced significantly to save performance
                    if (
                        Math.abs(p.x - p.baseX) > 0.5 ||
                        Math.abs(p.y - p.baseY) > 0.5
                    ) {
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            }
        };

        const animate = () => {
            update();
            draw();
            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        };

        const handleResize = () => {
            init();
        };

        init();
        animate();

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none bg-slate-950"
        />
    );
};

// --- COMPONENT: GLITCH TEXT EFFECT ---
const GlitchText = ({ text, className }) => {
    return (
        <div className={`relative group inline-block ${className}`}>
            <span className="relative z-10">{text}</span>
            <span className="absolute top-0 left-0 -ml-0.5 translate-x-[1px] text-cyan-400 opacity-0 group-hover:opacity-70 group-hover:animate-pulse">
                {text}
            </span>
            <span className="absolute top-0 left-0 -ml-0.5 -translate-x-[1px] text-red-400 opacity-0 group-hover:opacity-70 group-hover:animate-pulse delay-75">
                {text}
            </span>
        </div>
    );
};

// --- COMPONENT: SYSTEM TERMINAL ---
// A nod to "Castor" and Engineering background
const SystemTerminal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [logs, setLogs] = useState([
        "> CASTOR_AGENT: ONLINE",
        "> CONTEXT: " + window.navigator.userAgent.slice(0, 20) + "...",
        "> DEDUCTION: User is human.",
        "> MESSAGE: Welcome to the portfolio.",
    ]);

    // Log generation
    useEffect(() => {
        const possibleLogs = [
            "> Reasoning: Analyzing scroll velocity...",
            "> Inference: User interest detected in 'Architecture'.",
            "> Querying: Cross-referencing session duration...",
            "> Fact Base: Updating local knowledge graph...",
            "> Mangle Logic: Validating user intent...",
            "> Gemini Nano: Context window optimized.",
            "> Deduction: High probability of technical background.",
            "> Observation: Mouse trajectory implies curiosity.",
        ];

        const interval = setInterval(() => {
            if (Math.random() > 0.6) {
                const newLog =
                    possibleLogs[
                        Math.floor(Math.random() * possibleLogs.length)
                    ];
                setLogs((prev) => [...prev.slice(-3), newLog]);
            }
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className={`fixed bottom-6 right-6 bg-slate-900/90 border border-slate-700 rounded-lg font-mono text-xs text-emerald-400 shadow-2xl backdrop-blur-md z-50 hidden md:flex flex-col transition-all duration-300 ${
                isOpen ? "w-96" : "w-64"
            }`}
        >
            {/* Header Bar - Clickable to Toggle */}
            <div
                className="flex items-center justify-between p-2 border-b border-slate-800 bg-slate-800/50 cursor-pointer hover:bg-slate-800 transition-colors rounded-t-lg"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-slate-400 flex items-center gap-2 font-bold">
                    <Terminal size={12} /> CASTOR_AGENT
                </span>
                <div className="flex items-center gap-2">
                    {/* DevPost Link in Header */}
                    <a
                        href="https://devpost.com/software/a-la-carte?ref_content=user-portfolio&ref_feature=in_progress"
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-500 hover:text-emerald-400 transition-colors"
                        onClick={(e) => e.stopPropagation()} // Prevent toggle when clicking link
                        title="View Competition Entry"
                    >
                        <Trophy size={12} />
                    </a>
                    <div className="text-slate-500 hover:text-slate-300">
                        {isOpen ? <Minus size={12} /> : <Maximize2 size={12} />}
                    </div>
                </div>
            </div>

            {/* Terminal Body */}
            {isOpen && (
                <div className="p-3 space-y-1 h-32 overflow-hidden bg-black/20 rounded-b-lg">
                    {logs.map((log, i) => (
                        <div
                            key={i}
                            className="animate-fade-in opacity-80 leading-relaxed break-words"
                        >
                            {log}
                        </div>
                    ))}
                    <div className="animate-pulse">_</div>
                </div>
            )}
        </div>
    );
};

// --- MAIN APP COMPONENT ---
const App = () => {
    const [activeSection, setActiveSection] = useState("home");

    const scrollTo = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setActiveSection(id);
        }
    };

    // Skills Data
    const skills = [
        { name: "Microservices", icon: Layers, level: "Advanced", cat: "Arch" },
        {
            name: "Distributed Systems",
            icon: Box,
            level: "Advanced",
            cat: "Arch",
        },
        { name: "Vue / Nuxt", icon: Code2, level: "Advanced", cat: "Frontend" },
        {
            name: "Java Spring Boot",
            icon: CoffeeIcon,
            level: "Advanced",
            cat: "Backend",
        },
        {
            name: "Go / Golang",
            icon: Zap,
            level: "Intermediate",
            cat: "Backend",
        },
        {
            name: "WebAssembly",
            icon: Cpu,
            level: "Specialist",
            cat: "Performance",
        },
        { name: "Elasticsearch", icon: Search, level: "Advanced", cat: "Data" },
        {
            name: "Signal Processing",
            icon: Activity,
            level: "Academic",
            cat: "Math",
        },
        { name: "PostgreSQL", icon: Database, level: "Advanced", cat: "Data" },
    ];

    return (
        <div className="min-h-screen text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
            <WaveBackground />
            <SystemTerminal />

            {/* NAVIGATION */}
            <nav className="fixed top-0 w-full z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50">
                <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div
                        className="font-mono text-cyan-400 font-bold text-xl tracking-tighter flex items-center gap-2 cursor-pointer hover:text-cyan-300 transition-colors"
                        onClick={() => scrollTo("home")}
                    >
                        Jordan Scarrott
                    </div>

                    <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
                        {["About", "Experience", "Work", "Contact"].map(
                            (item) => (
                                <button
                                    key={item}
                                    onClick={() => scrollTo(item.toLowerCase())}
                                    className="hover:text-cyan-400 transition-colors relative group"
                                >
                                    <span className="relative z-10">
                                        0
                                        {[
                                            "About",
                                            "Experience",
                                            "Work",
                                            "Contact",
                                        ].indexOf(item) + 1}
                                        . {item}
                                    </span>
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                                </button>
                            )
                        )}
                    </div>

                    {/* Header Socials */}
                    <div className="flex items-center gap-4">
                        <HeaderSocialLink
                            href="https://github.com/JordanScarrott"
                            icon={Github}
                            label="GitHub"
                        />
                        <HeaderSocialLink
                            href="https://www.linkedin.com/in/jordan-scarrott-b14b161b6/"
                            icon={Linkedin}
                            label="LinkedIn"
                        />
                        <HeaderSocialLink
                            href="https://x.com/JordanScarrott5"
                            icon={XIcon}
                            label="X (Twitter)"
                        />
                        <HeaderSocialLink
                            href="https://bsky.app/profile/jordanscarrott.bsky.social"
                            icon={BlueskyIcon}
                            label="Bluesky"
                        />
                    </div>
                </div>
            </nav>

            {/* HERO SECTION */}
            <section
                id="home"
                className="relative min-h-screen flex items-center justify-center pt-20 px-6"
            >
                <div className="max-w-4xl mx-auto text-center z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm mb-6 animate-fade-in-up">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                        Software Engineer | Computer Systems Specialist
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
                        <GlitchText text="Designing" />{" "}
                        <span className="text-slate-500">Robust</span>
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                            Dynamic Systems
                        </span>
                    </h1>

                    <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
                        I build secure, performant, scalable microservices and
                        tackle the most difficult technical problems by
                        leveraging a deep understanding of computer systems.
                        Passionate about AI and the cutting edge, I bridge the
                        gap between theoretical potential and deployed reality.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <button
                            onClick={() => scrollTo("work")}
                            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(6,182,212,0.5)] flex items-center gap-2"
                        >
                            View Projects <Waves size={18} />
                        </button>
                        <button
                            onClick={() => scrollTo("contact")}
                            className="bg-transparent border border-slate-600 hover:border-white text-slate-300 hover:text-white py-3 px-8 rounded-lg transition-all flex items-center gap-2"
                        >
                            Contact Me <Mail size={18} />
                        </button>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-600">
                    <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-slate-500 to-transparent"></div>
                </div>
            </section>

            {/* ABOUT / STATISTICS */}
            <section id="about" className="relative py-24 bg-slate-950/80 z-10">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                                <Activity className="text-cyan-400" />
                                The Engineer's Mindset
                            </h2>
                            <p className="text-slate-400 mb-6 text-lg leading-relaxed">
                                With an MEng (Cum Laude) in Electrical
                                Engineering focusing on
                                <span className="text-cyan-300">
                                    {" "}
                                    numerical fluid simulation
                                </span>
                                , I approach software not just as code, but as a
                                dynamic system.
                            </p>
                            <p className="text-slate-400 mb-6 leading-relaxed">
                                I specialize in breaking down complex,
                                distributed problems into manageable,
                                parallelizable chunks. Whether it's optimizing
                                an O(N) algorithm to O(1) or compiling logical
                                reasoning engines to WASM, I focus on iterative
                                development. I build robust developer processes
                                to ensure complex features are rolled out
                                progressively with fast feedback loops.
                            </p>

                            <div className="grid grid-cols-2 gap-4 mt-8">
                                <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg hover:border-cyan-500/30 transition-colors">
                                    <div className="text-3xl font-bold text-white mb-1">
                                        4+
                                    </div>
                                    <div className="text-sm text-slate-500">
                                        Years Experience
                                    </div>
                                </div>
                                {/* <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg hover:border-cyan-500/30 transition-colors">
                                    <div className="text-3xl font-bold text-white mb-1">
                                        97%
                                    </div>
                                    <div className="text-sm text-slate-500">
                                        Cache Optimization
                                    </div>
                                </div> */}
                            </div>
                        </div>

                        {/* Skills Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {skills.map((skill, idx) => (
                                <div
                                    key={idx}
                                    className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl flex flex-col items-center justify-center gap-3 hover:bg-slate-800 hover:border-cyan-500/50 transition-all group text-center cursor-default backdrop-blur-sm"
                                >
                                    <skill.icon
                                        className="text-slate-500 group-hover:text-cyan-400 transition-colors"
                                        size={24}
                                    />
                                    <span className="text-sm font-medium text-slate-300">
                                        {skill.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* EXPERIENCE TIMELINE (Signal Trace Aesthetic) */}
            <section id="experience" className="relative py-24 z-10">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-white mb-12 text-center">
                        Signal Trace: Experience
                    </h2>

                    <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
                        {/* Job 1 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-700 bg-slate-900 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:border-cyan-400 transition-colors">
                                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                            </div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-900/80 p-6 rounded-xl border border-slate-800 shadow-xl backdrop-blur-sm hover:border-cyan-500/30 transition-all">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-white text-lg">
                                        Engineer
                                    </h3>
                                    <span className="text-xs font-mono text-cyan-400 bg-cyan-950 px-2 py-1 rounded">
                                        2024 - Present
                                    </span>
                                </div>
                                <p className="text-slate-400 text-sm mb-3">
                                    VASTech, Stellenbosch
                                </p>
                                <ul className="text-sm text-slate-400 list-disc list-inside space-y-1">
                                    <li>
                                        Led Vue 2 to Vue 3 migration for
                                        company's largest UI.
                                    </li>
                                    <li>
                                        Independently designed and led the
                                        adoption of a custom type-safe request
                                        management system with automatic
                                        caching.
                                    </li>
                                    <li>
                                        Led a team to design and implement an
                                        efficient AI based microservice.
                                    </li>
                                    <li>
                                        Architectural decision maker across
                                        teams.
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Job 2 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-700 bg-slate-900 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                <div className="w-2 h-2 bg-slate-500 rounded-full group-hover:bg-purple-400 transition-colors"></div>
                            </div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-900/80 p-6 rounded-xl border border-slate-800 shadow-xl backdrop-blur-sm hover:border-purple-500/30 transition-all">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-white text-lg">
                                        Junior Engineer
                                    </h3>
                                    <span className="text-xs font-mono text-slate-500 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                                        2023 - 2024
                                    </span>
                                </div>
                                <p className="text-slate-400 text-sm mb-3">
                                    VASTech, Stellenbosch
                                </p>
                                <ul className="text-sm text-slate-400 list-disc list-inside space-y-1">
                                    <li>
                                        Decreased audio algo complexity from
                                        O(N) to O(1).
                                    </li>
                                    <li>
                                        Web Audio API real-time processing
                                        implementation.
                                    </li>
                                    <li>
                                        Reduced high-volume request usage by
                                        97%.
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Job 3 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-700 bg-slate-900 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                <div className="w-2 h-2 bg-slate-500 rounded-full group-hover:bg-purple-400 transition-colors"></div>
                            </div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-900/80 p-6 rounded-xl border border-slate-800 shadow-xl backdrop-blur-sm hover:border-purple-500/30 transition-all">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-white text-lg">
                                        Graduate Junior Engineer
                                    </h3>
                                    <span className="text-xs font-mono text-slate-500 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                                        2022 - 2023
                                    </span>
                                </div>
                                <p className="text-slate-400 text-sm mb-3">
                                    VASTech, Stellenbosch
                                </p>
                                <ul className="text-sm text-slate-400 list-disc list-inside space-y-1">
                                    <li>
                                        High-security full-stack application
                                        development.
                                    </li>
                                    <li>
                                        Implemented gRPC APIs and Vue.js
                                        features.
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Job 4: MEng (Cum Laude) */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-700 bg-slate-900 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                <div className="w-2 h-2 bg-slate-500 rounded-full group-hover:bg-purple-400 transition-colors"></div>
                            </div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-900/80 p-6 rounded-xl border border-slate-800 shadow-xl backdrop-blur-sm hover:border-purple-500/30 transition-all">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-white text-lg">
                                        MEng (Cum Laude)
                                    </h3>
                                    <span className="text-xs font-mono text-slate-500 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                                        2020 - 2024
                                    </span>
                                </div>
                                <p className="text-slate-400 text-sm mb-3">
                                    CPUT, Bellville
                                </p>
                                <ul className="text-sm text-slate-400 list-disc list-inside space-y-1">
                                    <li>
                                        Temporal and Spectral Analysis of
                                        Experimental and Simulated Boussinesq
                                        Waves
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Job 5: BTech */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-700 bg-slate-900 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                <div className="w-2 h-2 bg-slate-500 rounded-full group-hover:bg-purple-400 transition-colors"></div>
                            </div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-900/80 p-6 rounded-xl border border-slate-800 shadow-xl backdrop-blur-sm hover:border-purple-500/30 transition-all">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-white text-lg">
                                        BTech - Electrical Engineering
                                    </h3>
                                    <span className="text-xs font-mono text-slate-500 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                                        2019
                                    </span>
                                </div>
                                <p className="text-slate-400 text-sm mb-3">
                                    CPUT, Bellville
                                </p>
                                <ul className="text-sm text-slate-400 list-disc list-inside space-y-1">
                                    <li>
                                        Created an AI robot that could follow
                                        you using TensorFlow.js object detection
                                        running on a smartphone.
                                    </li>
                                    <li>
                                        Simulated the control system for nuclear
                                        power plant fuel rod insertion using
                                        MATLAB.
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Job 6: Lab Assistant */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-700 bg-slate-900 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                <div className="w-2 h-2 bg-slate-500 rounded-full group-hover:bg-purple-400 transition-colors"></div>
                            </div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-900/80 p-6 rounded-xl border border-slate-800 shadow-xl backdrop-blur-sm hover:border-purple-500/30 transition-all">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-white text-lg">
                                        Lab Assistant / Trainee
                                    </h3>
                                    <span className="text-xs font-mono text-slate-500 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                                        2017 - 2018
                                    </span>
                                </div>
                                <p className="text-slate-400 text-sm mb-3">
                                    CPUT - Centre for Instrumentation Research
                                </p>
                                <ul className="text-sm text-slate-400 list-disc list-inside space-y-1">
                                    <li>
                                        Setup of optical systems for laser
                                        spectroscopy (quantum physics).
                                    </li>
                                    <li>
                                        Co-authored a paper modelling external
                                        cathode diode lasers.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROJECTS SECTION */}
            <section id="work" className="relative py-24 bg-slate-950/80 z-10">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-3">
                        <Cpu className="text-purple-400" /> Selected Works
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Project 1: Castor */}
                        <ProjectCard
                            title="Castor - On-Device AI"
                            desc="Supercharged Gemini Nano with Google Mangle compiled to WASM to perform multi-step cross-tab deductive reasoning locally. An on-device AI extension capable of complex logical inference."
                            tags={[
                                "WASM",
                                "Gemini Nano",
                                "Google Mangle",
                                "Reasoning",
                            ]}
                            links={[
                                {
                                    label: "GitHub",
                                    url: "https://github.com/JordanScarrott/castor-chrome-extension",
                                    icon: Github,
                                },
                                {
                                    label: "Demo",
                                    url: "https://www.youtube.com/watch?v=cirnnE6_dz4",
                                    icon: ExternalLink,
                                },
                                {
                                    label: "DevPost",
                                    url: "https://devpost.com/software/a-la-carte?ref_content=user-portfolio&ref_feature=in_progress",
                                    icon: Trophy,
                                },
                            ]}
                            color="cyan"
                        />

                        {/* Project 2: Boussinesq Waves */}
                        <ProjectCard
                            title="Boussinesq Waves"
                            desc="Masters research: Temporal and spectral analysis of experimental and numerical Boussinesq waves on beaches."
                            tags={["Fluid Sim", "Math", "Signal Processing"]}
                            links={[
                                {
                                    label: "GitHub",
                                    url: "https://github.com/JordanScarrott/boussinesq-waves",
                                    icon: Github,
                                },
                            ]}
                            color="purple"
                        />
                    </div>
                </div>
            </section>

            {/* CONTACT SECTION */}
            <section id="contact" className="relative py-24 z-10">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-white mb-8">
                        Ready to Deploy?
                    </h2>
                    <p className="text-slate-400 mb-10 text-lg">
                        I'm always open to discussing complex engineering
                        challenges and sharing perspectives on the latest tech.
                        If you want to geek out over systems architecture or AI,
                        get in touch.
                    </p>

                    <a
                        href="mailto:jordanscarrott@gmail.com"
                        className="inline-flex items-center gap-3 bg-slate-100 text-slate-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20"
                    >
                        <Mail /> Send Transmission
                    </a>

                    <div className="flex justify-center flex-wrap gap-6 mt-12">
                        <SocialLink
                            href="https://www.linkedin.com/in/jordan-scarrott-b14b161b6/"
                            icon={Linkedin}
                            label="LinkedIn"
                        />
                        <SocialLink
                            href="https://github.com/JordanScarrott"
                            icon={Github}
                            label="GitHub"
                        />
                        <SocialLink
                            href="https://x.com/JordanScarrott5"
                            icon={XIcon}
                            label="X (Twitter)"
                        />
                        <SocialLink
                            href="https://bsky.app/profile/jordanscarrott.bsky.social"
                            icon={BlueskyIcon}
                            label="Bluesky"
                        />
                    </div>
                </div>
            </section>

            <footer className="relative py-8 text-center text-slate-600 text-sm border-t border-slate-900 bg-slate-950 z-10">
                <p>
                    &copy; {new Date().getFullYear()} Jordan Scarrott. Built
                    with React & Tailwind.
                </p>
                <p className="font-mono text-xs mt-2 text-slate-700">
                    System.exit(0)
                </p>
            </footer>
        </div>
    );
};

// --- HELPER COMPONENTS ---

const ProjectCard = ({ title, desc, tags, links, color }) => {
    const borderColor =
        color === "cyan"
            ? "hover:border-cyan-500/50"
            : color === "purple"
            ? "hover:border-purple-500/50"
            : "hover:border-green-500/50";

    return (
        <div
            className={`bg-slate-900/50 border border-slate-800 rounded-xl p-6 flex flex-col transition-all group ${borderColor} hover:shadow-2xl hover:-translate-y-1 backdrop-blur-sm`}
        >
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {title}
                </h3>
                <div className="p-2 bg-slate-800 rounded-lg text-slate-400 group-hover:text-white transition-colors">
                    <Code2 size={20} />
                </div>
            </div>
            <p className="text-slate-400 text-sm mb-6 flex-grow leading-relaxed">
                {desc}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
                {tags.map((tag) => (
                    <span
                        key={tag}
                        className="text-xs font-mono px-2 py-1 bg-slate-800 text-slate-300 rounded border border-slate-700"
                    >
                        {tag}
                    </span>
                ))}
            </div>
            <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-800">
                {links.map((link, i) => (
                    <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors"
                    >
                        <link.icon size={16} /> {link.label}
                    </a>
                ))}
            </div>
        </div>
    );
};

const SocialLink = ({ href, icon: Icon, label }) => (
    <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={label}
        className="p-3 bg-slate-900 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 hover:border-slate-600 transition-all"
    >
        <Icon size={24} />
    </a>
);

const HeaderSocialLink = ({ href, icon: Icon, label }) => (
    <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={label}
        className="text-slate-400 hover:text-white hover:scale-110 transition-all"
    >
        <Icon size={20} />
    </a>
);

const CoffeeIcon = ({ size, className }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
    </svg>
);

const XIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const BlueskyIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565-.131 2.032-.268 3.036.226 4.39c1.12 3.065 3.396 5.24 4.606 6.236-1.513-.206-5.713.037-5.64 4.563.033 2.048 1.406 3.52 2.777 4.36 1.872 1.147 3.816.526 5.198-.491 1.694-1.245 2.036-2.649 4.833-7.196 2.797 4.547 3.139 5.951 4.833 7.196 1.382 1.017 3.326 1.638 5.198.491 1.371-.84 2.744-2.312 2.777-4.36.073-4.526-4.127-4.769-5.64-4.563 1.21-.996 3.486-3.171 4.606-6.236.494-1.354.357-2.358-.676-2.825-.659-.299-1.664-.621-4.3 1.24C16.046 4.748 13.087 8.686 12 10.8z" />
    </svg>
);

export default App;
