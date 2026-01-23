import styled from 'styled-components';

export const SalesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 4rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
  background-color: var(--text-light);

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 3rem;
    padding: 3rem 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 2rem 1rem;
  }
`;
