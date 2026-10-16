// Utilidades para imágenes de Strapi.
//
// Strapi guarda la foto original y además genera versiones reducidas
// (thumbnail 245px, small 500px, medium 750px, large 1000px...).
// Acá armamos un `srcSet` con TODAS las versiones + la original, así el
// navegador elige la más nítida según el tamaño real en pantalla y la
// densidad del dispositivo (retina). Nunca se usa una versión reducida
// donde hace falta más resolución.

export const STRAPI_BASE_URL = (() => {
    const apiUrl = process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337/api';
    return apiUrl.endsWith('/api') ? apiUrl.slice(0, -4) : apiUrl;
})();

// URLs relativas (/uploads/...) se completan con el dominio de Strapi;
// las absolutas (S3, Cloudinary, etc.) se dejan como están.
export const absoluteUrl = (url) => {
    if (!url) return '';
    return /^https?:\/\//i.test(url) ? url : `${STRAPI_BASE_URL}${url}`;
};

// Acepta el formato de Strapi v4 ({ data: { attributes } }) y v5 (objeto plano)
const unwrap = (field) => {
    if (!field) return [];
    const raw = field.data !== undefined ? field.data : field;
    const list = Array.isArray(raw) ? raw : [raw];
    return list.filter(Boolean).map((item) => item.attributes || item);
};

const toMedia = (file) => {
    if (!file?.url) return null;
    const candidates = [];
    if (file.width) candidates.push({ url: absoluteUrl(file.url), width: file.width });
    Object.values(file.formats || {}).forEach((f) => {
        if (f?.url && f.width) candidates.push({ url: absoluteUrl(f.url), width: f.width });
    });
    // Un ancho = una URL; ante empate gana la original (primera)
    const byWidth = new Map();
    candidates.forEach((c) => {
        if (!byWidth.has(c.width)) byWidth.set(c.width, c);
    });
    const sorted = [...byWidth.values()].sort((a, b) => a.width - b.width);

    return {
        url: absoluteUrl(file.url), // siempre la original
        srcSet: sorted.length > 1 ? sorted.map((c) => `${c.url} ${c.width}w`).join(', ') : '',
        width: file.width || null,
        height: file.height || null,
        alt: file.alternativeText || '',
    };
};

export const getMedia = (field) => toMedia(unwrap(field)[0]);

export const getMediaList = (field) => unwrap(field).map(toMedia).filter(Boolean);

// Valores de `sizes` según dónde se muestra la imagen
export const SIZES = {
    full: '100vw',
    card: '(max-width: 720px) 88vw, (max-width: 1000px) 46vw, 420px',
    gallery: '(max-width: 1000px) 100vw, 1220px',
    half: '(max-width: 1000px) 100vw, 50vw',
    thumb: '160px',
};
