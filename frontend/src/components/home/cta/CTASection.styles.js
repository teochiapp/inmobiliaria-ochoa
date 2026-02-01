import styled from 'styled-components';
import { motion } from 'framer-motion';

export const CTAContainer = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding-bottom: 4rem;
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

export const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1000px; /* Slightly narrower for focus */
  padding: 0 2rem;

  .custom-spotlight-card {
    background-color: var(--brand-blue); /* The card itself is now the dark element */
    border: 1px solid rgba(255,255,255,0.1);
    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
    padding: 4rem 3rem;
    
    @media (max-width: 768px) {
        padding: 3rem 1.5rem;
    }
  }
`;

export const CTATitle = styled.h2`
  font-family: var(--headings-font);
  font-size: clamp(2.1rem, 5vw, 2.5rem);
  color: white;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  text-align: center;
`;

export const CTADescription = styled.p`
  font-family: var(--text-font);
  font-size: clamp(1.2rem, 2.5vw, 1.1rem);
  color: rgba(255, 255, 255, 0.8);
  max-width: 600px;
  text-align: center;
  margin-bottom: 1rem;
  line-height: 1.6;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  margin-top: 1rem;
`;

export const CTAButton = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2.5rem;
  background-color: transparent;
  color: white;
  border: 2px solid white;
  font-family: var(--headings-font);
  font-size: clamp(0.9rem, 3vw, 1.1rem);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  text-decoration: none;
  min-width: 250px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  z-index: 1;

  @media (max-width: 768px) {
    width: 100%;
    padding: 1rem;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background-color: white;
    transition: width 0.3s ease;
    z-index: -1;
  }

  &:hover {
    color: var(--brand-blue); /* Dark text on white hover */
    
    &::before {
      width: 100%;
    }
  }

  &.primary {
    background-color: var(--brand-red);
    border-color: var(--brand-red);
    color: white;
    
    &::before {
      background-color: white; /* White fill on hover */
    }

    &:hover {
      color: var(--brand-red); /* Red text on white hover */
      border-color: white;
    }
  }

  &.secondary {
    /* Keeps default white outline style */
    border-color: white;
    color: white;

    &::before {
      background-color: white;
    }

    &:hover {
        color: var(--brand-blue);
        border-color: white;
    }
  }

  svg {
    margin-left: 0.5rem;
    width: 20px;
    height: 20px;
  }
`;

export const CardContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;
