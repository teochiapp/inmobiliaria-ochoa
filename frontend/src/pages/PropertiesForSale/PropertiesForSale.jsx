import React from 'react';
import useSales from '../../hooks/useSales';
import PropertyCatalog from '../../components/common/PropertyCatalog';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/footer';
import styled from 'styled-components';

const PropertiesForSale = () => {
    const { sales, loading, error } = useSales();

    return (
        <PageWrapper>
            <Header />
            <ContentWrapper>
                <PropertyCatalog
                    properties={sales}
                    loading={loading}
                    error={error}
                    title="Propiedades en Venta"
                    baseUrl="/propiedad/venta"
                />
            </ContentWrapper>
            <Footer />
        </PageWrapper>
    );
};

export default PropertiesForSale;

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const ContentWrapper = styled.div`
    flex: 1;
    padding-top: 100px;
`;
