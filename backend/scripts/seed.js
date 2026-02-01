const Strapi = require('@strapi/strapi');

const ZONES = [
    { Nombre: 'Centro', Subtitulo: 'Corazón de la ciudad', Descripcion: 'La zona más activa y conectada.' },
    { Nombre: 'Norte', Subtitulo: 'Resindencial y tranquilo', Descripcion: 'Ideal para familias.' },
    { Nombre: 'Sur', Subtitulo: 'En crecimiento', Descripcion: 'Oportunidades de inversión.' },
];

const PROPS_ALQUILER = [
    { Nombre: 'Departamento Moderno', Ubicacion: 'Av. Libertador 1234', Precio: 500000, Habitaciones: 2, Banos: 1, MetrosCuadrados: 60 },
    { Nombre: 'Casa con Jardin', Ubicacion: 'Calle Las Flores 45', Precio: 850000, Habitaciones: 3, Banos: 2, MetrosCuadrados: 120 },
    { Nombre: 'Monoambiente', Ubicacion: 'San Martin 200', Precio: 250000, Habitaciones: 1, Banos: 1, MetrosCuadrados: 35 },
    { Nombre: 'Oficina Centrica', Ubicacion: 'Rivadavia 500', Precio: 400000, Habitaciones: 2, Banos: 1, MetrosCuadrados: 50 },
    { Nombre: 'Ph Reciclado', Ubicacion: 'Pasaje del Sol', Precio: 600000, Habitaciones: 2, Banos: 1, MetrosCuadrados: 70 },
    { Nombre: 'Departamento de Lujo', Ubicacion: 'Torre Alvear', Precio: 1200000, Habitaciones: 4, Banos: 3, MetrosCuadrados: 150 },
];

const PROPS_VENTA = [
    { Nombre: 'Casa Quinta', Ubicacion: 'Ruta 2 Km 40', Precio: 150000, Habitaciones: 4, Banos: 3, MetrosCuadrados: 200 },
    { Nombre: 'Departamento Pozo', Ubicacion: 'Mitre 100', Precio: 80000, Habitaciones: 2, Banos: 1, MetrosCuadrados: 55 },
    { Nombre: 'Local Comercial', Ubicacion: 'Peatonal 20', Precio: 250000, Habitaciones: 1, Banos: 1, MetrosCuadrados: 80 },
    { Nombre: 'Terreno', Ubicacion: 'Barrio Cerrado Los Sauces', Precio: 45000, Habitaciones: 0, Banos: 0, MetrosCuadrados: 500 },
    { Nombre: 'Chalet Clasico', Ubicacion: 'Belgrano 800', Precio: 180000, Habitaciones: 3, Banos: 2, MetrosCuadrados: 140 },
    { Nombre: 'Penthouse', Ubicacion: 'Av. del Mar 1', Precio: 350000, Habitaciones: 3, Banos: 3, MetrosCuadrados: 180 },
];

const getDescription = (name) => [
    {
        type: 'paragraph',
        children: [{ type: 'text', text: `Descripción detallada de ${name}. Esta propiedad cuenta con excelentes terminaciones y una ubicación privilegiada. Ideal para quienes buscan confort y estilo.` }],
    },
];

async function seed() {
    const strapi = await Strapi().load();

    console.log('🚀 Iniciando script de seeding...');

    try {
        // 1. Zonas
        const zonesMap = {};
        for (const z of ZONES) {
            // Buscar si existe
            const existing = await strapi.entityService.findMany('api::zona.zona', {
                filters: { Nombre: z.Nombre },
            });

            if (existing.length > 0) {
                zonesMap[z.Nombre] = existing[0].id;
                console.log(`✅ Zona existente: ${z.Nombre}`);
            } else {
                const created = await strapi.entityService.create('api::zona.zona', {
                    data: {
                        ...z,
                        Descripcion: getDescription(z.Nombre),
                        publishedAt: new Date(),
                    },
                });
                zonesMap[z.Nombre] = created.id;
                console.log(`✨ Zona creada: ${z.Nombre}`);
            }
        }

        // Helper para asignar zona random
        const getRandomZoneId = () => {
            const names = Object.keys(zonesMap);
            const randomName = names[Math.floor(Math.random() * names.length)];
            return zonesMap[randomName];
        };

        // 2. Alquileres
        for (const p of PROPS_ALQUILER) {
            await strapi.entityService.create('api::alquiler.alquiler', {
                data: {
                    ...p,
                    Descripcion: getDescription(p.Nombre),
                    Zona: getRandomZoneId(),
                    publishedAt: new Date(),
                },
            });
        }
        console.log(`✨ ${PROPS_ALQUILER.length} Alquileres creados.`);

        // 3. Ventas
        for (const p of PROPS_VENTA) {
            await strapi.entityService.create('api::venta.venta', {
                data: {
                    ...p,
                    Descripcion: getDescription(p.Nombre),
                    Zona: getRandomZoneId(),
                    publishedAt: new Date(),
                },
            });
        }
        console.log(`✨ ${PROPS_VENTA.length} Ventas creadas.`);

    } catch (error) {
        console.error('❌ Error en seeding:', error);
    } finally {
        // No llamamos a strapi.server.destroy() porque a veces cuelga el proceso en scripts simples,
        // pero process.exit lo mata igual.
        process.exit(0);
    }
}

seed();
