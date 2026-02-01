const { createStrapi } = require('@strapi/strapi');

async function main() {
    console.log('🚧 Iniciando script de población de datos...');
    console.log('⚠️  Asegurate de que NO haya otro servidor Strapi corriendo en el puerto 1337.');

    try {
        // Inicializamos Strapi
        const strapi = createStrapi({ distDir: './dist' });

        // Cargamos la configuración y conectamos a la BD
        await strapi.load();

        // Arrancamos para asegurar conexiones (ignorando error de puerto si es solo para scripts a veces funciona, pero mejor evitarlo)
        try {
            await strapi.start();
        } catch (e) {
            if (e.message.includes('EADDRINUSE')) {
                console.warn('⚠️ El puerto 1337 está ocupado. Intentando continuar usando la conexión existente o modo consola...');
            } else {
                console.error('Error al iniciar Strapi:', e);
                throw e; // Si es otro error, fallamos
            }
        }

        console.log('🚀 Strapi listo. Generando datos para Córdoba, Argentina...');

        // Datos maestros
        const zonesData = [
            { Nombre: 'Nueva Córdoba', Subtitulo: 'El corazón universitario y joven' },
            { Nombre: 'General Paz', Subtitulo: 'Polo gastronómico y residencial' },
            { Nombre: 'Alta Córdoba', Subtitulo: 'Historia, tradición y vida moderna' },
            { Nombre: 'Cerro de las Rosas', Subtitulo: 'Exclusividad, diseño y zona norte' },
            { Nombre: 'Villa Belgrano', Subtitulo: 'Espacios verdes y tranquilidad' },
            { Nombre: 'Villa Allende', Subtitulo: 'Golf y naturaleza a minutos de la ciudad' },
            { Nombre: 'Centro', Subtitulo: 'El núcleo comercial y financiero' },
            { Nombre: 'Alberdi', Subtitulo: 'Barrio popular y cercano al centro' },
        ];

        const zonaMap = {};

        // 1. Crear Zonas
        console.log('\n--- 1. Gestionando Zonas ---');
        for (const z of zonesData) {
            const existing = await strapi.documents('api::zona.zona').findMany({
                filters: { Nombre: z.Nombre },
            });

            if (existing.length === 0) {
                const created = await strapi.documents('api::zona.zona').create({
                    data: {
                        ...z,
                        Descripcion: [{ type: 'paragraph', children: [{ type: 'text', text: `Esta es una excelente zona ubicada en ${z.Nombre}, ideal para vivir o invertir en Córdoba.` }] }],
                    },
                    status: 'published',
                });
                zonaMap[z.Nombre] = created.documentId;
                console.log(`✅ Zona creada: ${z.Nombre}`);
            } else {
                zonaMap[z.Nombre] = existing[0].documentId;
                console.log(`ℹ️ Zona ya existente: ${z.Nombre}`);
            }
        }

        // Listas para aleatoriedad
        const streets = ['Av. Colon', 'Bv. Chacabuco', 'Independencia', 'Buenos Aires', 'Estrada', 'Fructuoso Rivera', 'Av. Rafael Nuñez', 'Av. Recta Martinolli', '27 de Abril', 'San Lorenzo', 'Obispo Trejo', 'Rondeau'];
        const types = ['Departamento', 'Casa', 'Duplex', 'Oficina', 'Local Comercial'];
        const features = ['Balcón', 'Asador', 'Pileta', 'Cochera', 'SUM', 'Seguridad 24hs', 'Gimnasio'];

        // Función auxiliar para crear propiedad
        const createProperty = async (collection, typeRef) => {
            const zoneNames = Object.keys(zonaMap);
            const zoneName = zoneNames[Math.floor(Math.random() * zoneNames.length)];
            const street = streets[Math.floor(Math.random() * streets.length)];
            const number = Math.floor(Math.random() * 5000);
            const propType = types[Math.floor(Math.random() * types.length)];

            // Precios realistas para Cba
            const price = typeRef === 'venta'
                ? 45000 + Math.floor(Math.random() * 350000) // Venta en USD
                : 150000 + Math.floor(Math.random() * 600000); // Alquiler en ARS

            const title = `${propType} en ${zoneName}`;
            // Slug único simple
            const slug = `${title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')}-${Math.floor(Math.random() * 10000)}`;

            await strapi.documents(collection).create({
                data: {
                    Nombre: title,
                    Ubicacion: `${street} ${number}, Córdoba`,
                    Precio: price,
                    Habitaciones: 1 + Math.floor(Math.random() * 4),
                    Banos: 1 + Math.floor(Math.random() * 2),
                    MetrosCuadrados: 40 + Math.floor(Math.random() * 300),
                    Descripcion: [
                        { type: 'paragraph', children: [{ type: 'text', text: `Excelente oportunidad! ${propType} ubicado en la prestigiosa zona de ${zoneName}.` }] },
                        { type: 'paragraph', children: [{ type: 'text', text: `Cuenta con excelentes terminaciones, ubicación privilegiada sobre ${street} y acceso a transporte público.` }] }
                    ],
                    Zona: zonaMap[zoneName],
                    Slug: slug,
                },
                status: 'published',
            });
            process.stdout.write('.');
        };

        // 2. Crear Ventas
        const salesCount = 15;
        console.log(`\n--- 2. Creando ${salesCount} propiedades en VENTA ---`);
        for (let i = 0; i < salesCount; i++) {
            await createProperty('api::venta.venta', 'venta');
        }
        console.log(' ✅ Listo');

        // 3. Crear Alquileres
        const rentCount = 15;
        console.log(`\n--- 3. Creando ${rentCount} propiedades en ALQUILER ---`);
        for (let i = 0; i < rentCount; i++) {
            await createProperty('api::alquiler.alquiler', 'alquiler');
        }
        console.log(' ✅ Listo');

        console.log('\n✨ Script finalizado con éxito!');

    } catch (error) {
        console.error('\n❌ Error fatal:', error);
    } finally {
        strapi.stop();
        process.exit(0);
    }
}

main();
