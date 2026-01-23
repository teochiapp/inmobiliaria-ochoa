import React from 'react';
import HeroContent from './HeroContent';
import { SlideWrapper } from './Hero.styles';

const HeroSlide = ({ backgroundImage, title, subtitle }) => {
    return (
        <SlideWrapper $bgImage={backgroundImage}>
            <HeroContent title={title} subtitle={subtitle} />
        </SlideWrapper>
    );
};

export default HeroSlide;
