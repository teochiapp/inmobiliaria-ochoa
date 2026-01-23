import { useState, useEffect } from 'react';
import api from '../services/api';

/**
 * Ejemplo de componente que consume la API de Strapi
 * 
 * Para usar este componente:
 * 1. Crea un Content Type en Strapi llamado "propiedad"
 * 2. Agrega campos como: titulo, descripcion, precio, imagen
 * 3. Configura los permisos públicos en Settings > Users & Permissions > Roles > Public
 * 4. Importa este componente en tu App.jsx
 */

function PropiedadesExample() {
    const [propiedades, setPropiedades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPropiedades = async () => {
            try {
                setLoading(true);
                // populate=* trae todas las relaciones y archivos multimedia
                const response = await api.get('/propiedades?populate=*');
                setPropiedades(response.data.data);
                setError(null);
            } catch (err) {
                console.error('Error al cargar propiedades:', err);
                setError('No se pudieron cargar las propiedades. Asegúrate de que Strapi esté corriendo.');
            } finally {
                setLoading(false);
            }
        };

        fetchPropiedades();
    }, []);

    if (loading) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <p>Cargando propiedades...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ padding: '20px', color: 'red' }}>
                <p>{error}</p>
                <p style={{ fontSize: '14px', marginTop: '10px' }}>
                    Verifica que Strapi esté corriendo en http://localhost:1337
                </p>
            </div>
        );
    }

    if (propiedades.length === 0) {
        return (
            <div style={{ padding: '20px' }}>
                <h2>No hay propiedades disponibles</h2>
                <p>Crea algunas propiedades en el panel de administración de Strapi.</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1>Propiedades</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {propiedades.map((propiedad) => {
                    const { id, attributes } = propiedad;

                    return (
                        <div key={id} style={{
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '15px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}>
                            {/* Ejemplo de cómo mostrar una imagen de Strapi */}
                            {attributes.imagen?.data && (
                                <img
                                    src={`http://localhost:1337${attributes.imagen.data.attributes.url}`}
                                    alt={attributes.titulo}
                                    style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px' }}
                                />
                            )}

                            <h3 style={{ marginTop: '10px' }}>{attributes.titulo}</h3>
                            <p>{attributes.descripcion}</p>

                            {attributes.precio && (
                                <p style={{ fontWeight: 'bold', color: '#2563eb' }}>
                                    ${attributes.precio.toLocaleString()}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default PropiedadesExample;
