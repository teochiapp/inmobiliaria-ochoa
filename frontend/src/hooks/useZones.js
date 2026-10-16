import { useState, useEffect, useMemo } from 'react';
import api from '../services/api';
import { getMedia } from '../services/media';

// Una sola petición compartida entre header, footer y páginas
let zonesRequest = null;

const useZones = () => {
    const [zonesData, setZonesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let active = true;
        if (!zonesRequest) {
            zonesRequest = api.get('/zonas?populate=*').then(r => r.data.data || []);
            zonesRequest.catch(() => { zonesRequest = null; });
        }
        zonesRequest
            .then(data => {
                if (!active) return;
                setZonesData(data);
                setLoading(false);
            })
            .catch(err => {
                if (!active) return;
                console.error("Error fetching zones data:", err);
                setError(err);
                setLoading(false);
            });
        return () => { active = false; };
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

            const cover = getMedia(attributes.Portada);

            // Map description (blocks)
            const description = extractTextFromBlocks(attributes.Descripcion);

            return {
                id: item.id,
                documentId: item.documentId, // Strapi v5 uses documentId for individual queries
                slug: attributes.Slug || attributes.slug || null, // URLs limpias: /zona/mirador-del-lago
                image: cover?.url || '',
                imageSrcSet: cover?.srcSet || '',
                title: attributes.Nombre || 'Zona desconocida',
                subtitle: attributes.Subtitulo || '',
                description: description
            };
        });
    }, [zonesData]);

    return { zones, loading, error };
};

export default useZones;
