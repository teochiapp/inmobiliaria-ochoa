import { useState, useEffect, useMemo } from 'react';
import api from '../services/api';
import { getMedia } from '../services/media';

const useRents = () => {
    const [rentsData, setRentsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRents = async () => {
            try {
                const response = await api.get('/alquileres?populate=*');
                setRentsData(response.data.data || []);
            } catch (err) {
                console.error("Error fetching rents data:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchRents();
    }, []);

    const rents = useMemo(() => {
        return (rentsData || []).map(item => {
            const attributes = item.attributes || item;
            const cover = getMedia(attributes.Portada);

            return {
                id: item.id,
                slug: attributes.Slug,
                imagen: cover?.url || '',
                imagenSrcSet: cover?.srcSet || '',
                nombre: attributes.Nombre || attributes.Ubicacion || 'Propiedad en Alquiler',
                precio: attributes.Precio ? `$${attributes.Precio}` : '',
                // Periodo del alquiler cargado en Strapi: 'mes' | 'semana' | 'dia'
                periodo: attributes.Periodo || null,
                habitaciones: attributes.Habitaciones || 0,
                baños: attributes.Banos || 0,
                m2: attributes.MetrosCuadrados || 0,
                ubicacion: attributes.Ubicacion || '',
                // Zona: en Strapi v5 viene como objeto directo (no envuelto en .data)
                zona: attributes.Zona?.id || attributes.Zona?.data?.id || null,
                zonaSlug: attributes.Zona?.Slug || attributes.Zona?.data?.attributes?.Slug || null,
                createdAt: item.createdAt
            };
        });
    }, [rentsData]);

    return { rents, loading, error };
};

export default useRents;
