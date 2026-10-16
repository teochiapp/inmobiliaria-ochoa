import { useState, useEffect, useMemo } from 'react';
import api from '../services/api';
import { getMedia, getMediaList } from '../services/media';

const blocksToParagraphs = (blocks) => {
    if (Array.isArray(blocks)) {
        return blocks
            .map(b => (Array.isArray(b.children) ? b.children.map(c => c.text || '').join('') : ''))
            .filter(t => t.trim());
    }
    if (typeof blocks === 'string') return blocks.split(/\n{2,}/).filter(t => t.trim());
    return [];
};

// Busca la zona por Slug (URLs limpias) y, si no la encuentra, por documentId / id.
const fetchZone = async (zoneId) => {
    try {
        const bySlug = await api.get(`/zonas?filters[Slug][$eq]=${encodeURIComponent(zoneId)}&populate=*`);
        if (bySlug.data.data?.length) return bySlug.data.data[0];
    } catch (e) {
        // si falla por slug, probamos por id
    }
    const byId = await api.get(`/zonas/${zoneId}?populate=*`);
    return byId.data.data;
};

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

        let active = true;
        const fetchZoneProperties = async () => {
            setLoading(true);
            setError(null);
            try {
                const zoneItem = await fetchZone(zoneId);
                if (!zoneItem) throw new Error('Zona no encontrada');

                const numericZoneId = zoneItem.id;
                const [salesResponse, rentsResponse] = await Promise.all([
                    api.get(`/ventas?populate=*&filters[Zona][id][$eq]=${numericZoneId}`),
                    api.get(`/alquileres?populate=*&filters[Zona][id][$eq]=${numericZoneId}`)
                ]);

                if (!active) return;
                setZoneData(zoneItem);
                setSalesData(salesResponse.data.data || []);
                setRentsData(rentsResponse.data.data || []);
            } catch (err) {
                console.error("Error fetching zone properties:", err);
                if (active) setError(err);
            } finally {
                if (active) setLoading(false);
            }
        };

        fetchZoneProperties();
        return () => { active = false; };
    }, [zoneId]);

    // Propiedades de la zona (ventas + alquileres)
    const properties = useMemo(() => {
        const transformProperty = (item, type) => {
            const attributes = item.attributes || item;
            const cover = getMedia(attributes.Portada);

            return {
                id: item.id,
                slug: attributes.Slug,
                imagen: cover?.url || '',
                imagenSrcSet: cover?.srcSet || '',
                nombre: attributes.Nombre || attributes.Ubicacion ||
                    (type === 'venta' ? 'Propiedad en Venta' : 'Propiedad en Alquiler'),
                precio: attributes.Precio ? `$${attributes.Precio}` : '',
                periodo: type === 'alquiler' ? (attributes.Periodo || null) : null,
                habitaciones: attributes.Habitaciones || 0,
                baños: attributes.Banos || 0,
                m2: attributes.MetrosCuadrados || 0,
                ubicacion: attributes.Ubicacion || '',
                createdAt: item.createdAt,
                type: type, // 'venta' o 'alquiler'
                baseUrl: type === 'venta' ? '/propiedad/venta' : '/propiedad/alquiler'
            };
        };

        return [
            ...salesData.map(item => transformProperty(item, 'venta')),
            ...rentsData.map(item => transformProperty(item, 'alquiler'))
        ];
    }, [salesData, rentsData]);

    // Datos de la zona / emprendimiento exclusivo
    const zone = useMemo(() => {
        if (!zoneData) return null;
        const attributes = zoneData.attributes || zoneData;
        const portada = getMedia(attributes.Portada);
        const cabecera = getMedia(attributes.ImagenCabecera) || portada;
        const galeria = [portada, ...getMediaList(attributes.Galeria)]
            .filter(Boolean)
            .filter((img, i, all) => all.findIndex(x => x.url === img.url) === i);

        return {
            id: zoneData.id,
            documentId: zoneData.documentId,
            slug: attributes.Slug || null,
            nombre: attributes.Nombre || 'Zona',
            titulo: attributes.Titulo || '',
            subtitulo: attributes.Subtitulo || '',
            descripcion: blocksToParagraphs(attributes.Descripcion),
            adicionales: (attributes.AdicionalesZona || []).map(a => a?.Texto).filter(Boolean),
            // compatibilidad: imagen = portada
            imagen: portada?.url || '',
            imagenSrcSet: portada?.srcSet || '',
            cabecera,
            galeria
        };
    }, [zoneData]);

    return { properties, zone, loading, error };
};

export default useZoneProperties;
