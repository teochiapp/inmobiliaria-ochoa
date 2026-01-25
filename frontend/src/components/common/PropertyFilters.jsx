import React from 'react';
import {
    FilterContainer,
    FilterInput,
    FilterSelect
} from '../home/sales/SalesSection.styles';

const PropertyFilters = ({ filters, onFilterChange }) => {
    return (
        <FilterContainer>
            <FilterInput
                type="text"
                placeholder="Buscar por nombre..."
                name="name"
                value={filters.name}
                onChange={onFilterChange}
            />

            <FilterInput
                type="number"
                placeholder="Precio máximo"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={onFilterChange}
            />

            <FilterSelect name="beds" value={filters.beds} onChange={onFilterChange}>
                <option value="any">Habitaciones (Todas)</option>
                <option value="1">1+ Habitaciones</option>
                <option value="2">2+ Habitaciones</option>
                <option value="3">3+ Habitaciones</option>
                <option value="4">4+ Habitaciones</option>
                <option value="5">5+ Habitaciones</option>
            </FilterSelect>

            <FilterSelect name="baths" value={filters.baths} onChange={onFilterChange}>
                <option value="any">Baños (Todos)</option>
                <option value="1">1+ Baños</option>
                <option value="2">2+ Baños</option>
                <option value="3">3+ Baños</option>
                <option value="4">4+ Baños</option>
            </FilterSelect>
        </FilterContainer>
    );
};

export default PropertyFilters;
