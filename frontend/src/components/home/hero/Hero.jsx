import React, { useEffect, useRef, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import gsap from 'gsap';

const images = [
    '/src/public/hero/hero.png',
    '/src/public/hero/hero.png',
    '/src/public/hero/hero.png'
];

const Hero = () => {
    const [current, setCurrent] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const mainRef = useRef(null);
    const partsRef = useRef([]);
    const cursorRef = useRef(null);
    const cursorFRef = useRef(null);

    // State to reference mutable values without re-renders
    const stateRef = useRef({
        cursorX: 0,
        cursorY: 0,
        pageX: 0,
        pageY: 0,
        clicked: false,
        startY: null,
        endY: null,
        playing: false,
        current: 0 // Sync with state for refs usage
    });

    const cols = 3;

    useEffect(() => {
        // Initial setup for parts refs
        partsRef.current = partsRef.current.slice(0, cols);

        // Animation loop for cursor
        const loop = () => {
            const state = stateRef.current;
            const followSpeed = 0.16;
            const sizeF = 36;

            state.cursorX = (1 - followSpeed) * state.cursorX + followSpeed * state.pageX;
            state.cursorY = (1 - followSpeed) * state.cursorY + followSpeed * state.pageY;

            if (cursorFRef.current) {
                cursorFRef.current.style.top = `${state.cursorY - sizeF / 2}px`;
                cursorFRef.current.style.left = `${state.cursorX - sizeF / 2}px`;
            }

            requestAnimationFrame(loop);
        };
        const animFrame = requestAnimationFrame(loop);

        return () => cancelAnimationFrame(animFrame);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            stateRef.current.pageX = e.clientX;
            stateRef.current.pageY = e.clientY;
            if (cursorRef.current) {
                const size = 8;
                cursorRef.current.style.left = `${e.clientX - size / 2}px`;
                cursorRef.current.style.top = `${e.clientY - size / 2}px`;
            }
        };

        const handleMouseDown = (e) => {
            gsap.to(cursorRef.current, { scale: 4.5 });
            gsap.to(cursorFRef.current, { scale: 0.4 });
            stateRef.current.clicked = true;
            stateRef.current.startY = e.clientY || (e.touches && e.touches[0].clientY) || (e.targetTouches && e.targetTouches[0].clientY);
        };

        const handleMouseUp = (e) => {
            gsap.to(cursorRef.current, { scale: 1 });
            gsap.to(cursorFRef.current, { scale: 1 });

            stateRef.current.endY = e.clientY || stateRef.current.endY;
            if (stateRef.current.clicked && stateRef.current.startY && Math.abs(stateRef.current.startY - stateRef.current.endY) >= 40) {
                go(!Math.min(0, stateRef.current.startY - stateRef.current.endY) ? 1 : -1);
            }
            stateRef.current.clicked = false;
            stateRef.current.startY = null;
            stateRef.current.endY = null;
        };

        const handleTouchMove = (e) => {
            if (stateRef.current.clicked) {
                stateRef.current.endY = e.touches[0].clientY || e.targetTouches[0].clientY;
            }
        };

        const handleKeyDown = (e) => {
            if (['ArrowDown', 'ArrowRight'].includes(e.key)) {
                go(1);
            } else if (['ArrowUp', 'ArrowLeft'].includes(e.key)) {
                go(-1);
            }
        };

        const handleWheel = (e) => {
            // Debounce or simple logic
            // Note: we are not preventing default here strictly to allow page scroll interaction if needed,
            // but the animation might feel better if we do. 
            // For now, mirroring snippet logic.
            if (e.deltaY < -40) go(-1);
            if (e.deltaY >= 40) go(1);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('touchstart', handleMouseDown);
        window.addEventListener('touchmove', handleTouchMove);
        window.addEventListener('touchend', handleMouseUp);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('wheel', handleWheel);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('touchstart', handleMouseDown);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleMouseUp);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('wheel', handleWheel);
        };
    }, []); // Dependencies empty, logic uses refs

    const go = (dir) => {
        if (stateRef.current.playing) return;

        stateRef.current.playing = true;

        // safe update next index
        let nextIndex = stateRef.current.current + dir;
        if (nextIndex < 0) nextIndex = images.length - 1;
        else if (nextIndex >= images.length) nextIndex = 0;

        stateRef.current.current = nextIndex;
        setCurrent(nextIndex); // Update react state for rendering logic if needed (e.g. text)

        const animOptions = {
            duration: 2.3,
            ease: "power4.inOut" // equivalent to Power4.easeInOut
        };

        partsRef.current.forEach((part, p) => {
            if (!part) return;

            // Create the next element imperatively to match the specific GSAP effect
            // which relies on instantaneous DOM manipulation.
            const nextSlide = document.createElement('div');
            nextSlide.className = 'section';
            const img = document.createElement('img');
            img.src = images[nextIndex];
            nextSlide.appendChild(img);

            // Styling for the image to mimic CSS modules or what styled components would do?
            // We need to ensure the class 'section' matches the styled component.
            // But styled-components generate random classes.
            // We should probably reuse the styled component class or inline styles.
            // Inline styles are safer here for the dynamic elements.
            nextSlide.style.width = '100%';
            nextSlide.style.height = '100vh';
            nextSlide.style.position = 'absolute';
            nextSlide.style.overflow = 'hidden';

            img.style.width = '100vw';
            img.style.height = '100vh';
            img.style.objectFit = 'cover';
            img.style.position = 'absolute';
            // 'left' needs to be calculated based on part index
            // var(--x) is set on the parent 'part'.
            // The css says img { left: var(--x) }.
            // Since we are inside 'part', the variable is inherited IF we set it on part.
            // The original code sets --x on the part. 
            img.style.left = part.style.getPropertyValue('--x');
            img.style.pointerEvents = 'none';

            if ((p - Math.max(0, dir)) % 2) {
                down(part, nextSlide, animOptions);
            } else {
                up(part, nextSlide, animOptions);
            }
        });

        // Cleanup playing flag is handled in the callbacks of animations
        // We only set playing = false once strictly, but here we launch parallel animations.
        // The longest one determines end. simpler:
        setTimeout(() => {
            stateRef.current.playing = false;
        }, 2300); // approx duration
    };

    const up = (part, next, opts) => {
        part.appendChild(next);
        gsap.to(part, { ...opts, y: -window.innerHeight }).then(() => {
            if (part.children[0]) part.children[0].remove();
            gsap.to(part, { duration: 0, y: 0 });
        });
    };

    const down = (part, next, opts) => {
        part.prepend(next);
        gsap.to(part, { duration: 0, y: -window.innerHeight });
        gsap.to(part, { ...opts, y: 0 }).then(() => {
            if (part.children[1]) part.children[1].remove();
            // stateRef.current.playing = false; // handled generally
        });
    };

    return (
        <>
            <GlobalStyle />
            <HeroWrapper id="hero-main" ref={mainRef}>
                {[...Array(cols)].map((_, i) => (
                    <Part
                        key={i}
                        ref={el => partsRef.current[i] = el}
                        style={{ '--x': `${-100 / cols * i}vw` }}
                    >
                        <Section>
                            <img src={images[0]} style={{ left: `${-100 / cols * i}vw` }} alt="Hero Part" />
                        </Section>
                    </Part>
                ))}

                <Cursor ref={cursorRef} />
                <CursorF ref={cursorFRef} />

                <MainTitle>Mirador del Lago</MainTitle>

                <Content className="content">
                    <p>You can press <KeyboardKey>▲</KeyboardKey> <KeyboardKey>▼</KeyboardKey> on your keyboard or swipe up/down to navigate. Mouse wheel works too.</p>
                </Content>

                <Buttons className="buttons">
                    <NavButton className="next" onClick={() => go(-1)}></NavButton>
                    <NavButton className="prev" onClick={() => go(1)}></NavButton>
                </Buttons>
            </HeroWrapper>
        </>
    );
};

