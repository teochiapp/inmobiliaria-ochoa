import React, { useMemo } from 'react';
import useSales from '../../hooks/useSales';
import PropertyCatalog from '../../components/common/PropertyCatalog';
import PropertyFilters from '../../components/common/PropertyFilters';
import { usePropertyFilter } from '../../hooks/usePropertyFilter';
import SalesHero from '../../components/sales/SalesHero';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/footer';
import styled from 'styled-components';

const PropertiesForSale = () => {
    const { sales, loading, error } = useSales();

    // Sort properties by newest first
    const sortedProperties = useMemo(() => {
        return [...(sales || [])].sort((a, b) => {
            const dateA = new Date(a.createdAt || a.publishedAt || 0);
            const dateB = new Date(b.createdAt || b.publishedAt || 0);
            return dateB - dateA;
        });
    }, [sales]);

    const { filters, handleFilterChange, filteredProperties } = usePropertyFilter(sortedProperties);

    return (
        <PageWrapper>
            <Header isSolid={false} />
            <SalesHero />
            <ContentWrapper>
                <PropertyFilters filters={filters} onFilterChange={handleFilterChange} layout="horizontal" />
                <PropertyCatalog
                    properties={filteredProperties}
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
    padding-top: 50px;
`;
