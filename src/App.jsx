import {
    Activity,
    Cpu,
    Mail,
    Maximize2,
    Minus,
    Terminal,
    Trophy,
    Waves,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { experience } from "./data/experience";
import { projects } from "./data/projects";
import { skills } from "./data/skills";
import { socialLinks } from "./data/socials";
import { initialLogs, possibleLogs } from "./data/terminal";
import HeaderSocialLink from "./components/ui/HeaderSocialLink";
import ProjectCard from "./components/ui/ProjectCard";
import SocialLink from "./components/ui/SocialLink";
import MetricItem from "./components/ui/MetricItem";
import WaveBackground from "./components/ui/WaveBackground/WaveBackground";
import { SineWaveEffect } from "./components/ui/WaveBackground/effects/SineWaveEffect";
import { ColorShiftEffect } from "./components/ui/WaveBackground/effects/ColorShiftEffect";

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
    const [logs, setLogs] = useState(initialLogs);

    // Log generation
    useEffect(() => {
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
            {/* Header Bar */}
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-800/50 hover:bg-slate-800 focus-within:bg-slate-800 transition-colors rounded-t-lg">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex-grow p-2 text-left flex items-center gap-2 font-bold text-slate-400 focus:outline-none focus-visible:text-slate-200 focus-visible:ring-2 focus-visible:ring-cyan-500/50 rounded-tl-lg"
                    aria-expanded={isOpen}
                    aria-controls="terminal-body"
                >
                    <Terminal size={12} /> CASTOR_AGENT
                </button>
                <div className="flex items-center gap-2 pr-2">
                    {/* DevPost Link in Header */}
                    <a
                        href="https://devpost.com/software/a-la-carte?ref_content=user-portfolio&ref_feature=in_progress"
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-500 hover:text-emerald-400 transition-colors p-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 focus-visible:text-emerald-400"
                        title="View Competition Entry"
                        aria-label="View Competition Entry on DevPost"
                    >
                        <Trophy size={12} />
                    </a>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-slate-500 hover:text-slate-300 p-1 rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 focus-visible:text-slate-300"
                        aria-label={isOpen ? "Minimize terminal" : "Maximize terminal"}
                    >
                        {isOpen ? <Minus size={12} /> : <Maximize2 size={12} />}
                    </button>
                </div>
            </div>

            {/* Terminal Body */}
            {isOpen && (
                <div
                    id="terminal-body"
                    className="p-3 space-y-1 h-32 overflow-hidden bg-black/20 rounded-b-lg flex flex-col justify-end"
                >
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
    // eslint-disable-next-line no-unused-vars
    const [activeSection, setActiveSection] = useState("home");

    const scrollTo = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setActiveSection(id);
        }
    };

    // Example of adding custom effects
    // You can toggle these or add them conditionally
    // Memoized to prevent re-initialization of WaveBackground on every render
    const waveEffects = useMemo(() => [
        // new SineWaveEffect(10, 0.05, 0.002), // Uncomment to enable global wave
        new ColorShiftEffect(), // Enables dynamic color based on velocity
    ], []);

    return (
        <div className="min-h-screen text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
            <WaveBackground behaviors={waveEffects} variant="grid" />
            {/* <WaveBackground behaviors={waveEffects} variant="fluid" /> */}
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
                        {socialLinks.map((link, index) => (
                            <HeaderSocialLink
                                key={index}
                                href={link.href}
                                icon={link.icon}
                                label={link.label}
                            />
                        ))}
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
                            </div>
                        </div>

                        {/* Skills Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {skills.map((skill, idx) => (
                                <MetricItem
                                    key={idx}
                                    name={skill.name}
                                    icon={skill.icon}
                                />
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
                        {experience.map((job, index) => (
                            <div
                                key={index}
                                className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group ${
                                    job.active ? "is-active" : ""
                                }`}
                            >
                                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-700 bg-slate-900 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:border-cyan-400 transition-colors">
                                    {job.active ? (
                                        <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                                    ) : (
                                        <div className="w-2 h-2 bg-slate-500 rounded-full group-hover:bg-purple-400 transition-colors"></div>
                                    )}
                                </div>
                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-900/80 p-6 rounded-xl border border-slate-800 shadow-xl backdrop-blur-sm hover:border-purple-500/30 transition-all">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-white text-lg">
                                            {job.title}
                                        </h3>
                                        <span
                                            className={`text-xs font-mono px-2 py-1 rounded ${
                                                job.active
                                                    ? "text-cyan-400 bg-cyan-950"
                                                    : "text-slate-500 bg-slate-900 border border-slate-800"
                                            }`}
                                        >
                                            {job.period}
                                        </span>
                                    </div>
                                    <p className="text-slate-400 text-sm mb-3">
                                        {job.company}
                                    </p>
                                    <ul className="text-sm text-slate-400 list-disc list-inside space-y-1">
                                        {job.description.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
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
                        {projects.map((project, index) => (
                            <ProjectCard
                                key={index}
                                title={project.title}
                                desc={project.desc}
                                tags={project.tags}
                                links={project.links}
                                color={project.color}
                            />
                        ))}
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
                        {socialLinks.map((link, index) => (
                            <SocialLink
                                key={index}
                                href={link.href}
                                icon={link.icon}
                                label={link.label}
                            />
                        ))}
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

export default App;