export default Hero;

// Styles

// Global adjustments for this component
const GlobalStyle = createGlobalStyle`
    /* We scope these carefully or apply to body if intended */
    body {
        /* overflow: hidden;  We probably shouldn't kill scroll globally unless user really wants "One Page" experience */
        /* font-family: "Sen", sans-serif; */
    }
`;

const HeroWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  font-family: sans-serif; /* Fallback */

  * {
    box-sizing: border-box;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    cursor: none; /* Hide default cursor */
    user-select: none;
    -webkit-user-drag: none;
  }
`;

const Part = styled.div`
  flex: 1;
  height: 100%;
  position: relative;
`;

const Section = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;

  img {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    position: absolute;
    pointer-events: none;
    /* 'left' is handled via inline style/variable */
  }
`;

const Cursor = styled.div`
  width: var(--size, 8px);
  height: var(--size, 8px);
  border-radius: 50%;
  background: white;
  position: fixed; /* Fixed to follow mouse easily */
  z-index: 999;
  pointer-events: none;
  mix-blend-mode: difference;
  top: 0; 
  left: 0;
`;

const CursorF = styled.div`
  width: var(--size, 36px);
  height: var(--size, 36px);
  position: fixed; /* Fixed */
  top: 0;
  left: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='47' height='47' viewBox='0 0 47 47' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M42.4202 42.4202C38.8403 46 33.3594 46 23.5 46C13.6406 46 8.15966 46 4.57983 42.4202C1 38.8403 1 33.3594 1 23.5C1 13.6406 1 8.15966 4.57983 4.57983C8.15966 1 13.6406 1 23.5 1C33.3594 1 38.8403 1 42.4202 4.57983C46 8.15966 46 13.6406 46 23.5C46 33.3594 46 38.8403 42.4202 42.4202Z' stroke='white'/%3E%3C/svg%3E%0A");
  background-size: cover;
  mix-blend-mode: difference;
  pointer-events: none;
  opacity: 0.5;
  z-index: 999;
`;

