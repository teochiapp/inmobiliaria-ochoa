import React from 'react';
import useRents from '../../hooks/useRents';
import PropertyCatalog from '../../components/common/PropertyCatalog';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/footer';
import styled from 'styled-components';

const Rentals = () => {
    const { rents, loading, error } = useRents();

    return (
        <PageWrapper>
            <Header />
            <ContentWrapper>
                <PropertyCatalog
                    properties={rents}
                    loading={loading}
                    error={error}
                    title="Alquileres"
                    baseUrl="/propiedad/alquiler"
                />
            </ContentWrapper>
            <Footer />
        </PageWrapper>
    );
};

export default Rentals;

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const ContentWrapper = styled.div`
    flex: 1;
    padding-top: 100px;
`;
