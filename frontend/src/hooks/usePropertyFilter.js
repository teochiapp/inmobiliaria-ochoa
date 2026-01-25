import { useState, useMemo } from 'react';

const normalizeText = (text) => {
    return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const parsePrice = (priceString) => {
    return parseInt(priceString.replace(/[^0-9]/g, ''));
};

export const usePropertyFilter = (properties) => {
    const [filters, setFilters] = useState({
        name: '',
        minPrice: '',
        maxPrice: '',
        beds: 'any',
        baths: 'any',
        m2: 'any'
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const filteredProperties = useMemo(() => {
        return properties.filter(property => {
            // Filter by name or location
            if (filters.name) {
                const searchTerm = normalizeText(filters.name);
                const propertyName = normalizeText(property.nombre || property.name || '');
                const propertyLocation = normalizeText(property.ubicacion || property.location || '');

                if (!propertyName.includes(searchTerm) && !propertyLocation.includes(searchTerm)) {
                    return false;
                }
            }

            // Price filtering
            if (filters.minPrice || filters.maxPrice) {
                const propertyPrice = parsePrice(property.precio);

                if (filters.minPrice && propertyPrice < parseInt(filters.minPrice)) {
                    return false;
                }

                if (filters.maxPrice && propertyPrice > parseInt(filters.maxPrice)) {
                    return false;
                }
            }

            // Filter by bedrooms
            if (filters.beds !== 'any' && property.habitaciones < parseInt(filters.beds)) {
                return false;
            }

            // Filter by bathrooms
            if (filters.baths !== 'any' && property.baños < parseInt(filters.baths)) {
                return false;
            }

            // Filter by m2
            if (filters.m2 !== 'any' && property.m2 < parseInt(filters.m2)) {
                return false;
            }

            return true;
        });
    }, [properties, filters]);

    return {
        filters,
        handleFilterChange,
        filteredProperties
    };
};