const Buttons = styled.div`
  position: absolute;
  right: 25px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 99;
`;

const NavButton = styled.button`
    border: none;
    background-size: contain;
    background: url("data:image/svg+xml,%3Csvg width='10' height='29' viewBox='0 0 10 29' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9 0V27L1 17.4857' stroke='white' stroke-width='2' /%3E%3C/svg%3E%0A") no-repeat;
    background-position: center;
    width: 10px;
    height: 30px;
    display: block;
    margin: 20px 0;
    padding: 0 15px;
    transition-duration: .6s;
    cursor: pointer; /* Override global cursor: none? actually custom cursor handles it */

    &.next {
      transform: scaleY(-1);
    }

    &.prev:active {
      transform: translateY(8px);
    }

    &.next:active {
      transform: scaleY(-1) translateY(8px);
    }
`;

const MainTitle = styled.h1`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: 0;
  margin: auto;
  z-index: 99;
  color: white;
  text-align: center;
  font-size: 2.6em;
  mix-blend-mode: overlay;
  pointer-events: none;
  font-family: inherit;
`;

const Content = styled.div`
  width: 90%;
  position: absolute;
  bottom: 20px;
  text-align: center;
  left: 0;
  right: 0;
  margin: auto;
  color: white;
  z-index: 99;
  font-size: .8em;

  p {
    margin: .5em auto;
  }

  a {
    color: rgba(227, 227, 227, 0.78);
    text-decoration: none;
    border-bottom: 1px solid currentColor;

    &:hover {
      padding-bottom: 1px;
    }
  }
`;

const KeyboardKey = styled.kbd`
    width: 15px;
    height: 15px;
    border: 1px solid white;
    display: inline-block;
    border-radius: 3px;
    font-size: .9em;
    vertical-align: text-top;
    line-height: 12px;
`;
