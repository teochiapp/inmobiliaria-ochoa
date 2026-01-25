import React from 'react';
import Header from '../../components/header/Header';
import Hero from '../../components/home/hero/Hero';
import Sales from '../../components/home/sales/sales';
import Rents from '../../components/home/rents/Rents';
import Zones from '../../components/home/zones/zones';
import { SalesContainer } from './Home.styles';

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
        </>
    );
};

export default Home;
