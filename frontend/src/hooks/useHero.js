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
                console.log('🔍 HERO DEBUG - API URL:', process.env.REACT_APP_STRAPI_URL);
                console.log('🔍 HERO DEBUG - Base URL:', STRAPI_BASE_URL);
                const response = await api.get('/hero-images?populate=*');
                console.log('🔍 HERO DEBUG - Full Response:', response.data);
                const data = response.data.data;
                console.log('🔍 HERO DEBUG - Data array:', data);
                console.log('🔍 HERO DEBUG - First item:', data?.[0]);
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

    // Process data from Strapi
    const { images, titles } = useMemo(() => {
        console.log('🎨 HERO MEMO - Processing heroData:', heroData);
        if (!heroData || heroData.length === 0) return { images: [], titles: [] };

        // 1. Filter items that have a valid image
        const validItems = heroData.filter(item => {
            const attributes = item.attributes || item;
            const imgField = attributes.Imagen;
            console.log('🖼️ HERO FILTER - Item:', item);
            console.log('🖼️ HERO FILTER - Imagen field:', imgField);

            if (imgField?.data) { // v4 check
                const imgData = imgField.data;
                const imgObj = Array.isArray(imgData) ? imgData[0] : imgData;
                return !!(imgObj?.attributes?.url || imgObj?.url);
            }
            // v5 check
            return !!imgField?.url;
        });

        console.log('✅ HERO FILTER - Valid items:', validItems);

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

            const fullUrl = `${STRAPI_BASE_URL}${imgUrl}`;
            console.log('🌐 HERO IMAGE - URL:', fullUrl);
            return fullUrl;
        });

        const ttls = validItems.map(item => {
            const attributes = item.attributes || item;
            return attributes.Titulo || '';
        });

        console.log('📸 HERO FINAL - Images:', imgs);
        console.log('📝 HERO FINAL - Titles:', ttls);

        return { images: imgs, titles: ttls };
    }, [heroData]);

    return { images, titles, loading, error };
};

export default useHero;
