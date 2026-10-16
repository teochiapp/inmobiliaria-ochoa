import { useState, useEffect, useMemo } from 'react';
import api from '../services/api';
import { getMedia } from '../services/media';

const useHero = () => {
    const [heroData, setHeroData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHeroData = async () => {
            try {
                const response = await api.get('/hero-images?populate=*');
                const data = response.data.data;
                setHeroData(data);
                setLoading(false);
            } catch (err) {
                console.error("❌ Error fetching hero data:", err);
                console.error("❌ Error details:", err.response?.data || err.message);
                setError(err);
                setLoading(false);
            }
        };

        fetchHeroData();
    }, []);

    // Procesa los datos de Strapi: imagen original + srcSet con todas sus versiones
    const { images, imageSets, titles } = useMemo(() => {
        const items = (heroData || [])
            .map(item => {
                const attributes = item.attributes || item;
                return { media: getMedia(attributes.Imagen), title: attributes.Titulo || '' };
            })
            .filter(item => item.media);

        return {
            images: items.map(i => i.media.url),
            imageSets: items.map(i => i.media.srcSet),
            titles: items.map(i => i.title)
        };
    }, [heroData]);

    return { images, imageSets, titles, loading, error };
};

export default useHero;
