import React from 'react';
import Header from '../../components/header/Header';
import Hero from '../../components/home/hero/Hero';
import Map from '../../components/home/map/Map';
import AboutSection from '../../components/home/about/AboutSection';
import GallerySection from '../../components/home/gallery/GallerySection';
import Sales from '../../components/home/sales/sales';
import Rents from '../../components/home/rents/Rents';
import Zones from '../../components/home/zones/zones';
import styled from 'styled-components';

const Home = () => {
    return (
        <>
            <Header />
            <Hero />
            <SalesContainer>
                <Sales />
                <Rents />
                <Zones />
            </SalesContainer>
            <GallerySection />
            <AboutSection />
            <Map />
        </>
    );
};

export default Home;

const SalesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
  background-color: var(--text-light);
`;
