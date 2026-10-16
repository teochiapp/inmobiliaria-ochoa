import { useState, useMemo, useCallback } from 'react';

const normalizeText = (text) => {
    return String(text || '').toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
};

const parsePrice = (priceString) => {
    const n = parseInt(String(priceString || '').replace(/[^0-9]/g, ''), 10);
    return Number.isNaN(n) ? null : n;
};

export const DEFAULT_FILTERS = {
    name: '',
    minPrice: '',
    maxPrice: '',
    beds: 'any',
    baths: 'any',
    m2: 'any'
};

export const usePropertyFilter = (properties, initialFilters = {}) => {
    const [filters, setFilters] = useState({ ...DEFAULT_FILTERS, ...initialFilters });

    const handleFilterChange = useCallback((e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    }, []);

    const resetFilters = useCallback(() => setFilters({ ...DEFAULT_FILTERS }), []);

    const filteredProperties = useMemo(() => {
        return (properties || []).filter(property => {
            // Filter by name or location
            if (filters.name) {
                const searchTerm = normalizeText(filters.name);
                const propertyName = normalizeText(property.nombre || property.name || '');
                const propertyLocation = normalizeText(property.ubicacion || property.location || '');

                if (!propertyName.includes(searchTerm) && !propertyLocation.includes(searchTerm)) {
                    return false;
                }
            }

            // Price filtering (properties without price are kept: "Consultar")
            if (filters.minPrice || filters.maxPrice) {
                const propertyPrice = parsePrice(property.precio);

                if (propertyPrice !== null) {
                    if (filters.minPrice && propertyPrice < parseInt(filters.minPrice, 10)) {
                        return false;
                    }

                    if (filters.maxPrice && propertyPrice > parseInt(filters.maxPrice, 10)) {
                        return false;
                    }
                }
            }

            // Filter by bedrooms
            if (filters.beds !== 'any' && property.habitaciones < parseInt(filters.beds, 10)) {
                return false;
            }

            // Filter by bathrooms
            if (filters.baths !== 'any' && property.baños < parseInt(filters.baths, 10)) {
                return false;
            }

            // Filter by m2
            if (filters.m2 !== 'any' && property.m2 < parseInt(filters.m2, 10)) {
                return false;
            }

            return true;
        });
    }, [properties, filters]);

    return {
        filters,
        handleFilterChange,
        resetFilters,
        filteredProperties
    };
};
