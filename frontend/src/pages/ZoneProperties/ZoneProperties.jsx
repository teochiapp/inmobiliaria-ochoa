import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../../components/mo/Layout';
import PageHero from '../../components/mo/PageHero';
import PropertyCatalog from '../../components/mo/PropertyCatalog';
import Icon from '../../components/mo/Icon';
import { CtaBand } from '../../components/mo/Sections';
import usePreferentialZones from '../../components/mo/usePreferentialZones';
import useZoneProperties from '../../hooks/useZoneProperties';
import { SITE, waLink } from '../../config/site';
import { SIZES } from '../../services/media';
import fallbackHero from '../../public/galeria/yacantoarriba.jpg';

const splitName = (name = '') => {
    const [first, ...rest] = name.trim().split(/\s+/);
    return { title: first || name, accent: rest.join(' ') };
};

// Página de zona / emprendimiento exclusivo (/zona/:slug y /zona-exclusiva/:slug)
const ZoneProperties = () => {
    const { id } = useParams();
    const { properties, zone, loading, error } = useZoneProperties(id);
    const { preferential } = usePreferentialZones();
    const [active, setActive] = useState(0);

    useEffect(() => setActive(0), [id]);

    const name = zone?.nombre || (loading ? 'Cargando' : 'Zona');
    const { title, accent } = splitName(name);
    const current = preferential.find(
        (z) => zone && (z.zone.id === zone.id || String(z.zone.documentId) === String(zone.documentId))
    );
    const gallery = zone?.galeria || [];
    const main = gallery[Math.min(active, gallery.length - 1)];

    if (!loading && (error || !zone)) {
        return (
            <Layout title="Zona no encontrada">
                <PageHero small image={fallbackHero} crumbs={[{ label: 'Inicio', to: '/' }, { label: 'Zonas' }]} title="Zona" accent="no encontrada" />
                <section className="mo-sec mo-sec--white">
                    <div className="mo-wrap mo-error">
                        <p className="mo-lead">No pudimos encontrar esta zona. Puede que se haya movido o que no esté publicada.</p>
                        <Link className="mo-btn mo-btn--navy" to="/propiedades-venta">
                            Ver todas las propiedades <Icon name="arrow" />
                        </Link>
                    </div>
                </section>
            </Layout>
        );
    }

    return (
        <Layout title={name}>
            <PageHero
                image={zone?.cabecera?.url || fallbackHero}
                imageSrcSet={zone?.cabecera?.srcSet}
                style={{ minHeight: 820 }}
                crumbs={[{ label: 'Inicio', to: '/' }, { label: 'Zonas' }, { label: name }]}
                eyebrow={current ? `Emprendimiento exclusivo ${current.n}` : 'Emprendimiento exclusivo'}
                title={title}
                accent={accent}
                subtitle={zone?.subtitulo || 'Un emprendimiento seleccionado por Marin Ochoa Bienes Raíces.'}
                meta={loading ? [] : [{ value: properties.length, label: properties.length === 1 ? 'Disponible' : 'Disponibles' }]}
            />

            {preferential.length > 1 && (
                <div className="mo-dark mo-dark--deep">
                    <div className="mo-wrap">
                        <nav
                            className="mo-pref-list"
                            aria-label="Zonas"
                            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', columnGap: 40 }}
                        >
                            {preferential.map((z) => (
                                <Link key={z.path} to={z.path} className={`mo-pref-item${z === current ? ' is-on' : ''}`} aria-current={z === current ? 'page' : undefined}>
                                    <span className="mo-pref-n">{z.n}</span>
                                    <span className="mo-pref-name" style={{ fontSize: 22 }}>
                                        {z.name}
                                    </span>
                                    <Icon name="arrow" />
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            )}

            <section className="mo-sec mo-sec--ivory">
                <div className="mo-wrap">
                    {loading ? (
                        <div className="mo-skel" style={{ minHeight: 420 }} />
                    ) : (
                        <div className="mo-about-head" style={{ alignItems: 'start' }}>
                            <div>
                                <span className="mo-eyebrow mo-rv">El emprendimiento</span>
                                <h2 className="mo-h2 mo-rv">
                                    {zone.titulo ? (
                                        zone.titulo
                                    ) : (
                                        <>
                                            Vivir en <em className="mo-it">{name}</em>
                                        </>
                                    )}
                                </h2>
                                {zone.adicionales.length > 0 && (
                                    <ul className="mo-feats mo-rv" style={{ marginTop: 36 }}>
                                        {zone.adicionales.map((a) => (
                                            <li key={a}>{a}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div className="mo-rv">
                                {zone.descripcion.length ? (
                                    zone.descripcion.map((p, i) => (
                                        <p key={i} className={i === 0 ? 'mo-lead' : 'mo-body'} style={i ? { marginTop: 16 } : undefined}>
                                            {p}
                                        </p>
                                    ))
                                ) : (
                                    <p className="mo-lead">Consultanos por disponibilidad, planos y condiciones de {name}.</p>
                                )}
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 32 }}>
                                    <a
                                        className="mo-btn mo-btn--red"
                                        href={waLink(SITE.whatsapp, `Hola, quisiera consultar disponibilidad en ${name}.`)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Consultar disponibilidad <Icon name="arrow" />
                                    </a>
                                    {properties.length > 0 && (
                                        <a className="mo-btn mo-btn--line" href="#unidades">
                                            Ver propiedades
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {main && (
                        <div className="mo-gal mo-rv" style={{ marginTop: 80, ...(gallery.length < 2 ? { gridTemplateColumns: 'minmax(0,1fr)' } : {}) }}>
                            <div className="mo-gal-main">
                                <img key={main.url} src={main.url} srcSet={main.srcSet || undefined} sizes={main.srcSet ? SIZES.gallery : undefined} alt={main.alt || `${name} — imagen ${active + 1}`} />
                                <span className="mo-gal-count">
                                    {String(active + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}
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
                    )}
                </div>
            </section>

            {(loading || properties.length > 0) && (
                <div id="unidades" style={{ scrollMarginTop: 96 }}>
                    <PropertyCatalog
                        properties={properties}
                        loading={loading}
                        error={error}
                        operation="Venta"
                        withFilters={properties.length > 6}
                        countLabel={`propiedades en ${name}`}
                    />
                </div>
            )}

            <CtaBand title={`¿Te interesa ${name}?`} accent="Coordinemos una visita." cta="Agendar visita" href={waLink(SITE.whatsapp, `Hola, quisiera coordinar una visita a ${name}.`)} />
        </Layout>
    );
};

export default ZoneProperties;
