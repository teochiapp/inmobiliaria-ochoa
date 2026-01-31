import React from 'react';
import styled from 'styled-components';
import { FaWhatsapp } from 'react-icons/fa';

const FloatingButton = styled.a`
    position: fixed;
    bottom: 30px;
    right: 30px;
    background-color: #25D366;
    color: white;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    z-index: 1000;
    transition: all 0.3s ease;
    text-decoration: none;

    &:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
        background-color: #20BA56;
    }

    svg {
        font-size: 35px;
    }
`;

const FloatingWhatsApp = () => {
    return (
        <FloatingButton
            href="https://wa.me/5493571520528"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contactar por WhatsApp"
        >
            <FaWhatsapp />
        </FloatingButton>
    );
};

export default FloatingWhatsApp;
