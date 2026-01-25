import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import PropertyCard from '../PropertyCard/PropertyCard';
import PropertyFilters from '../../common/PropertyFilters';
import { usePropertyFilter } from '../../../hooks/usePropertyFilter';
import {
    SectionContainer,
    SectionHeader,
    SectionTitle,
    ViewAllButton,
    SliderWrapper,
    SliderContainer,
    SliderButton,
    PropertiesGrid
} from './SalesSection.styles';

// Datos hardcodeados temporales
const salesProperties = [
    {
        id: 1,
        imagen: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
        nombre: 'Ocean Breeze Villa',
        precio: '€90,000',
        habitaciones: 4,
        baños: 3,
        m2: 450,
        ubicacion: 'Cabo Pulmo, BCS'
    },
    {
        id: 2,
        imagen: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
        nombre: 'Jakson House',
        precio: '€70,000',
        habitaciones: 3,
        baños: 2,
        m2: 250,
        ubicacion: 'San José del Cabo, BCS'
    },
    {
        id: 3,
        imagen: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
        nombre: 'Lakeside Cottage',
        precio: '€540,000',
        habitaciones: 5,
        baños: 4,
        m2: 550,
        ubicacion: 'La Paz, BCS'
    },
    {
        id: 4,
        imagen: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
        nombre: 'Mountain Retreat',
        precio: '€320,000',
        habitaciones: 4,
        baños: 3,
        m2: 320,
        ubicacion: 'Todos Santos, BCS'
    },
    {
        id: 5,
        imagen: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
        nombre: 'Sunset Paradise',
        precio: '€450,000',
        habitaciones: 3,
        baños: 2,
        m2: 180,
        ubicacion: 'Cabo San Lucas, BCS'
    },
    {
        id: 6,
        imagen: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800',
        nombre: 'Desert Oasis',
        precio: '€280,000',
        habitaciones: 4,
        baños: 3,
        m2: 600,
        ubicacion: 'Loreto, BCS'
    }
];

const Sales = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const { filters, handleFilterChange, filteredProperties } = usePropertyFilter(salesProperties);

    // Responsive items per page
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setItemsPerPage(1);
            } else if (window.innerWidth < 1024) {
                setItemsPerPage(2);
            } else {
                setItemsPerPage(3);
            }
        };

        handleResize(); // Initial call
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Reset slider when filters change
    useEffect(() => {
        setCurrentIndex(0);
    }, [filters, itemsPerPage]); // Also reset when itemsPerPage changes to avoid index issues

    const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

    const canGoPrev = currentIndex > 0;
    const canGoNext = currentIndex < totalPages - 1;

    const handlePrev = () => {
        if (canGoPrev) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    const handleNext = () => {
        if (canGoNext) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const visibleProperties = filteredProperties.slice(
        currentIndex * itemsPerPage,
        (currentIndex + 1) * itemsPerPage
    );

    return (
        <SectionContainer>
            <SectionHeader>
                <SectionTitle>VENTAS</SectionTitle>
                <ViewAllButton>
                    Ver todo
                    <ChevronRight />
                </ViewAllButton>
            </SectionHeader>

            <PropertyFilters filters={filters} onFilterChange={handleFilterChange} />

            <SliderWrapper>
                <SliderButton
                    onClick={handlePrev}
                    $visible={canGoPrev}
                    aria-label="Anterior"
                >
                    <ChevronLeft />
                </SliderButton>

                <SliderContainer>
                    <PropertiesGrid>
                        {visibleProperties.length > 0 ? (
                            visibleProperties.map((property, index) => (
                                <PropertyCard
                                    key={`${property.id}-${currentIndex}-${index}`}
                                    image={property.imagen}
                                    name={property.nombre}
                                    price={property.precio}
                                    bedrooms={property.habitaciones}
                                    bathrooms={property.baños}
                                    location={property.ubicacion}
                                />
                            ))
                        ) : (
                            <div style={{ width: '100%', textAlign: 'center', padding: '2rem', color: '#666' }}>
                                No se encontraron propiedades que coincidan con los filtros.
                            </div>
                        )}
                    </PropertiesGrid>
                </SliderContainer>

                <SliderButton
                    onClick={handleNext}
                    $visible={canGoNext}
                    $right
                    aria-label="Siguiente"
                >
                    <ChevronRight />
                </SliderButton>
            </SliderWrapper>
        </SectionContainer>
    );
};

export default Sales;