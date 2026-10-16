import { useMemo } from 'react';
import useZones from '../../hooks/useZones';
import { PREFERENTIAL_ZONES } from '../../config/site';

const norm = (s = '') => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();

export const zonePath = (zone) => `/zona/${zone.slug || zone.documentId || zone.id}`;

// Zonas / emprendimientos exclusivos cargados en Strapi, con su ruta (/zona/:slug).
// Se ordenan según PREFERENTIAL_ZONES; las demás quedan al final en el orden de Strapi.
const usePreferentialZones = () => {
    const { zones, loading, error } = useZones();

    const preferential = useMemo(() => {
        const rank = (z) => {
            const i = PREFERENTIAL_ZONES.findIndex((name) => norm(name) === norm(z.title));
            return i === -1 ? PREFERENTIAL_ZONES.length : i;
        };
        return [...zones]
            .sort((a, b) => rank(a) - rank(b))
            .map((zone, i) => ({
                n: String(i + 1).padStart(2, '0'),
                name: zone.title,
                zone,
                path: zonePath(zone),
            }));
    }, [zones]);

    return { preferential, zones, loading, error };
};

export default usePreferentialZones;
