import { useState, useEffect, useMemo } from 'react';
import api from '../services/api';

// Remove /api from the end to get base URL for images
const STRAPI_BASE_URL = (() => {
    const apiUrl = process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337/api';
    return apiUrl.endsWith('/api') ? apiUrl.slice(0, -4) : apiUrl;
})();

const useZones = () => {
    const [zonesData, setZonesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchZones = async () => {
            try {
                const response = await api.get('/zonas?populate=*');
                const data = response.data.data;
                setZonesData(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching zones data:", err);
                setError(err);
                setLoading(false);
            }
        };

        fetchZones();
    }, []);

    const extractTextFromBlocks = (blocks) => {
        if (!blocks || !Array.isArray(blocks)) return '';
        return blocks.map(block => {
            if (block.children && Array.isArray(block.children)) {
                return block.children.map(child => child.text).join('');
            }
            return '';
        }).join('\n');
    };

    // Transform data
    const zones = useMemo(() => {
        if (!zonesData || zonesData.length === 0) return [];

        return zonesData.map(item => {
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

            // Map description (blocks)
            const description = extractTextFromBlocks(attributes.Descripcion);

            return {
                id: item.id,
                documentId: item.documentId, // Strapi v5 uses documentId for individual queries
                Slug: attributes.Slug || attributes.slug, // For clean URLs
                slug: attributes.Slug || attributes.slug, // Lowercase fallback
                image: fullImgUrl,
                title: attributes.Nombre || 'Zona desconocida',
                subtitle: attributes.Subtitulo || '',
                description: description
            };
        });
    }, [zonesData]);

    return { zones, loading, error };
};

export default useZones;
