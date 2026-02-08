import { useState, useEffect } from 'react';
import api from '../services/api';

const useSchedule = () => {
    const [schedule, setSchedule] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const response = await api.get('/horario');
                const data = response.data.data;

                if (data && data.attributes) {
                    setSchedule(data.attributes);
                } else {
                    setSchedule(data); // In case it's flattened
                }
                setLoading(false);
            } catch (err) {
                console.error("Error fetching schedule data:", err);
                setError(err);
                setLoading(false);
            }
        };

        fetchSchedule();
    }, []);

    return { schedule, loading, error };
};

export default useSchedule;
