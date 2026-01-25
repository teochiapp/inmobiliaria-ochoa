import styled from 'styled-components';

export const SliderContainer = styled.div`
  height: calc(2 * var(--slide-height));
  display: flex;
  align-items: center;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  width: 100%;

  --slide-width: min(25vw, 300px);
  --slide-aspect: 2 / 3;
  --slide-transition-duration: 400ms;
  --slide-transition-easing: ease;

  @media (max-width: 968px) {
    --slide-width: min(40vw, 250px);
  }
`;

export const SliderButton = styled.button`
  --size: 40px;

  display: inline-flex;
  justify-content: center;
  align-items: center;
  opacity: 0.7;
  transition: opacity 250ms cubic-bezier(0.215, 0.61, 0.355, 1);
  z-index: 999;
  background: none;
  border: none;
  cursor: pointer;

  svg {
    width: var(--size);
    height: var(--size);
    stroke: white;
  }

  &:hover {
    opacity: 1;
  }

  &:focus {
    outline: none;
    border: none;
  }
`;

export const SlidesWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;

  & > * {
    grid-area: 1 / -1;
  }
`;

export const Slides = styled.div`
  width: 100%;
  height: 100%;
  pointer-events: none;
  display: grid;
  place-items: center;

  & > * {
    grid-area: 1 / -1;
  }
`;

export const Slide = styled.div`
  --slide-tx: 0px;
  --slide-ty: 0vh;
  --padding: 0px;
  --offset: 0;

  width: var(--slide-width);
  height: auto;
  aspect-ratio: var(--slide-aspect);
  user-select: none;
  perspective: 800px;

  transform: perspective(1000px)
    translate3d(var(--slide-tx), var(--slide-ty), var(--slide-tz, 0))
    rotateY(var(--slide-rotY)) scale(var(--slide-scale));
  transition: transform var(--slide-transition-duration) var(--slide-transition-easing);

  &[data-state="current"] {
    --slide-scale: 1.2;
    --slide-tz: 0px;
    --slide-tx: 0px;
    --slide-rotY: 0;
    pointer-events: auto;
  }

  &[data-state="next"] {
    --slide-tx: calc(1 * var(--slide-width) * 1.07);
    --slide-rotY: -45deg;
  }

  &[data-state="previous"] {
    --slide-tx: calc(-1 * var(--slide-width) * 1.07);
    --slide-rotY: 45deg;
  }

  &:not([data-state="current"]) {
    --slide-scale: 1;
    --slide-tz: 0;
    pointer-events: auto;
  }
`;

export const SlideInner = styled.div`
  --rotX: 0;
  --rotY: 0;
  --bgPosX: 0%;
  --bgPosY: 0%;

  position: relative;
  left: calc(var(--padding) / 2);
  top: calc(var(--padding) / 2);
  width: calc(100% - var(--padding));
  height: calc(100% - var(--padding));
  transform-style: preserve-3d;
  transform: rotateX(var(--rotX)) rotateY(var(--rotY));
`;

export const SlideImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  object-fit: cover;
  transform: translate(-50%, -50%) scale(1.25) translate3d(var(--bgPosX), var(--bgPosY), 0);
  transition: filter var(--slide-transition-duration) var(--slide-transition-easing);

  ${Slide}[data-state="current"] & {
    filter: brightness(0.8);
  }

  ${Slide}:not([data-state="current"]) & {
    filter: brightness(0.5);
  }
`;

export const SlideBg = styled.div`
  position: absolute;
  inset: -20%;
  background-image: ${props => props.$bgImage ? `url(${props.$bgImage})` : 'none'};
  background-size: cover;
  background-position: center center;
  z-index: -1;
  pointer-events: none;
  transition: opacity var(--slide-transition-duration) ease,
    transform var(--slide-transition-duration) ease;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(12px);
  }

  &:not([data-state="current"]) {
    opacity: 0;
  }

  &[data-state="previous"] {
    transform: translateX(-10%);
  }

  &[data-state="next"] {
    transform: translateX(10%);
  }
`;

export const SlidesInfos = styled.div`
  width: 100%;
  height: 100%;
  pointer-events: none;
  display: grid;
  place-items: center;

  & > * {
    grid-area: 1 / -1;
  }
`;

export const SlideInfo = styled.div`
  --padding: 0px;

  position: relative;
  width: var(--slide-width);
  height: 100%;
  aspect-ratio: var(--slide-aspect);
  user-select: none;
  perspective: 800px;
  z-index: 100;
`;

export const SlideInfoInner = styled.div`
  position: relative;
  left: calc(var(--padding) / 2);
  top: calc(var(--padding) / 2);
  width: calc(100% - var(--padding));
  height: calc(100% - var(--padding));
  transform-style: preserve-3d;
  transform: rotateX(var(--rotX)) rotateY(var(--rotY));
`;

export const SlideInfoTextWrapper = styled.div`
  --z-offset: 45px;

  position: absolute;
  height: fit-content;
  left: -15%;
  bottom: 15%;
  transform: translateZ(var(--z-offset));
  z-index: 2;
  pointer-events: none;
`;

export const SlideInfoText = styled.div`
  font-family: var(--headings-font);
  color: #fff;
  overflow: hidden;

  span {
    display: block;
    white-space: nowrap;
    transition: var(--slide-transition-duration) var(--slide-transition-easing);
    transition-property: opacity, transform;
  }

  ${SlideInfo}[data-state="current"] & span {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    transition-delay: 250ms;
  }

  ${SlideInfo}:not([data-state="current"]) & span {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
    transition-delay: 0ms;
  }

  &[data-title],
  &[data-subtitle] {
    font-size: min(3cqw, 2.4rem);
    font-weight: 800;
    letter-spacing: 0.2cqw;
    white-space: nowrap;
    text-transform: uppercase;
  }

  &[data-subtitle] {
    margin-left: 2cqw;
    font-size: min(2.2cqw, 1.8rem);
    font-weight: 600;
  }

  &[data-description] {
    margin-left: 1cqw;
    font-size: min(1.5cqw, 0.95rem);
    font-family: var(--text-font);
    font-weight: 300;
  }
`;

export const RentSection = styled.div`
  width: 100%;
  display: grid;
  place-items: center;
  overflow: hidden;
  padding: 4rem 0;
  min-height: 600px;
  position: relative;
  isolation: isolate;

  @media (max-width: 968px) {
    padding: 3rem 0;
    min-height: 500px;
  }
`;


export const SliderTitle = styled.h2`
  font-size: min(3cqw, 2.4rem);
  font-weight: 800;
  letter-spacing: 0.2cqw;
  white-space: nowrap;
  text-transform: uppercase;
`;