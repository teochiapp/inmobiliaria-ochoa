import { useMemo } from 'react';
import useSchedule from '../../hooks/useSchedule';
import { SITE } from '../../config/site';

const DAYS = [
    ['Lunes', 'Lunes'],
    ['Martes', 'Martes'],
    ['Miercoles', 'Miércoles'],
    ['Jueves', 'Jueves'],
    ['Viernes', 'Viernes'],
    ['SabadoDomingo', 'Sábados y domingos'],
];

// Horarios de atención desde Strapi (single type "Horarios de Atención").
// Si todavía no está cargado, usa los horarios de config/site.js.
const useHours = () => {
    const { schedule, loading } = useSchedule();
    const hours = useMemo(() => {
        if (!schedule) return SITE.hours;
        const rows = DAYS.map(([key, label]) => ({ label, value: schedule[key] })).filter((r) => r.value);
        return rows.length ? rows : SITE.hours;
    }, [schedule]);
    return { hours, loading, fromCms: Boolean(schedule) };
};

export default useHours;
