import React from 'react';

const SocialLink = ({ href, label, icon: Icon }) => (
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

export default SocialLink;
