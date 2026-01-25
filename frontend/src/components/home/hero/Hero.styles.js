import styled from 'styled-components';

export const HeroContainer = styled.div`
  width: 100%;
  margin-top: 70px; /* Account for fixed header */
  
  .slick-slider {
    width: 100%;
  }

  .slick-dots {
    bottom: 30px;
    
    li button:before {
      color: var(--text-light);
      font-size: 12px;
      opacity: 0.5;
    }

    li.slick-active button:before {
      opacity: 1;
    }
  }

  .slick-prev,
  .slick-next {
    z-index: 100;
    width: 50px;
    height: 50px;

    &:before {
      font-size: 50px;
      opacity: 0.7;
    }

    &:hover:before {
      opacity: 1;
    }
  }

  .slick-prev {
    left: 25px;
  }

  .slick-next {
    right: 25px;
  }

  @media (max-width: 768px) {
    margin-top: 60px;

    .slick-prev,
    .slick-next {
      width: 30px;
      height: 30px;

      &:before {
        font-size: 30px;
      }
    }

    .slick-prev {
      left: 10px;
    }

    .slick-next {
      right: 10px;
    }
  }
`;

export const SlideWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 70vh;
  min-height: 600px;
  background-image: url(${props => props.$bgImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.3) 0%,
      rgba(0, 0, 0, 0.4) 100%
    );
  }

  @media (max-width: 768px) {
    height: 80vh;
    min-height: 500px;
  }
`;

export const ContentOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 10;
  width: 90%;
  max-width: 900px;
  padding: 2rem;
`;

export const Title = styled.h1`
  font-family: var(--headings-font);
  font-size: 4rem;
  font-weight: 700;
  color: var(--text-light);
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
  margin-bottom: 1.5rem;
  line-height: 1.2;

  @media (max-width: 968px) {
    font-size: 3rem;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

export const Subtitle = styled.p`
  font-family: 'Lato', sans-serif;
  font-size: 1.5rem;
  font-weight: 300;
  color: var(--text-light);
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.7);
  margin-bottom: 2.5rem;
  line-height: 1.6;

  @media (max-width: 968px) {
    font-size: 1.3rem;
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

export const StyledCTAButton = styled.a`
  display: inline-block;
  padding: 1rem 3rem;
  background-color: #F5A623;
  color: #fff;
  font-family: 'Lato', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  text-decoration: none;
  text-transform: uppercase;
  border-radius: 4px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);

  &:hover {
    background-color: #E09612;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 0.8rem 2rem;
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.7rem 1.5rem;
    font-size: 0.9rem;
  }
`;
