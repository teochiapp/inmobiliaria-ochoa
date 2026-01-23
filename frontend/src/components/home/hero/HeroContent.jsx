import React from 'react';
import CTAButton from './CTAButton';
import { ContentOverlay, Title, Subtitle } from './Hero.styles';

const HeroContent = ({ title, subtitle }) => {
    return (
        <ContentOverlay>
            <Title>{title}</Title>
            <Subtitle>{subtitle}</Subtitle>
            <CTAButton />
        </ContentOverlay>
    );
};

export default HeroContent;
