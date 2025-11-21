import {
    Activity,
    Box,
    Code2,
    Cpu,
    Database,
    Layers,
    Search,
    Zap,
} from "lucide-react";

// Custom CoffeeIcon because it's not in lucide-react exports in the original file
// Wait, I need to handle the icons.
// The icons are components. If I put them in a data file, I need to import them there.
// The original App.jsx imports them from 'lucide-react' and defines 'CoffeeIcon' locally.

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

export const skills = [
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
