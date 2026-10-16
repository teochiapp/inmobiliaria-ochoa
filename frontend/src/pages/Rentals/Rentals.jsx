import React from 'react';
import Layout from '../../components/mo/Layout';
import PageHero from '../../components/mo/PageHero';
import PropertyCatalog from '../../components/mo/PropertyCatalog';
import { ToolsBand } from '../../components/mo/Sections';
import useRents from '../../hooks/useRents';
import heroBg from '../../public/galeria/Villa-del-Diquearriba.jpeg';

const Rentals = () => {
    const { rents, loading, error } = useRents();

    return (
        <Layout title="Alquileres">
            <PageHero
                small
                image={heroBg}
                crumbs={[{ label: 'Inicio', to: '/' }, { label: 'Alquileres' }]}
                title="Propiedades"
                accent="en alquiler"
                subtitle="Encontrá tu lugar ideal para vivir o vacacionar, junto a los lagos y ríos de las Sierras de Córdoba."
                meta={[
                    { value: loading ? '…' : rents.length, label: 'Disponibles' },
                    { value: '15+', label: 'Años de trayectoria' },
                ]}
            />
            <PropertyCatalog properties={rents} loading={loading} error={error} operation="Alquiler" baseUrl="/propiedad/alquiler" countLabel="alquileres disponibles" />
            <section className="mo-sec mo-sec--tight mo-sec--ivory" style={{ paddingTop: 0 }}>
                <div className="mo-wrap">
                    <ToolsBand />
                </div>
            </section>
        </Layout>
    );
};

export default Rentals;
