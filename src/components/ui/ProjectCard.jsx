import React from 'react';
import { Code2 } from "lucide-react";

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
                {links.map((link, i) => {
                    const LinkIcon = link.icon;
                    return (
                        <a
                            key={i}
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors"
                        >
                            <LinkIcon size={16} /> {link.label}
                        </a>
                    );
                })}
            </div>
        </div>
    );
};

export default ProjectCard;
