import { useState, useMemo } from 'react';

const parsePrice = (priceString) => {
    return parseInt(priceString.replace(/[^0-9]/g, ''));
};

export const usePropertyFilter = (properties) => {
    const [filters, setFilters] = useState({
        name: '',
        maxPrice: '',
        beds: 'any',
        baths: 'any'
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const filteredProperties = useMemo(() => {
        return properties.filter(property => {
            // Filter by name
            if (filters.name && !property.nombre.toLowerCase().includes(filters.name.toLowerCase())) {
                return false;
            }

            // Filter by max price
            if (filters.maxPrice) {
                const propertyPrice = parsePrice(property.precio);
                if (propertyPrice > parseInt(filters.maxPrice)) {
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

            return true;
        });
    }, [properties, filters]);

    return {
        filters,
        handleFilterChange,
        filteredProperties
    };
};
