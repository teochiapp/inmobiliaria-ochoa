import { useState, useEffect, useMemo } from 'react';
import api from '../services/api';

const STRAPI_BASE_URL = import.meta.env.VITE_STRAPI_URL?.replace('/api', '') || 'http://localhost:1337';

const useZoneProperties = (zoneId) => {
    const [salesData, setSalesData] = useState([]);
    const [rentsData, setRentsData] = useState([]);
    const [zoneData, setZoneData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!zoneId) {
            setLoading(false);
            return;
        }

        const fetchZoneProperties = async () => {
            setLoading(true);
            try {
                // Fetch zone info using documentId for Strapi v5
                const zoneResponse = await api.get(`/zonas/${zoneId}?populate=*`);
                setZoneData(zoneResponse.data.data);

                // Get the numeric id from the zone response for filtering
                const numericZoneId = zoneResponse.data.data?.id;

                if (!numericZoneId) {
                    throw new Error('No se pudo obtener el ID de la zona');
                }

                // Fetch sales for this zone - Using numeric ID for filtering
                const salesResponse = await api.get(`/ventas?populate=*&filters[Zona][id][$eq]=${numericZoneId}`);
                setSalesData(salesResponse.data.data || []);

                // Fetch rentals for this zone - Using numeric ID for filtering
                const rentsResponse = await api.get(`/alquileres?populate=*&filters[Zona][id][$eq]=${numericZoneId}`);
                setRentsData(rentsResponse.data.data || []);

                setLoading(false);
            } catch (err) {
                console.error("Error fetching zone properties:", err);
                setError(err);
                setLoading(false);
            }
        };

        fetchZoneProperties();
    }, [zoneId]);

    // Transform and combine data
    const properties = useMemo(() => {
        const transformProperty = (item, type) => {
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
            const name = attributes.Nombre || attributes.Ubicacion ||
                (type === 'venta' ? 'Propiedad en Venta' : 'Propiedad en Alquiler');

            return {
                id: item.id,
                slug: attributes.Slug,
                imagen: fullImgUrl,
                nombre: name,
                precio: attributes.Precio ?
                    (type === 'venta' ? `$${attributes.Precio}` : `$${attributes.Precio}/mes`) : '',
                habitaciones: attributes.Habitaciones || 0,
                baños: attributes.Banos || 0,
                m2: attributes.MetrosCuadrados || 0,
                ubicacion: attributes.Ubicacion || '',
                type: type, // 'venta' or 'alquiler'
                baseUrl: type === 'venta' ? '/propiedad/venta' : '/propiedad/alquiler'
            };
        };

        const sales = salesData.map(item => transformProperty(item, 'venta'));
        const rents = rentsData.map(item => transformProperty(item, 'alquiler'));

        return [...sales, ...rents];
    }, [salesData, rentsData]);

    // Transform zone data
    const zone = useMemo(() => {
        if (!zoneData) return null;

        const attributes = zoneData.attributes || zoneData;

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

        return {
            id: zoneData.id,
            documentId: zoneData.documentId, // Strapi v5 uses documentId
            nombre: attributes.Nombre || 'Zona',
            subtitulo: attributes.Subtitulo || '',
            imagen: fullImgUrl
        };
    }, [zoneData]);

    return { properties, zone, loading, error };
};

export default useZoneProperties;
