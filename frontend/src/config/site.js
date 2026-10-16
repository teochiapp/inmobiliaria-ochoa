// Datos de contacto y contenido fijo del sitio — editá acá y se actualiza en todas las páginas.

export const SITE = {
    name: 'Marin Ochoa Bienes Raíces',
    phoneDisplay: '+54 9 3571 52-0528',
    phoneTel: '+5493571520528',
    whatsapp: '5493571520528',
    // Línea de ventas / tasaciones (Angelina Cerutti)
    salesDisplay: '+54 9 3512 17-3089',
    salesWhatsapp: '5493512173089',
    email: 'franco@marinochoa.com.ar',
    // TODO: completar con la dirección real de la oficina
    address: '',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Marin+Ochoa+Bienes+Raices',
    instagramHandle: '@marinochoainmobiliaria',
    socials: {
        instagram: 'https://www.instagram.com/marinochoainmobiliaria/',
        facebook: 'https://www.facebook.com/inmobiliariamarinochoa/',
        youtube: 'https://www.youtube.com/channel/UCA_HFMO1a5KJD-pNp-6nToQ',
    },
    hours: [
        { label: 'Lunes a viernes', value: '09:00 – 12:00' },
        { label: 'Tarde', value: '17:00 – 18:30' },
        { label: 'Sábados y domingos', value: 'Cerrado' },
    ],
    hoursShort: 'Lun a vie · 09:00 a 12:00 y 17:00 a 18:30',
};

// Las zonas / emprendimientos exclusivos salen de Strapi (colección "Zonas").
// Esta lista solo define el ORDEN en que se muestran; las que no estén acá van al final.
export const PREFERENTIAL_ZONES = ['Mirador del Lago', 'Balcón del Lago', 'Loft del Lago'];

// Ubicación de la oficina en Google Maps (mismo mapa que usaba el sitio)
export const MAP_EMBED_URL =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23375.975132677212!2d-64.40430840384465!3d-32.20592788378944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f9.5!3m3!1m2!1s0x95d29e93ce50c2cf%3A0x1faf6496b36a528e!2sMarin%20Ochoa%20Bienes%20Raices!5e0!3m2!1ses!2sar!4v1769377765405!5m2!1ses!2sar';

export const LOCALITIES = [
    'Villa Rumipal',
    'Villa del Dique',
    'Santa Rosa de Calamuchita',
    'Embalse',
    'El Durazno',
    'Quillinzo',
    'Yacanto',
    'Segunda Usina',
];

export const waLink = (number = SITE.whatsapp, text = '') =>
    `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

const PERIODS = { mes: 'mes', semana: 'semana', dia: 'día' };

// "$150000" -> "$ 150.000" · con periodo "mes" -> "$ 150.000 /mes" · vacío -> "Consultar"
export const formatPrice = (raw, periodo) => {
    if (!raw) return 'Consultar';
    const str = String(raw);
    const digits = str.replace(/[^0-9]/g, '');
    if (!digits) return str;
    const key = periodo ? String(periodo).toLowerCase() : str.includes('/mes') ? 'mes' : '';
    const suffix = key ? ` /${PERIODS[key] || key}` : '';
    return `$ ${Number(digits).toLocaleString('es-AR')}${suffix}`;
};
