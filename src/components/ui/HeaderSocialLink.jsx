import React from 'react';

const HeaderSocialLink = ({ href, label, icon: Icon }) => (
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

export default HeaderSocialLink;
