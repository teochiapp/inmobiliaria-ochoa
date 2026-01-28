import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const useHeroAnimation = ({ images, titles, loading }) => {
    const mainRef = useRef(null);
    const titleRef = useRef(null);
    const partsRef = useRef([]);
    const stateRef = useRef({
        playing: false,
        current: 0,
        isVisible: false
    });

    const cols = 3;

    const createSection = (imageSrc, partIndex) => {
        const section = document.createElement('div');
        section.className = 'section';
        section.style.width = '100%';
        section.style.height = '75vh';
        section.style.position = 'relative';
        section.style.overflow = 'hidden';

        const img = document.createElement('img');
        img.src = imageSrc;
        img.style.width = '100vw';
        img.style.height = '75vh';
        img.style.objectFit = 'cover';
        img.style.position = 'absolute';
        img.style.left = `${-100 / cols * partIndex}vw`;
        img.style.pointerEvents = 'none';

        // Add overlay for darkening
        const overlay = document.createElement('div');
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.25)'; // Adjustable opacity
        overlay.style.pointerEvents = 'none';
        overlay.style.zIndex = '1';

        section.appendChild(img);
        section.appendChild(overlay);
        return section;
    };

    const go = (dir) => {
        if (stateRef.current.playing) return;
        stateRef.current.playing = true;

        let nextIndex = stateRef.current.current + dir;
        if (nextIndex < 0) nextIndex = images.length - 1;
        else if (nextIndex >= images.length) nextIndex = 0;
        stateRef.current.current = nextIndex;

        // Animate Title Change
        if (titleRef.current) {
            gsap.to(titleRef.current, {
                opacity: 0,
                y: -20,
                duration: 0.5,
                onComplete: () => {
                    titleRef.current.innerText = titles[nextIndex];
                    gsap.to(titleRef.current, {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        delay: 0.2
                    });
                }
            });
        }

        const animOptions = {
            duration: 2.3,
            ease: "power4.inOut"
        };

        const height = mainRef.current ? mainRef.current.offsetHeight : window.innerHeight;

        partsRef.current.forEach((part, p) => {
            if (!part) return;

            const next = createSection(images[nextIndex], p);

            const up = (part, next) => {
                part.appendChild(next);
                gsap.to(part, { ...animOptions, y: -height }).then(() => {
                    if (part.children[0]) part.children[0].remove();
                    gsap.to(part, { duration: 0, y: 0 });
                    if (p === 0) stateRef.current.playing = false;
                });
            };

            const down = (part, next) => {
                part.prepend(next);
                gsap.to(part, { duration: 0, y: -height });
                gsap.to(part, { ...animOptions, y: 0 }).then(() => {
                    if (part.children[1]) part.children[1].remove();
                    if (p === 0) stateRef.current.playing = false;
                });
            };

            // Zig-zag logic from reference: (p - Math.max(0, dir)) % 2
            if ((p - Math.max(0, dir)) % 2) {
                down(part, next);
            } else {
                up(part, next);
            }
        });
    };

    useEffect(() => {
        if (loading || !images || images.length === 0) return;

        // Initialize parts contents imperatively
        partsRef.current.forEach((part, i) => {
            if (!part) return;
            part.innerHTML = ''; // Ensure clean start
            part.appendChild(createSection(images[0], i));
        });

        // Initialize title
        if (titleRef.current) {
            titleRef.current.innerText = titles[0];
        }

        // Visibility observer
        const observer = new IntersectionObserver(([entry]) => {
            stateRef.current.isVisible = entry.isIntersecting;
        }, { threshold: 0.1 });

        if (mainRef.current) observer.observe(mainRef.current);

        // Auto slide interval
        const interval = setInterval(() => {
            if (stateRef.current.isVisible) go(1);
        }, 7000);

        // Events
        const handleKeyDown = (e) => {
            if (['ArrowDown', 'ArrowRight'].includes(e.key)) go(1);
            else if (['ArrowUp', 'ArrowLeft'].includes(e.key)) go(-1);
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            observer.disconnect();
            clearInterval(interval);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [loading, images, titles]);

    return { mainRef, partsRef, titleRef, cols };
};

export default useHeroAnimation;
