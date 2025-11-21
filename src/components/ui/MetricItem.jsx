import React from 'react';

const MetricItem = ({ name, icon: Icon }) => {
    return (
        <div
            className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl flex flex-col items-center justify-center gap-3 hover:bg-slate-800 hover:border-cyan-500/50 transition-all group text-center cursor-default backdrop-blur-sm"
        >
            <Icon
                className="text-slate-500 group-hover:text-cyan-400 transition-colors"
                size={24}
            />
            <span className="text-sm font-medium text-slate-300">
                {name}
            </span>
        </div>
    );
};

export default MetricItem;
