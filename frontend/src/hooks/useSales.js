import { useState, useEffect, useMemo } from 'react';
import api from '../services/api';

// Remove /api from the end to get base URL for images
const STRAPI_BASE_URL = (() => {
    const apiUrl = process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337/api';
    return apiUrl.endsWith('/api') ? apiUrl.slice(0, -4) : apiUrl;
})();

const useSales = () => {
    const [salesData, setSalesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const response = await api.get('/ventas?populate=*');
                const data = response.data.data;
                setSalesData(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching sales data:", err);
                setError(err);
                setLoading(false);
            }
        };

        fetchSales();
    }, []);

    // Transform data
    const sales = useMemo(() => {
        if (!salesData || salesData.length === 0) return [];

        return salesData.map(item => {
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
            const name = attributes.Nombre || attributes.Ubicacion || 'Propiedad en Venta';

            return {
                id: item.id,
                slug: attributes.Slug,
                imagen: fullImgUrl,
                nombre: name,
                precio: attributes.Precio ? `$${attributes.Precio}` : '',
                habitaciones: attributes.Habitaciones || 0,
                baños: attributes.Banos || 0,
                m2: attributes.MetrosCuadrados || 0,
                ubicacion: attributes.Ubicacion || ''
            };
        });
    }, [salesData]);

    return { sales, loading, error };
};

export default useSales;
