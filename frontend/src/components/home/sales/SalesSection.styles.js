import styled from 'styled-components';

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0rem;
  width: 100%;
  max-width: 1450px;
  margin: 1rem auto;
  padding: 2rem 2rem;
  position: relative;

  @media (max-width: 968px) {
    padding: 2rem 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 2rem 1rem;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin: 0 auto 2rem auto;
  padding-bottom: 1rem;
  border-bottom: 1.5px solid var(--brand-blue);
  position: relative;
  width: 100%;
  max-width: 1400px;

  &::after {
    content: '';
    position: absolute;
    bottom: -1.5px;
    left: 0;
    width: 60px;
    height: 1px;
    background-color: var(--brand-red);
  }

  @media (max-width: 480px) {
    flex-direction: row;
    align-items: center;
    padding-bottom: 0.5rem;
  }
`;

export const SectionTitle = styled.h2`
  font-family: var(--headings-font);
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-dark);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0;
  line-height: 1;

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
  padding: 0.5rem 0;
  background: none;
  border: none;
  color: var(--text-dark);
  font-family: var(--text-font);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    color: var(--brand-red);
    transform: translateX(4px);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 1450px;
  margin: 0 auto;
  /* Eliminado overflow-x: hidden para que se vean las flechas por completo */
`;

export const SliderContainer = styled.div`
  overflow: hidden;
  width: 100%;

  @media (max-width: 480px) {
    overflow: visible;
  }
`;

export const SliderButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.$right ? 'right: -20px;' : 'left: -20px;'}
  
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: white;
  border: 2px solid var(--brand-red);
  color: var(--brand-red);
  
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  opacity: ${props => props.$visible ? '1' : '0'};
  pointer-events: ${props => props.$visible ? 'all' : 'none'};
  transition: all 0.3s ease;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background: var(--brand-red);
    color: white;
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 6px 16px rgba(193, 60, 55, 0.3);
  }

  svg {
    width: 24px;
    height: 24px;
  }

  @media (max-width: 1200px) {
    ${props => props.$right ? 'right: 0;' : 'left: 0;'}
  }

  @media (max-width: 480px) {
    display: flex;
    width: 35px;
    height: 35px;
    ${props => props.$right ? 'right: -10px;' : 'left: -10px;'}
  }
`;

export const PropertiesGrid = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  gap: 2rem;
  flex-wrap: nowrap;
  padding: 1rem 0;
  transition: transform 0.5s ease-in-out;

  > * {
    flex: 0 0 calc(33.333% - 1.5rem);
    min-width: 300px;
    max-width: 450px;
  }

  @media (max-width: 1200px) {
    > * {
      flex: 0 0 calc(33.333% - 1rem);
      min-width: 250px;
    }
  }

  @media (max-width: 968px) {
    gap: 1.5rem;
    > * {
      flex: 0 0 calc(50% - 0.75rem);
      min-width: 200px;
    }
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    > * {
      flex: 0 0 auto;
      width: 100%;
      max-width: 400px;
    }
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin: 0 auto 2rem auto;
  width: 100%;
  max-width: 1400px;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

export const FilterInput = styled.input`
  padding: 0.8rem 1.5rem;
  border: 1.5px solid #e0e0e0;
  border-radius: 50px;
  font-family: var(--text-font);
  font-size: 0.95rem;
  outline: none;
  flex: 2;
  min-width: 200px;
  transition: all 0.3s ease;
  background-color: #fff;
  color: var(--text-dark);
  box-shadow: 0 2px 5px rgba(0,0,0,0.02);

  &:focus {
    border-color: var(--brand-blue);
    box-shadow: 0 2px 8px rgba(0, 51, 102, 0.1);
  }

  &:hover {
    border-color: #ccc;
  }

  &::placeholder {
    color: #999;
  }

  /* Hide spin buttons */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  &[type=number] {
    -moz-appearance: textfield;
  }

  @media (max-width: 480px) {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }
`;

export const FilterSelect = styled.select`
  padding: 0.8rem 2.5rem 0.8rem 1.5rem;
  border: 1.5px solid #e0e0e0;
  border-radius: 50px;
  font-family: var(--text-font);
  font-size: 0.95rem;
  outline: none;
  background-color: white;
  cursor: pointer;
  flex: 1;
  min-width: 160px;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23C13C37' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1.2rem center;
  transition: all 0.3s ease;
  color: var(--text-dark);
  box-shadow: 0 2px 5px rgba(0,0,0,0.02);

  &:focus {
    border-color: var(--brand-red);
    box-shadow: 0 2px 8px rgba(193, 60, 55, 0.1);
  }

  &:hover {
    border-color: #ccc;
  }

  option {
    color: var(--text-dark);
    padding: 10px;
  }
`;
