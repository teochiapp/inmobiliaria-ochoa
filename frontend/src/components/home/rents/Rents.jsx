import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import PropertyCard from '../PropertyCard/PropertyCard';
import PropertyFilters from '../../common/PropertyFilters';
import { usePropertyFilter } from '../../../hooks/usePropertyFilter';
import useRents from '../../../hooks/useRents';
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

const Rents = () => {
    const { rents, loading } = useRents();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const { filters, handleFilterChange, filteredProperties } = usePropertyFilter(rents);

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
    }, [filters, itemsPerPage, rents]); // Also reset when data changes

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

    // Swipe handlers
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe && canGoNext) {
            handleNext();
        }
        if (isRightSwipe && canGoPrev) {
            handlePrev();
        }
    };

    const visibleProperties = filteredProperties.slice(
        currentIndex * itemsPerPage,
        (currentIndex + 1) * itemsPerPage
    );

    if (loading) {
        return (
            <SectionContainer>
                <SectionHeader>
                    <SectionTitle>ALQUILERES</SectionTitle>
                </SectionHeader>
                <div style={{ textAlign: 'center', padding: '2rem' }}>Cargando propiedades...</div>
            </SectionContainer>
        );
    }

    return (
        <SectionContainer>
            <SectionHeader>
                <SectionTitle>ALQUILERES</SectionTitle>
                <ViewAllButton as={Link} to="/alquileres">
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

                <SliderContainer
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                >
                    <PropertiesGrid>
                        <AnimatePresence mode="wait">
                            {visibleProperties.length > 0 ? (
                                visibleProperties.map((property, index) => (
                                    <motion.div
                                        key={`${property.id}-${currentIndex}-${index}`}
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                        style={{ display: 'flex' }}
                                    >
                                        <PropertyCard
                                            image={property.imagen}
                                            name={property.nombre}
                                            price={property.precio}
                                            bedrooms={property.habitaciones}
                                            bathrooms={property.baños}
                                            location={property.ubicacion}
                                            m2={property.m2}
                                            period={property.period}
                                            link={`/propiedad/alquiler/${property.id}`}
                                        />
                                    </motion.div>
                                ))
                            ) : (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    style={{ width: '100%', textAlign: 'center', padding: '2rem', color: '#666' }}
                                >
                                    No se encontraron propiedades que coincidan con los filtros.
                                </motion.div>
                            )}
                        </AnimatePresence>
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
