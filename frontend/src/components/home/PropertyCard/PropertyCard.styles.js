import styled from 'styled-components';

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: transparent;
  border-radius: 20px;
  overflow: hidden;
  transition: transform 0.3s ease;
  cursor: pointer;
  width: 100%;

  &:hover {
    transform: translateY(-8px);
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 330px;
  overflow: hidden;
  position: relative;
  border-radius: 20px;

  @media (max-width: 968px) {
    height: 300px;
  }

  @media (max-width: 480px) {
    height: 280px;
  }
`;

export const PropertyImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${CardContainer}:hover & {
    transform: scale(1.08);
  }
`;

export const LocationTag = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  background: white;
  padding: 8px 16px;
  border-radius: 8px;
  font-family: var(--text-font);
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-dark);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 2;
`;

export const PropertyDetails = styled.div`
  position: absolute;
  bottom: 16px;
  left: 16px;
  right: 16px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 10px;
  gap: 8px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 480px) {
    padding: 14px 8px;
    bottom: 12px;
    left: 12px;
    right: 12px;
  }
`;

export const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  min-width: 0; /* Allow flex items to shrink */

  &:first-child {
    flex: 1.5; /* More space for price */
  }

  &:last-child {
    border-right: none;
  }
`;

export const DetailValue = styled.span`
  font-family: var(--headings-font);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-dark);
  line-height: 1.2;
  text-align: center;
  word-break: break-word;
  max-width: 100%;

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

export const DetailLabel = styled.span`
  font-family: var(--text-font);
  font-size: 0.75rem;
  font-weight: 500;
  color: #666;
  text-transform: capitalize;

  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;
