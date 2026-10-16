import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import Layout from '../../components/mo/Layout';
import PageHero from '../../components/mo/PageHero';
import Icon from '../../components/mo/Icon';
import PropertyCard from '../../components/mo/PropertyCard';
import { SectionHead, MoreLink, MapCard } from '../../components/mo/Sections';
import useSales from '../../hooks/useSales';
import useRents from '../../hooks/useRents';
import { SITE, waLink, formatPrice } from '../../config/site';
import { getMedia, getMediaList, SIZES } from '../../services/media';
import { emailEnabled, sendContactEmail, isValidEmail } from '../../services/contact';

import salesHeroImage from '../../public/galeria/yacantoarriba.jpg';
import rentalsHeroImage from '../../public/galeria/Villa-del-Diquearriba.jpeg';
import mapImage from '../../public/galeria/villarumipalarriba.jpg';
import francoImg from '../../public/aboutUs/chico.jpeg';

const extractTextFromBlocks = (blocks) => {
    if (!Array.isArray(blocks)) return [];
    return blocks
        .map((block) => (Array.isArray(block.children) ? block.children.map((c) => c.text || '').join('') : ''))
        .filter((t) => t.trim());
};

const toFeatureList = (raw) => {
    if (!raw) return [];
    if (Array.isArray(raw)) {
        return raw
            .map((item) => {
                if (typeof item === 'string') return item;
                if (Array.isArray(item?.children)) return item.children.map((c) => c.text || '').join('');
                return item?.text || item?.nombre || item?.Nombre || '';
            })
            .map((s) => s.trim())
            .filter(Boolean);
    }
    if (typeof raw === 'string') return raw.split(/\n|,|;/).map((s) => s.trim()).filter(Boolean);
    return [];
};

// El campo "Mapa" de Strapi trae el código de inserción de Google Maps (<iframe src="...">).
// Solo tomamos la URL del src y únicamente si es un mapa de Google, para no inyectar HTML.
const extractMapSrc = (raw) => {
    const text = Array.isArray(raw) ? extractTextFromBlocks(raw).join(' ') : typeof raw === 'string' ? raw : '';
    if (!text) return '';
    const match = text.match(/src=["']([^"']+)["']/i);
    const url = (match ? match[1] : text.trim()).replace(/&amp;/g, '&');
    return /^https:\/\/(www\.)?google\.[a-z.]+\/maps\/embed/i.test(url) ? url : '';
};

const splitTitle = (name = '') => {
    const words = name.trim().split(/\s+/);
    if (words.length < 3) return { title: name, accent: '' };
    const cut = Math.ceil(words.length / 2);
    return { title: words.slice(0, cut).join(' '), accent: words.slice(cut).join(' ') };
};

