import React from 'react';
import { ChevronRight } from 'lucide-react';
import PropertyCard from '../PropertyCard/PropertyCard';
import {
    SectionContainer,
    SectionHeader,
    SectionTitle,
    ViewAllButton,
    PropertiesGrid
} from './SalesSection.styles';

// Datos hardcodeados temporales
const rentProperties = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
        name: 'Dominion',
        price: 'Consultar',
        bedrooms: 3,
        bathrooms: 2,
        location: 'Todos Santos, Baja California Sur'
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800',
        name: 'Swan Valley',
        price: 'Consultar',
        bedrooms: 4,
        bathrooms: 3,
        location: 'Los Cabos, BCS'
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
        name: 'Fort McDowell',
        price: 'Consultar',
        bedrooms: 5,
        bathrooms: 4,
        location: 'La Ribera, Baja California Sur'
    }
];

const Rent = () => {
    return (
        <SectionContainer>
            <SectionHeader>
                <SectionTitle>ALQUILERES</SectionTitle>
                <ViewAllButton>
                    Ver todo
                    <ChevronRight />
                </ViewAllButton>
            </SectionHeader>

            <PropertiesGrid>
                {rentProperties.map((property) => (
                    <PropertyCard
                        key={property.id}
                        image={property.image}
                        name={property.name}
                        price={property.price}
                        bedrooms={property.bedrooms}
                        bathrooms={property.bathrooms}
                        location={property.location}
                    />
                ))}
            </PropertiesGrid>
        </SectionContainer>
    );
};

export default Rent;