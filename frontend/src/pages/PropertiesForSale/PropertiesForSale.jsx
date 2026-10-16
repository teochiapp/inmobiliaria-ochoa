import React from 'react';
import Layout from '../../components/mo/Layout';
import PageHero from '../../components/mo/PageHero';
import PropertyCatalog from '../../components/mo/PropertyCatalog';
import { CtaBand } from '../../components/mo/Sections';
import useSales from '../../hooks/useSales';
import { SITE, waLink } from '../../config/site';
import heroBg from '../../public/galeria/yacantoarriba.jpg';

const PropertiesForSale = () => {
    const { sales, loading, error } = useSales();

    return (
        <Layout title="Propiedades en venta">
            <PageHero
                small
                image={heroBg}
                crumbs={[{ label: 'Inicio', to: '/' }, { label: 'Propiedades en venta' }]}
                title="Propiedades"
                accent="en venta"
                subtitle="Descubrí tu próxima inversión o el hogar de tus sueños en el Valle de Calamuchita."
                meta={[
                    { value: loading ? '…' : sales.length, label: 'Disponibles' },
                    { value: '15+', label: 'Años de trayectoria' },
                ]}
            />
            <PropertyCatalog properties={sales} loading={loading} error={error} operation="Venta" baseUrl="/propiedad/venta" countLabel="propiedades encontradas" />
            <CtaBand
                title="¿Querés vender tu propiedad?"
                accent="Te la tasamos."
                cta="Solicitar una estimación"
                href={waLink(SITE.salesWhatsapp, 'Hola, quisiera solicitar una estimación de mi propiedad.')}
            />
        </Layout>
    );
};

export default PropertiesForSale;
