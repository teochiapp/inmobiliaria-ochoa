import { useState, useEffect, useMemo } from 'react';
import api from '../services/api';

const STRAPI_BASE_URL = process.env.REACT_APP_STRAPI_URL?.replace('/api', '') || 'http://localhost:1337';

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
                console.error("Error fetching hero data:", err);
                setError(err);
                setLoading(false);
            }
        };

        fetchHeroData();
    }, []);

    // Process data from Strapi
    const { images, titles } = useMemo(() => {
        if (!heroData || heroData.length === 0) return { images: [], titles: [] };

        // 1. Filter items that have a valid image
        const validItems = heroData.filter(item => {
            const attributes = item.attributes || item;
            const imgField = attributes.Imagen;

            if (imgField?.data) { // v4 check
                const imgData = imgField.data;
                const imgObj = Array.isArray(imgData) ? imgData[0] : imgData;
                return !!(imgObj?.attributes?.url || imgObj?.url);
            }
            // v5 check
            return !!imgField?.url;
        });

        // 2. Map filtered items
        const imgs = validItems.map(item => {
            const attributes = item.attributes || item;
            const imgField = attributes.Imagen;

            let imgUrl = '';

            if (imgField?.data) {
                const imgData = imgField.data;
                const imgObj = Array.isArray(imgData) ? imgData[0] : imgData;
                imgUrl = imgObj?.attributes?.url || imgObj?.url;
            } else if (imgField?.url) {
                imgUrl = imgField.url;
            }

            return `${STRAPI_BASE_URL}${imgUrl}`;
        });

        const ttls = validItems.map(item => {
            const attributes = item.attributes || item;
            return attributes.Titulo || '';
        });

        return { images: imgs, titles: ttls };
    }, [heroData]);

    return { images, titles, loading, error };
};

export default useHero;
