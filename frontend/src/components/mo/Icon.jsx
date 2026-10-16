import React from 'react';

// Íconos de trazo fino del sistema visual (24x24, currentColor)
const PATHS = {
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    arrowLeft: <path d="M19 12H5M11 6l-6 6 6 6" />,
    chevron: <path d="M6 9l6 6 6-6" />,
    close: <path d="M6 6l12 12M18 6L6 18" />,
    pin: (
        <>
            <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
            <circle cx="12" cy="9.5" r="2.5" />
        </>
    ),
    bed: <path d="M3 18v-6.5A2.5 2.5 0 0 1 5.5 9h13a2.5 2.5 0 0 1 2.5 2.5V18M3 15h18M6 9V6.5A1.5 1.5 0 0 1 7.5 5h9A1.5 1.5 0 0 1 18 6.5V9" />,
    bath: <path d="M4 12h16v2a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-2zM6 12V5.5A1.5 1.5 0 0 1 9 5.5M7 19l-1 2M17 19l1 2" />,
    area: <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />,
    home: <path d="M3 11l9-7 9 7M5 10v10h14V10" />,
    phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
    mail: (
        <>
            <rect x="3" y="5" width="18" height="14" rx="1" />
            <path d="M3 7l9 6 9-6" />
        </>
    ),
    clock: (
        <>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
        </>
    ),
    search: (
        <>
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
        </>
    ),
    filter: <path d="M4 6h16M7 12h10M10 18h4" />,
    grid: (
        <>
            <rect x="4" y="4" width="7" height="7" />
            <rect x="13" y="4" width="7" height="7" />
            <rect x="4" y="13" width="7" height="7" />
            <rect x="13" y="13" width="7" height="7" />
        </>
    ),
    dollar: <path d="M12 3v18M16.5 7.5A3.5 3.5 0 0 0 13 5h-2a3 3 0 0 0 0 6h2a3 3 0 0 1 0 6h-2a3.5 3.5 0 0 1-3.5-2.5" />,
    whatsapp: (
        <>
            <path d="M3.5 20.5l1.4-4.2A8.5 8.5 0 1 1 8 19.3z" />
            <path d="M9.2 8.6c.3-.6.9-.6 1.2 0l.7 1.5c.1.3 0 .6-.2.8l-.5.5a5 5 0 0 0 2.2 2.2l.5-.5c.2-.2.5-.3.8-.2l1.5.7c.6.3.6.9 0 1.2-.8.5-1.8.6-2.7.2a8 8 0 0 1-3.9-3.9c-.4-.9-.3-1.9.4-2.5z" />
        </>
    ),
    instagram: (
        <>
            <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.3" cy="6.7" r=".6" />
        </>
    ),
    facebook: <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" />,
    youtube: (
        <>
            <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" />
            <path d="M10 9.5v5l4.5-2.5z" />
        </>
    ),
    award: (
        <>
            <circle cx="12" cy="9" r="5.5" />
            <path d="M8.5 13.5L7 21l5-2.5 5 2.5-1.5-7.5" />
        </>
    ),
    compass: (
        <>
            <circle cx="12" cy="12" r="9" />
            <path d="M15.5 8.5l-2 5-5 2 2-5z" />
        </>
    ),
    shield: (
        <>
            <path d="M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6z" />
            <path d="M9 12l2 2 4-4" />
        </>
    ),
    spark: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6" />,
    heart: <path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.5 4.3 4.3 0 0 1 19.5 10C19.5 15.4 12 20 12 20z" />,
};

const Icon = ({ name, size, className = '' }) => {
    const sizeClass = size === 'sm' ? ' mo-ic--sm' : size === 'lg' ? ' mo-ic--lg' : '';
    return (
        <svg className={`mo-ic${sizeClass}${className ? ` ${className}` : ''}`} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            {PATHS[name]}
        </svg>
    );
};

export default Icon;
