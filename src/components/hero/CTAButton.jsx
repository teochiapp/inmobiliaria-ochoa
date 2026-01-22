import React from 'react';
import { StyledCTAButton } from './Hero.styles';

const CTAButton = ({ text = "Contactanos", phoneNumber = "5493512173089" }) => {
    const whatsappUrl = `https://wa.me/${phoneNumber}`;

    return (
        <StyledCTAButton
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
        >
            {text}
        </StyledCTAButton>
    );
};

export default CTAButton;
