import React from 'react';

const SkipToContent = () => {
    return (
        <a
            href="#main-content"
            className="fixed top-4 left-4 z-50 -translate-y-[150%] focus:translate-y-0 bg-cyan-500 text-slate-900 px-6 py-3 rounded-lg font-bold shadow-lg shadow-cyan-500/50 transition-transform duration-300 ease-out outline-none focus:ring-4 focus:ring-white/50"
        >
            Skip to content
        </a>
    );
};

export default SkipToContent;
