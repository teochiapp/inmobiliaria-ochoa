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
const salesProperties = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
        name: 'Ocean Breeze Villa',
        price: '€90,000.00',
        bedrooms: 4,
        bathrooms: 3,
        location: 'Cabo Pulmo, Baja California Sur'
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
        name: 'Jakson House',
        price: '€70,000.00',
        bedrooms: 3,
        bathrooms: 2,
        location: 'San José del Cabo, BCS'
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
        name: 'Lakeside Cottage',
        price: '€540,000.00',
        bedrooms: 5,
        bathrooms: 4,
        location: 'La Paz, Baja California Sur'
    }
];

const Sales = () => {
    return (
        <SectionContainer>
            <SectionHeader>
                <SectionTitle>VENTAS</SectionTitle>
                <ViewAllButton>
                    Ver todo
                    <ChevronRight />
                </ViewAllButton>
            </SectionHeader>

            <PropertiesGrid>
                {salesProperties.map((property) => (
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

export default Sales;