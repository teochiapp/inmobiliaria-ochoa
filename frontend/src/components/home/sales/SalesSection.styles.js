import styled from 'styled-components';

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 1rem;
`;

export const SectionTitle = styled.h2`
  font-family: var(--headings-font);
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-dark);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

export const ViewAllButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0;
  background: none;
  border: none;
  color: var(--text-dark);
  font-family: var(--text-font);
  font-size: 1rem;
  font-weight: 400;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: var(--brand-red);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const PropertiesGrid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;
