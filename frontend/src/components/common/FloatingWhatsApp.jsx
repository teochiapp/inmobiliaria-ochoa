import React, { useState } from 'react';
import styled from 'styled-components';
import { FaWhatsapp, FaTimes, FaPaperPlane } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingWhatsApp = () => {
    const [isOpen, setIsOpen] = useState(false);
    const phoneNumber = "5493571520528";

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <Wrapper>
            <AnimatePresence>
                {isOpen && (
                    <ChatWindow
                        initial={{ opacity: 0, scale: 0, x: 0, y: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                        exit={{ opacity: 0, scale: 0, x: 0, y: 20 }}
                        transition={{ duration: 0.3, type: "spring", stiffness: 260, damping: 20 }}
                    >
                        <Header>
                            <HeaderTitle>
                                <FaWhatsapp size={24} />
                                <span>WhatsApp</span>
                            </HeaderTitle>
                            <CloseButton onClick={() => setIsOpen(false)}>
                                <FaTimes size={16} />
                            </CloseButton>
                        </Header>
                        <ChatBody>
                            <MessageBubble>
                                <p>Hola bienvenidos a la Inmobiliaria Marin Ochoa, ¿Querés hacernos alguna consulta? Mandanos un mensaje.</p>
                            </MessageBubble>
                        </ChatBody>
                        <ChatFooter>
                            <OpenChatButton
                                href={`https://wa.me/${phoneNumber}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Abrir Chat <FaPaperPlane size={16} />
                            </OpenChatButton>
                        </ChatFooter>
                    </ChatWindow>
                )}
            </AnimatePresence>

            <FloatingButton
                onClick={toggleOpen}
                aria-label="Abrir chat de WhatsApp"
                $isOpen={isOpen}
            >
                {isOpen ? <FaTimes /> : <FaWhatsapp />}
            </FloatingButton>
        </Wrapper>
    );
};

export default FloatingWhatsApp;

// Styled Components

const Wrapper = styled.div`
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 1rem;

    @media (max-width: 400px) {
        right: 17px;
    }
`;

const FloatingButton = styled.button`
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
    border: none;
    transition: all 0.3s ease;
    
    &:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
        background-color: #20BA56;
    }

    svg {
        font-size: 30px;
        transition: transform 0.3s ease;
        transform: ${props => props.$isOpen ? 'rotate(90deg)' : 'rotate(0)'};
    }
`;

const ChatWindow = styled(motion.div)`
    width: 320px;
    background-color: #f0f2f5;
    border-radius: 12px; // Rounded corners like the image
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    margin-bottom: 5px;
    transform-origin: bottom right;
    
    @media (max-width: 400px) {
        width: 280px;
    }
`;

const Header = styled.div`
    background-color: #25d366;; // Darker WhatsApp green/teal like standard header
    color: white;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
`;

const HeaderTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
    font-size: 1.1rem;
`;

const CloseButton = styled.button`
    background: transparent;
    border: none;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.8;
    transition: opacity 0.2s;

    &:hover {
        opacity: 1;
    }
`;

const ChatBody = styled.div`
    background-color: #E6DDD4; // WhatsApp wall color-ish, or just light grey as in user image
    background-image: url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png"); // WhatsApp background pattern
    padding: 20px;
    min-height: 150px;
    display: flex;
    align-items: flex-start;
`;

const MessageBubble = styled.div`
    background-color: white;
    padding: 12px 16px;
    border-radius: 0px 12px 12px 12px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
    position: relative;
    max-width: 90%;
    color: #111b21;
    font-size: 14px;
    line-height: 1.4;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: -8px;
        width: 0;
        height: 0;
        border: 8px solid transparent;
        border-top-color: white;
        border-right-color: white;
        border-bottom: 0;
        margin-top: 0;
        border-bottom-left-radius: 0;
    }
`;

const ChatFooter = styled.div`
    background-color: #f0f2f5;
    padding: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const OpenChatButton = styled.a`
    background-color: #25D366;
    color: white;
    text-decoration: none;
    padding: 10px 24px;
    border-radius: 24px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: background-color 0.2s;
    font-size: 15px;

    &:hover {
        background-color: #128C7E;
    }
`;
