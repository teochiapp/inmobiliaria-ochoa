import { useState, useEffect } from 'react';

/**
 * Custom hook to detect scroll position
 * @param {number} threshold - Scroll position threshold in pixels
 * @returns {boolean} - True if scrolled past threshold
 */
const useScrollPosition = (threshold = 50) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > threshold;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Check initial position
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled, threshold]);

    return scrolled;
};

export default useScrollPosition;
