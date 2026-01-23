import styled from 'styled-components';

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  max-width: 320px;
  width: 100%;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 220px;
  overflow: hidden;
  position: relative;
  border-radius: 16px 16px 0 0;
`;

export const PropertyImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${CardContainer}:hover & {
    transform: scale(1.05);
  }
`;

export const PropertyInfo = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const PropertyName = styled.h3`
  font-family: var(--headings-font);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-dark);
  margin: 0;
  line-height: 1.3;
`;

export const PropertyPrice = styled.p`
  font-family: var(--text-font);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-dark);
  margin: 0;
`;

export const PropertyDetails = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

export const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--text-dark);
  font-size: 0.95rem;

  svg {
    color: var(--brand-red);
  }
`;

export const PropertyLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: #666;
  font-size: 0.9rem;
  margin-top: 0.25rem;

  svg {
    flex-shrink: 0;
  }

  span {
    line-height: 1.4;
  }
`;

export const InfoButton = styled.button`
  margin-top: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: var(--brand-blue);
  color: white;
  border: none;
  border-radius: 4px;
  font-family: var(--text-font);
  font-size: 0.95rem;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--brand-red);
  }

  &:active {
    transform: scale(0.98);
  }
`;
