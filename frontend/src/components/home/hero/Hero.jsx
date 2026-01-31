import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import useHero from '../../../hooks/useHero';
import useHeroAnimation from '../../../hooks/useHeroAnimation';

const Hero = () => {
  const { images, titles, loading, error } = useHero();
  const { mainRef, partsRef, titleRef, cols } = useHeroAnimation({ images, titles, loading });

  if (loading && (!images || images.length === 0)) return <HeroWrapper style={{ justifyContent: 'center', alignItems: 'center', color: 'white' }}>Loading...</HeroWrapper>;
  if (error) return <HeroWrapper style={{ justifyContent: 'center', alignItems: 'center', color: 'white' }}>Error loading hero</HeroWrapper>;
  if (!loading && images.length === 0) return null;

  return (
    <>
      <GlobalStyle />
      <HeroWrapper id="hero-main" ref={mainRef}>
        {[...Array(cols)].map((_, i) => (
          <Part
            key={i}
            ref={el => partsRef.current[i] = el}
          />
        ))}

        <MainTitle ref={titleRef}>{titles[0]}</MainTitle>
      </HeroWrapper>
    </>
  );
};

export default Hero;

// Styles

const GlobalStyle = createGlobalStyle`
    body {
    }
`;

const HeroWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 75vh;
  position: relative;
  overflow: hidden;
  font-family: var(--headings-font);

  * {
    box-sizing: border-box;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    -webkit-user-drag: none;
  }
`;

const Part = styled.div`
  flex: 1;
  height: 100%;
  position: relative;
`;

const MainTitle = styled.h2`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: 0;
  margin: auto;
  z-index: 99;
  color: white;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.7);
  text-align: center;
  font-size: 2.7em;
  font-weight: 700;
  pointer-events: none;
  font-family: inherit;
  text-transform: uppercase;
  letter-spacing: 5px;
`;
