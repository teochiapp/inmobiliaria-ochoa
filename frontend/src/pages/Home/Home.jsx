import React from 'react';
import Header from '../../components/header/Header';
import Hero from '../../components/home/hero/Hero';
import Sales from '../../components/home/sales/sales';
import Rent from '../../components/home/sales/rent';
import { SalesContainer } from './Home.styles';

const Home = () => {
    return (
        <>
            <Header />
            <Hero />
            <SalesContainer>
                <Sales />
                <Rent />
            </SalesContainer>
        </>
    );
};

export default Home;
