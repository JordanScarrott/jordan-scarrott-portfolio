import { Github, ExternalLink, Trophy } from "lucide-react";

export const projects = [
    {
        title: "Castor - On-Device AI",
        desc: "Supercharged Gemini Nano with Google Mangle compiled to WASM to perform multi-step cross-tab deductive reasoning locally. An on-device AI extension capable of complex logical inference.",
        tags: [
            "WASM",
            "Gemini Nano",
            "Google Mangle",
            "Reasoning",
        ],
        links: [
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
        ],
        color: "cyan",
    },
    {
        title: "Boussinesq Waves",
        desc: "Masters research: Temporal and spectral analysis of experimental and numerical Boussinesq waves on beaches.",
        tags: ["Fluid Sim", "Math", "Signal Processing"],
        links: [
            {
                label: "GitHub",
                url: "https://github.com/JordanScarrott/boussinesq-waves",
                icon: Github,
            },
        ],
        color: "purple",
    },
];