const PropertyDetail = ({ type }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isSale = type === 'venta';
    const endpoint = isSale ? 'ventas' : 'alquileres';
    const operation = isSale ? 'Venta' : 'Alquiler';
    const listPath = isSale ? '/propiedades-venta' : '/alquileres';
    const basePath = isSale ? '/propiedad/venta' : '/propiedad/alquiler';

    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [active, setActive] = useState(0);
    const [form, setForm] = useState({ nombre: '', telefono: '', email: '', mensaje: '' });
    const [status, setStatus] = useState({ type: '', message: '' });

    const { sales } = useSales();
    const { rents } = useRents();

    useEffect(() => {
        let cancelled = false;
        const fetchProperty = async () => {
            setLoading(true);
            setError(null);
            setActive(0);
            try {
                const response = await api.get(`/${endpoint}?filters[id][$eq]=${id}&populate=*`);
                const data = response.data.data?.[0];
                if (!data) throw new Error('Property not found');
                const attributes = data.attributes || data;

                // Portada + galería, sin repetidos. Cada imagen trae su original y su srcSet.
                const gallery = [getMedia(attributes.Portada), ...getMediaList(attributes.Galeria)]
                    .filter(Boolean)
                    .filter((img, idx, all) => all.findIndex((x) => x.url === img.url) === idx);

                const description = Array.isArray(attributes.Descripcion)
                    ? extractTextFromBlocks(attributes.Descripcion)
                    : typeof attributes.Descripcion === 'string'
                    ? attributes.Descripcion.split(/\n{2,}/).filter((t) => t.trim())
                    : [];

                if (!cancelled) {
                    setProperty({
                        id: data.id,
                        name: attributes.Nombre || attributes.Titulo || attributes.Ubicacion || 'Propiedad',
                        price: attributes.Precio ? `$${attributes.Precio}` : '',
                        periodo: isSale ? null : attributes.Periodo || 'mes',
                        description,
                        bedrooms: attributes.Habitaciones || 0,
                        bathrooms: attributes.Banos || 0,
                        m2: attributes.MetrosCuadrados || 0,
                        location: attributes.Ubicacion || '',
                        gallery,
                        // Características + "Adicionales" (alquileres) / "AdicionalesVentas" (ventas) cargados en Strapi
                        features: [
                            ...toFeatureList(attributes.Caracteristicas),
                            ...(attributes.Adicionales || []).map((a) => a?.Texto),
                            ...(attributes.AdicionalesVentas || []).map((a) => a?.Texto),
                        ]
                            .filter(Boolean)
                            .filter((f, i, all) => all.indexOf(f) === i),
                        mapSrc: extractMapSrc(attributes.Mapa),
                    });
                    setForm((f) => ({
                        ...f,
                        mensaje: `Hola, me interesa la propiedad "${attributes.Nombre || attributes.Ubicacion || 'publicada'}" (${operation}${attributes.Ubicacion ? `, ${attributes.Ubicacion}` : ''}).`,
                    }));
                }
            } catch (err) {
                console.error('Error fetching property:', err);
                if (!cancelled) setError(err);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        if (id) fetchProperty();
        return () => {
            cancelled = true;
        };
    }, [id, endpoint, isSale, operation]);

    const similar = useMemo(() => {
        const list = isSale ? sales : rents;
        return list.filter((p) => String(p.id) !== String(id)).slice(0, 3);
    }, [isSale, sales, rents, id]);

    const fallbackHero = isSale ? salesHeroImage : rentalsHeroImage;
    const heroMedia = property?.gallery?.[0] || null;
    const crumbs = [
        { label: 'Inicio', to: '/' },
        { label: isSale ? 'Ventas' : 'Alquileres', to: listPath },
        { label: property?.name || (loading ? 'Cargando…' : 'Propiedad') },
    ];

    if (loading || error || !property) {
        return (
            <Layout title={loading ? 'Cargando propiedad' : 'Propiedad no encontrada'}>
                <PageHero small image={isSale ? salesHeroImage : rentalsHeroImage} crumbs={crumbs} title={loading ? 'Cargando' : 'Propiedad'} accent={loading ? '' : 'no encontrada'} />
                <section className="mo-sec mo-sec--white">
                    <div className="mo-wrap">
                        {loading ? (
                            <div className="mo-skel" style={{ minHeight: 520 }} />
                        ) : (
                            <div className="mo-error">
                                <p className="mo-lead">La propiedad que buscás no está disponible o fue dada de baja.</p>
                                <Link className="mo-btn mo-btn--navy" to={listPath}>
                                    Ver propiedades <Icon name="arrow" />
                                </Link>
                            </div>
                        )}
                    </div>
                </section>
            </Layout>
        );
    }

    const { title, accent } = splitTitle(property.name);
    const gallery = property.gallery.length ? property.gallery : [{ url: fallbackHero, srcSet: '' }];
    const pad = (n) => String(n).padStart(2, '0');
    const priceText = formatPrice(property.price, property.periodo);

    const waText = `${form.mensaje}\n\nNombre: ${form.nombre}${form.telefono ? `\nTeléfono: ${form.telefono}` : ''}`;

    // Si EmailJS está configurado, la consulta llega por email; si no, se abre WhatsApp con el mensaje armado.
    const onSend = async (e) => {
        e.preventDefault();
        if (!emailEnabled) {
            window.open(waLink(SITE.whatsapp, waText), '_blank', 'noopener');
            return;
        }
        if (!form.nombre.trim() || !form.telefono.trim() || !isValidEmail(form.email) || !form.mensaje.trim()) {
            setStatus({ type: 'error', message: 'Completá nombre, teléfono, un email válido y el mensaje.' });
            return;
        }
        setStatus({ type: 'loading', message: '' });
        try {
            await sendContactEmail({
                name: form.nombre,
                email: form.email,
                phone: form.telefono,
                message: form.mensaje,
                originPage: 'Detalle de Propiedad',
                propertyName: property.name,
            });
            setStatus({ type: 'success', message: '¡Consulta enviada! Te contactamos a la brevedad.' });
        } catch (err) {
            console.error('EmailJS Error:', err);
            setStatus({ type: 'error', message: 'No pudimos enviar la consulta. Probá por WhatsApp.' });
        }
    };
    const setField = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    return (
        <Layout title={property.name}>
            <PageHero
                small
                image={heroMedia?.url || fallbackHero}
                imageSrcSet={heroMedia?.srcSet}
                crumbs={crumbs}
                title={title}
                accent={accent}
                subtitle={property.location ? `${property.location}, Córdoba` : undefined}
                meta={[
                    { value: operation, label: 'Operación' },
                    ...(property.m2 ? [{ value: `${property.m2} m²`, label: 'Superficie' }] : []),
                ]}
            />

            <section className="mo-sec mo-sec--tight mo-sec--white">
                <div className="mo-wrap">
                    <button type="button" className="mo-back" style={{ marginBottom: 24, border: 0, background: 'none', cursor: 'pointer' }} onClick={() => navigate(-1)}>
                        <Icon name="arrowLeft" />
                        Volver al listado
                    </button>

                    <div className="mo-gal" style={gallery.length < 2 ? { gridTemplateColumns: 'minmax(0,1fr)' } : undefined}>
                        <div className="mo-gal-main">
                            <img
                                key={gallery[active].url}
                                src={gallery[active].url}
                                srcSet={gallery[active].srcSet || undefined}
                                sizes={gallery[active].srcSet ? SIZES.gallery : undefined}
                                alt={gallery[active].alt || `${property.name} — imagen ${active + 1}`}
                            />
                            <span className="mo-gal-count">
                                {pad(active + 1)} / {pad(gallery.length)}
                            </span>
                        </div>
                        {gallery.length > 1 && (
                            <div className="mo-thumbs" role="tablist" aria-label="Galería de imágenes">
                                {gallery.map((img, i) => (
                                    <button
                                        key={img.url}
                                        type="button"
                                        role="tab"
                                        aria-selected={i === active}
                                        aria-label={`Ver imagen ${i + 1}`}
                                        className={`mo-thumb${i === active ? ' is-on' : ''}`}
                                        onClick={() => setActive(i)}
                                    >
                                        <img src={img.url} srcSet={img.srcSet || undefined} sizes={img.srcSet ? SIZES.thumb : undefined} alt="" loading="lazy" decoding="async" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="mo-detail">
                        <div>
                            <div className="mo-facts mo-rv">
                                <div className="mo-fact">
                                    <span><Icon name="bed" size="sm" />Habitaciones</span>
                                    <b>{property.bedrooms || '—'}</b>
                                </div>
                                <div className="mo-fact">
                                    <span><Icon name="bath" size="sm" />Baños</span>
                                    <b>{property.bathrooms || '—'}</b>
                                </div>
                                <div className="mo-fact">
                                    <span><Icon name="area" size="sm" />Superficie</span>
                                    <b>
                                        {property.m2 || '—'}
                                        {property.m2 ? <small>m²</small> : null}
                                    </b>
                                </div>
                                <div className="mo-fact">
                                    <span><Icon name="home" size="sm" />Operación</span>
                                    <b>{operation}</b>
                                </div>
                            </div>

                            <div className="mo-desc">
                                <h3 className="mo-h3 mo-rv">Descripción</h3>
                                {property.description.length > 0 ? (
                                    property.description.map((p, i) => (
                                        <p key={i} className="mo-body mo-rv">
                                            {p}
                                        </p>
                                    ))
                                ) : (
                                    <p className="mo-body mo-rv">Consultanos para recibir la ficha completa de esta propiedad.</p>
                                )}

                                {property.features.length > 0 && (
                                    <>
                                        <h3 className="mo-h3 mo-rv">Características</h3>
                                        <ul className="mo-feats mo-rv">
                                            {property.features.map((f) => (
                                                <li key={f}>{f}</li>
                                            ))}
                                        </ul>
                                    </>
                                )}

                                {property.mapSrc ? (
                                    <>
                                        <h3 className="mo-h3 mo-rv">Ubicación</h3>
                                        <div className="mo-visit-map mo-rv" style={{ minHeight: 420 }}>
                                            <iframe
                                                src={property.mapSrc}
                                                title={`Ubicación de ${property.name}`}
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                                allowFullScreen
                                                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
                                            />
                                        </div>
                                    </>
                                ) : property.location && (
                                    <>
                                        <h3 className="mo-h3 mo-rv">Ubicación</h3>
                                        <MapCard
                                            image={mapImage}
                                            title={`${property.location}, Córdoba`}
                                            cta="Ver en el mapa"
                                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${property.location}, Córdoba, Argentina`)}`}
                                            style={{ minHeight: 380 }}
                                        />
                                    </>
                                )}
                            </div>
                        </div>

                        <aside className="mo-agent mo-rv" aria-label="Consultar por esta propiedad">
                            <div className="mo-agent-price">
                                <span>{isSale ? 'Precio' : 'Alquiler'}</span>
                                <b>{priceText}</b>
                            </div>
                            <div className="mo-agent-who">
                                <img src={francoImg} alt="Franco Ochoa" />
                                <div>
                                    <b>Franco Ochoa</b>
                                    <small>Agente inmobiliario</small>
                                </div>
                            </div>
                            <form className="mo-agent-form" onSubmit={onSend}>
                                <div className="mo-dfield">
                                    <label htmlFor="d-nom">Nombre</label>
                                    <input id="d-nom" name="nombre" type="text" required value={form.nombre} onChange={setField} placeholder="Tu nombre" />
                                </div>
                                <div className="mo-dfield">
                                    <label htmlFor="d-tel">Teléfono</label>
                                    <input id="d-tel" name="telefono" type="tel" value={form.telefono} onChange={setField} placeholder="Tu número" />
                                </div>
                                {emailEnabled && (
                                    <div className="mo-dfield">
                                        <label htmlFor="d-mail">Email</label>
                                        <input id="d-mail" name="email" type="email" value={form.email} onChange={setField} placeholder="ejemplo@correo.com" />
                                    </div>
                                )}
                                <div className="mo-dfield">
                                    <label htmlFor="d-msg">Mensaje</label>
                                    <textarea id="d-msg" name="mensaje" rows="3" required value={form.mensaje} onChange={setField} />
                                </div>
                                {status.message && (
                                    <p role="status" style={{ fontSize: 14, color: status.type === 'error' ? '#EC5A60' : '#C9CBDD' }}>
                                        {status.message}
                                    </p>
                                )}
                                <button type="submit" className="mo-btn mo-btn--red mo-btn--block" disabled={status.type === 'loading'}>
                                    {emailEnabled ? (status.type === 'loading' ? 'Enviando…' : 'Enviar consulta') : 'Consultar por WhatsApp'}
                                </button>
                                <div className="mo-agent-alt">
                                    <a className="mo-btn mo-btn--ghost mo-btn--sm" href={`tel:${SITE.phoneTel}`}>
                                        Llamar
                                    </a>
                                    {emailEnabled ? (
                                        <a className="mo-btn mo-btn--ghost mo-btn--sm" href={waLink(SITE.whatsapp, waText)} target="_blank" rel="noopener noreferrer">
                                            WhatsApp
                                        </a>
                                    ) : (
                                        <a className="mo-btn mo-btn--ghost mo-btn--sm" href={`mailto:${SITE.email}?subject=${encodeURIComponent(`Consulta: ${property.name}`)}`}>
                                            Email
                                        </a>
                                    )}
                                </div>
                            </form>
                        </aside>
                    </div>
                </div>
            </section>

            {similar.length > 0 && (
                <section className="mo-sec mo-sec--ivory">
                    <div className="mo-wrap">
                        <SectionHead eyebrow="Seguí explorando" title="También te" accent="puede interesar">
                            <MoreLink to={listPath}>Ver todas</MoreLink>
                        </SectionHead>
                        <div className="mo-cards">
                            {similar.map((p) => (
                                <PropertyCard key={p.id} property={p} to={`${basePath}/${p.id}`} operation={operation} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </Layout>
    );
};

export default PropertyDetail;
