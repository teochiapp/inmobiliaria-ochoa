import { useState, useEffect, useMemo } from 'react';
import api from '../services/api';

// Remove /api from the end to get base URL for images
const STRAPI_BASE_URL = (() => {
    const apiUrl = process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337/api';
    return apiUrl.endsWith('/api') ? apiUrl.slice(0, -4) : apiUrl;
})();

const useRents = () => {
    const [rentsData, setRentsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRents = async () => {
            try {
                const response = await api.get('/alquileres?populate=*');
                const data = response.data.data;
                setRentsData(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching rents data:", err);
                setError(err);
                setLoading(false);
            }
        };

        fetchRents();
    }, []);

    // Transform data
    const rents = useMemo(() => {
        if (!rentsData || rentsData.length === 0) return [];

        return rentsData.map(item => {
            const attributes = item.attributes || item;

            // Map image
            const imgField = attributes.Portada;
            let imgUrl = '';
            if (imgField?.data) {
                const imgData = imgField.data;
                const imgObj = Array.isArray(imgData) ? imgData[0] : imgData;
                imgUrl = imgObj?.attributes?.url || imgObj?.url;
            } else if (imgField?.url) {
                imgUrl = imgField.url;
            }
            const fullImgUrl = imgUrl ? `${STRAPI_BASE_URL}${imgUrl}` : '';

            // Map other fields
            // Note: 'nombre' is not in schema, using 'Ubicacion' or checking if 'Nombre' exists just in case
            // If the user adds 'Nombre' later it will appear, otherwise fallback to Ubicacion
            const name = attributes.Nombre || attributes.Ubicacion || 'Propiedad en Renta';

            return {
                id: item.id,
                slug: attributes.Slug,
                imagen: fullImgUrl,
                nombre: name,
                precio: attributes.Precio ? `$${attributes.Precio}/mes` : '', // Format price?
                habitaciones: attributes.Habitaciones || 0,
                baños: attributes.Banos || 0,
                m2: attributes.MetrosCuadrados || 0,
                ubicacion: attributes.Ubicacion || ''
            };
        });
    }, [rentsData]);

    return { rents, loading, error };
};

export default useRents;
