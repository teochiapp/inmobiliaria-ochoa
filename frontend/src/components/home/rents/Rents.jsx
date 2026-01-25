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
} from '../sales/SalesSection.styles';

// Datos hardcodeados temporales para rentas
const rentProperties = [
    {
        id: 1,
        imagen: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
        nombre: 'Modern Apartment',
        precio: '€1,200/mes',
        habitaciones: 2,
        baños: 2,
        m2: 85,
        ubicacion: 'Cabo San Lucas, BCS'
    },
    {
        id: 2,
        imagen: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
        nombre: 'Beach House',
        precio: '€2,500/mes',
        habitaciones: 3,
        baños: 2,
        m2: 250,
        ubicacion: 'Todos Santos, BCS'
    },
    {
        id: 3,
        imagen: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
        nombre: 'Downtown Loft',
        precio: '€1,800/mes',
        habitaciones: 2,
        baños: 1,
        m2: 120,
        ubicacion: 'La Paz, BCS'
    },
    {
        id: 4,
        imagen: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
        nombre: 'Villa with Pool',
        precio: '€3,200/mes',
        habitaciones: 4,
        baños: 3,
        m2: 400,
        ubicacion: 'San José del Cabo, BCS'
    },
    {
        id: 5,
        imagen: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800',
        nombre: 'Cozy Cottage',
        precio: '€1,500/mes',
        habitaciones: 2,
        baños: 1,
        m2: 90,
        ubicacion: 'Todos Santos, BCS'
    },
    {
        id: 6,
        imagen: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800',
        nombre: 'Luxury Penthouse',
        precio: '€4,500/mes',
        habitaciones: 3,
        baños: 3,
        m2: 300,
        ubicacion: 'Cabo San Lucas, BCS'
    }
];

const Rents = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const { filters, handleFilterChange, filteredProperties } = usePropertyFilter(rentProperties);

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

    // Autoplay logic
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => {
                const currentTotalPages = Math.ceil(filteredProperties.length / itemsPerPage);
                if (currentTotalPages <= 1) return 0;

                const nextIndex = prevIndex + 1;
                if (nextIndex >= currentTotalPages) {
                    return 0; // Loop back to start
                }
                return nextIndex;
            });
        }, 8000);

        return () => clearInterval(interval);
    }, [filteredProperties.length, itemsPerPage]);

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
                <SectionTitle>ALQUILERES</SectionTitle>
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

export default Rents;
