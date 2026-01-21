import React, { useState, useEffect } from 'react';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
// Aquí iría el servicio para traer datos
// import { getProperties } from '../../services/propertyService';

const PropertyListContainer = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulamos una llamada a API
        const fetchData = async () => {
            setLoading(true);
            // Simulación de delay
            setTimeout(() => {
                setProperties([
                    { id: 1, title: 'Casa Moderna en Nordelta', price: 450000, location: 'Tigre' },
                    { id: 2, title: 'Departamento Centro', price: 120000, location: 'CABA' },
                    { id: 3, title: 'Quinta con pileta', price: 300000, location: 'Pilar' },
                ]);
                setLoading(false);
            }, 1000);
        };

        fetchData();
    }, []);

    if (loading) return <p>Cargando propiedades...</p>;

    return (
        <div className="property-list">
            {properties.map(property => (
                <PropertyCard key={property.id} property={property} />
            ))}
        </div>
    );
};

export default PropertyListContainer;
