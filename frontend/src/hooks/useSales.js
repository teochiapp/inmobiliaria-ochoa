import { useState, useEffect, useMemo } from 'react';
import api from '../services/api';
import { getMedia } from '../services/media';

const useSales = () => {
    const [salesData, setSalesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const response = await api.get('/ventas?populate=*');
                setSalesData(response.data.data || []);
            } catch (err) {
                console.error("Error fetching sales data:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSales();
    }, []);

    const sales = useMemo(() => {
        return (salesData || []).map(item => {
            const attributes = item.attributes || item;
            const cover = getMedia(attributes.Portada);

            return {
                id: item.id,
                slug: attributes.Slug,
                imagen: cover?.url || '',
                imagenSrcSet: cover?.srcSet || '',
                nombre: attributes.Nombre || attributes.Ubicacion || 'Propiedad en Venta',
                precio: attributes.Precio ? `$${attributes.Precio}` : '',
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
    }, [salesData]);

    return { sales, loading, error };
};

export default useSales;
