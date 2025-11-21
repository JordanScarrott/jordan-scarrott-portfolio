import React from 'react';

export const CoffeeIcon = ({ size, className }) => (
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

export const XIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

export const BlueskyIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565-.131 2.032-.268 3.036.226 4.39c1.12 3.065 3.396 5.24 4.606 6.236-1.513-.206-5.713.037-5.64 4.563.033 2.048 1.406 3.52 2.777 4.36 1.872 1.147 3.816.526 5.198-.491 1.694-1.245 2.036-2.649 4.833-7.196 2.797 4.547 3.139 5.951 4.833 7.196 1.382 1.017 3.326 1.638 5.198.491 1.371-.84 2.744-2.312 2.777-4.36.073-4.526-4.127-4.769-5.64-4.563 1.21-.996 3.486-3.171 4.606-6.236.494-1.354.357-2.358-.676-2.825-.659-.299-1.664-.621-4.3 1.24C16.046 4.748 13.087 8.686 12 10.8z" />
    </svg>
);
