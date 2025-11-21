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
import { CoffeeIcon } from "../components/ui/Icons";

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
