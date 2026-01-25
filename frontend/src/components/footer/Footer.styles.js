/* Import image from public src folder */
import heroBg from '../../public/hero/hero.png';
import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background-color: var(--brand-blue); /* Darker fallback */
  color: #fff;
  padding: 5rem 2rem 0 2rem;
  font-family: var(--text-font);
  position: relative;
  overflow: hidden;

  /* Background Image overlay effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(${heroBg}) center/cover no-repeat;
    opacity: 0.35;
    filter: blur(5px);
    transform: scale(1.1); /* Prevent blur edges */
    z-index: 0;
    pointer-events: none;
  }
`;

export const FooterContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 3rem;
  padding-bottom: 4rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

export const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FooterBrand = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  p {
    color: #a0a0a0;
    font-size: 1rem;
    line-height: 1.6;
    max-width: 350px;
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--headings-font);
  font-size: 2rem;
  text-shadow: 0 2px 5px rgba(0,0,0,0.3);
  font-weight: 700;
  color: #fff;

  span {
    color: var(--brand-red); /* Assuming using brand color for accent */
  }
  
  /* If using the logo from Header, might need adjustment */
  img {
      height: 50px;
  }
`;

export const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: rgba(255,255,255,0.1);
    border-radius: 4px;
    color: #fff;
    transition: all 0.3s ease;

    &:hover {
      background-color: var(--brand-red);
      transform: translateY(-3px);
    }
  }
`;

export const ColumnTitle = styled.h3`
  font-family: var(--headings-font);
  font-size: 1.25rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 0.5rem;
  position: relative;
`;

export const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  li a {
    color: #a0a0a0;
    text-decoration: none;
    font-size: 1rem;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
      color: #fff;
      transform: translateX(5px);
    }
  }
`;

export const WorkHours = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: #a0a0a0;
  font-size: 0.95rem;

  .time {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #fff;
    font-weight: 500;
  }
`;

export const CallButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  background-color: var(--brand-blue); /* Using brand color instead of green in image for consistency */
  color: #fff;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  margin-top: 1rem;
  width: fit-content;
  transition: all 0.3s ease;

  &:hover {
    background-color: #fff;
    color: var(--brand-blue);
  }
`;

export const Copyright = styled.div`
  border-top: 1px solid rgba(255,255,255,0.1);
  padding: 1.5rem 0;
  text-align: center;
  color: #888;
  font-size: 0.9rem;
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
  
  strong {
      color: #fff;
  }

  a {
      color: inherit;
      text-decoration: none;
      transition: color 0.3s ease;
      
      &:hover {
          color: #fff;
      }
  }
`;
