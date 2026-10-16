import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../components/mo/Layout';
import Icon from '../../components/mo/Icon';
import PropertyCard from '../../components/mo/PropertyCard';
import { SectionHead, MoreLink, ToolsBand, SellSplit, InstagramGrid, VisitSection } from '../../components/mo/Sections';
import usePreferentialZones from '../../components/mo/usePreferentialZones';
import useHero from '../../hooks/useHero';
import useSales from '../../hooks/useSales';
import useRents from '../../hooks/useRents';
import { LOCALITIES, SITE, waLink } from '../../config/site';
import { SIZES } from '../../services/media';

import logoBlanco from '../../public/brand/logo-blanco.png';
import santaRosaRio from '../../public/galeria/santa-rosa-arriba.jpg';
import villaDelDiqueLago from '../../public/galeria/Villa-del-Diquearriba.jpeg';
import yacantoLago from '../../public/galeria/yacantoarriba.jpg';
import villaRumipalAtardecer from '../../public/hero/villa-rumipal.jpg';
import santaRosaAerea from '../../public/galeria/santa-rosa.jpg';
import oficinaIlustracion from '../../public/hero/marin-ochoa.png';
import francoImg from '../../public/aboutUs/chico.jpeg';

// Si Strapi no tiene imágenes de hero cargadas, se usan estas.
const FALLBACK_SLIDES = [
    { image: santaRosaRio, label: 'Santa Rosa de Calamuchita' },
    { image: villaDelDiqueLago, label: 'Villa del Dique' },
    { image: yacantoLago, label: 'Yacanto' },
    { image: villaRumipalAtardecer, label: 'Villa Rumipal' },
];
const SLIDE_MS = 7000;

const HeroSlider = () => {
    const navigate = useNavigate();
    const { images, imageSets, titles } = useHero();
    const slides = useMemo(
        () => (images && images.length > 0 ? images.slice(0, 6).map((image, i) => ({ image, srcSet: imageSets[i] || '', label: titles[i] || '' })) : FALLBACK_SLIDES),
        [images, imageSets, titles]
    );
    const [active, setActive] = useState(0);
    const [op, setOp] = useState('venta');
    const [search, setSearch] = useState({ ubicacion: '', hab: '', max: '' });

    useEffect(() => {
        if (slides.length < 2) return undefined;
        const t = setTimeout(() => setActive((a) => (a + 1) % slides.length), SLIDE_MS);
        return () => clearTimeout(t);
    }, [active, slides.length]);

    useEffect(() => setActive(0), [slides]);

    const onSearch = (e) => {
        e.preventDefault();
        const q = new URLSearchParams();
        Object.entries(search).forEach(([k, v]) => v && q.set(k, v));
        navigate(`${op === 'venta' ? '/propiedades-venta' : '/alquileres'}${q.toString() ? `?${q}` : ''}`);
    };
    const setField = (e) => setSearch((s) => ({ ...s, [e.target.name]: e.target.value }));

    return (
        <section className="mo-hero" aria-label="Presentación">
            <div className="mo-slides" aria-hidden="true">
                {slides.map((s, i) => (
                    <div key={s.image} className={`mo-slide${i === active ? ' is-on' : ''}`}>
                        <img src={s.image} srcSet={s.srcSet || undefined} sizes={s.srcSet ? SIZES.full : undefined} alt="" />
                    </div>
                ))}
            </div>
            <div className="mo-hero-scrim" />
            <div className="mo-curtain" aria-hidden="true">
                <img src={logoBlanco} alt="" />
            </div>

            <div className="mo-wrap">
                <div className="mo-hero-in">
                    <div className="mo-hero-copy">
                        <span className="mo-eyebrow mo-eyebrow--light" style={{ animation: 'mo-fadeup 1s cubic-bezier(.22,.8,.2,1) 1.4s both' }}>
                            Marin Ochoa · Bienes raíces
                        </span>
                        <h1 className="mo-h1">
                            <span className="mo-line"><span>Tu lugar</span></span>
                            <span className="mo-line"><span>en las Sierras</span></span>
                            <span className="mo-line"><span><em className="mo-it">de Córdoba</em></span></span>
                        </h1>
                        <p className="mo-hero-sub">
                            Hace más de 15 años acompañamos a familias e inversores a comprar, vender y alquilar en el Valle de Calamuchita, con asesoramiento integral en cada paso.
                        </p>
                        <div className="mo-hero-ctas">
                            <Link className="mo-btn mo-btn--red" to="/propiedades-venta">
                                Ver propiedades <Icon name="arrow" />
                            </Link>
                            <a className="mo-btn mo-btn--ghost" href={waLink(SITE.salesWhatsapp, 'Hola, quisiera solicitar una tasación.')} target="_blank" rel="noopener noreferrer">
                                Solicitar tasación
                            </a>
                        </div>
                    </div>
                    {slides.length > 1 && (
                        <div className="mo-hero-side">
                            <div className="mo-hero-place" aria-hidden="true">
                                {slides.map((s, i) => (
                                    <span key={s.image} className={i === active ? 'is-on' : ''}>
                                        {s.label}
                                    </span>
                                ))}
                            </div>
                            <div className="mo-prog">
                                {slides.map((s, i) => (
                                    <button
                                        key={s.image}
                                        type="button"
                                        className={i === active ? 'is-on' : i < active ? 'is-done' : ''}
                                        aria-label={`Ver imagen ${i + 1}${s.label ? `: ${s.label}` : ''}`}
                                        onClick={() => setActive(i)}
                                    >
                                        <i />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <form className="mo-search" role="search" aria-label="Buscar propiedades" onSubmit={onSearch}>
                    <div className="mo-search-tabs">
                        <button type="button" className={`mo-tab${op === 'venta' ? ' is-on' : ''}`} aria-pressed={op === 'venta'} onClick={() => setOp('venta')}>
                            Comprar
                        </button>
                        <button type="button" className={`mo-tab${op === 'alq' ? ' is-on' : ''}`} aria-pressed={op === 'alq'} onClick={() => setOp('alq')}>
                            Alquilar
                        </button>
                    </div>
                    <div className="mo-search-fields">
                        <div className="mo-field">
                            <label htmlFor="h-loc">Localidad</label>
                            <select id="h-loc" name="ubicacion" value={search.ubicacion} onChange={setField}>
                                <option value="">Todas las localidades</option>
                                {LOCALITIES.map((l) => (
                                    <option key={l} value={l}>{l}</option>
                                ))}
                            </select>
                            <Icon name="chevron" />
                        </div>
                        <div className="mo-field">
                            <label htmlFor="h-hab">Habitaciones</label>
                            <select id="h-hab" name="hab" value={search.hab} onChange={setField}>
                                <option value="">Indistinto</option>
                                <option value="1">1 o más</option>
                                <option value="2">2 o más</option>
                                <option value="3">3 o más</option>
                                <option value="4">4 o más</option>
                            </select>
                            <Icon name="chevron" />
                        </div>
                        <div className="mo-field">
                            <label htmlFor="h-pre">Precio máximo</label>
                            <select id="h-pre" name="max" value={search.max} onChange={setField}>
                                <option value="">Sin límite</option>
                                <option value="50000">$ 50.000</option>
                                <option value="100000">$ 100.000</option>
                                <option value="200000">$ 200.000</option>
                                <option value="300000">$ 300.000</option>
                            </select>
                            <Icon name="chevron" />
                        </div>
                        <button type="submit" className="mo-btn mo-btn--red">
                            <Icon name="search" />
                            Buscar
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

const Marquee = () => (
    <div className="mo-marquee" aria-label="Localidades donde trabajamos">
        <div className="mo-marquee-track">
            {[...LOCALITIES, ...LOCALITIES].map((l, i) => (
                <span key={`${l}-${i}`} className={i % 2 ? 'o' : ''} aria-hidden={i >= LOCALITIES.length}>
                    {l}
                </span>
            ))}
        </div>
    </div>
);

const Intro = () => (
    <section className="mo-sec mo-sec--ivory">
        <div className="mo-wrap mo-intro">
            <div className="mo-intro-copy">
                <span className="mo-eyebrow mo-rv">Sobre Marin Ochoa</span>
                <h2 className="mo-h2 mo-rv">
                    Tradición inmobiliaria, <em className="mo-it">mirada</em> contemporánea
                </h2>
                <p className="mo-body mo-rv">
                    Desde hace más de 15 años somos parte de la historia de numerosas familias y empresas. Nos dedicamos con pasión al mercado inmobiliario, conectando a las personas con sus espacios ideales.
                </p>
                <p className="mo-body mo-rv">
                    Te acompañamos en la compra, venta o alquiler con total seguridad y confianza, con un asesoramiento integral para que encuentres el lugar donde tus sueños se hacen realidad.
                </p>
                <div className="mo-years mo-rv">
                    <b>15+</b>
                    <span>
                        años hablando
                        <br />
                        de oportunidades
                    </span>
                </div>
                <div className="mo-sign mo-rv">
                    <img src={francoImg} alt="Franco Ochoa" />
                    <div style={{ flex: 1 }}>
                        <b>Franco Ochoa</b>
                        <small>Agente inmobiliario</small>
                    </div>
                    <MoreLink to="/sobre-nosotros">Conocé al equipo</MoreLink>
                </div>
            </div>
            <div className="mo-intro-media">
                <div className="mo-frame-a mo-rv-clip mo-px">
                    <img src={santaRosaAerea} alt="Vista aérea de Santa Rosa de Calamuchita y las sierras" loading="lazy" />
                </div>
                <div className="mo-frame-b mo-rv">
                    <img src={oficinaIlustracion} alt="Ilustración de la oficina de Marin Ochoa Bienes Raíces" loading="lazy" />
                </div>
            </div>
        </div>
    </section>
);

const Featured = ({ items, loading, operation, basePath }) => {
    if (loading) {
        return (
            <div className="mo-cards">
                {[0, 1, 2].map((i) => (
                    <div key={i} className="mo-skel" />
                ))}
            </div>
        );
    }
    if (!items.length) return <p className="mo-state">Pronto vas a encontrar nuevas propiedades acá.</p>;
    return (
        <div className="mo-cards">
            {items.map((p) => (
                <PropertyCard key={p.id} property={p} to={`${basePath}/${p.id}`} operation={operation} />
            ))}
        </div>
    );
};

const Preferential = () => {
    const { preferential, loading } = usePreferentialZones();
    const available = preferential.filter((z) => z.zone);
    const [idx, setIdx] = useState(0);
    if (loading || available.length === 0) return null;
    const current = available[Math.min(idx, available.length - 1)];

    return (
        <section className="mo-sec mo-dark">
            <div className="mo-wrap">
                <SectionHead eyebrow="Zonas exclusivas" title="Emprendimientos" accent="exclusivos">
                    <p className="mo-body mo-rv">Proyectos exclusivos que elegimos y comercializamos de forma preferencial, con disponibilidad limitada.</p>
                </SectionHead>
                <div className="mo-pref">
                    <div className="mo-pref-list" role="tablist" aria-label="Emprendimientos exclusivos">
                        {available.map((z, i) => (
                            <button
                                key={z.name}
                                type="button"
                                role="tab"
                                aria-selected={z === current}
                                className={`mo-pref-item${z === current ? ' is-on' : ''}`}
                                onClick={() => setIdx(i)}
                            >
                                <span className="mo-pref-n">{z.n}</span>
                                <span className="mo-pref-name">{z.name}</span>
                                <Icon name="arrow" />
                            </button>
                        ))}
                    </div>
                    <div className="mo-pref-stage mo-rv-clip">
                        {available.map((z) => (
                            <div key={z.name} className={`mo-pref-img${z === current ? ' is-on' : ''}`}>
                                {z.zone.image && <img src={z.zone.image} srcSet={z.zone.imageSrcSet || undefined} sizes={z.zone.imageSrcSet ? SIZES.half : undefined} alt={z.name} loading="lazy" decoding="async" />}
                            </div>
                        ))}
                        <div className="mo-pref-cap">
                            <div>
                                <span className="mo-eyebrow mo-eyebrow--light">{current.n} — Emprendimiento</span>
                                <p style={{ marginTop: 14 }}>{current.zone.subtitle || `Conocé las propiedades disponibles en ${current.name}.`}</p>
                            </div>
                            <Link className="mo-btn mo-btn--ghost" to={current.path}>
                                Explorar <Icon name="arrow" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const newestFirst = (list) => [...list].sort((a, b) => b.id - a.id).slice(0, 3);

const Home = () => {
    const { sales, loading: loadingSales } = useSales();
    const { rents, loading: loadingRents } = useRents();

    return (
        <Layout title="Inicio">
            <HeroSlider />
            <Marquee />
            <Intro />

            <section className="mo-sec mo-sec--white">
                <div className="mo-wrap">
                    <SectionHead eyebrow="Selección en venta" title="Propiedades" accent="destacadas">
                        <div className="mo-rv" style={{ display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'flex-start' }}>
                            <p className="mo-body">Casas, lotes y oportunidades de inversión en las localidades más buscadas del valle.</p>
                            <MoreLink to="/propiedades-venta">Ver todas las propiedades</MoreLink>
                        </div>
                    </SectionHead>
                    <Featured items={newestFirst(sales)} loading={loadingSales} operation="Venta" basePath="/propiedad/venta" />
                </div>
            </section>

            <Preferential />

            <section className="mo-sec mo-sec--ivory">
                <div className="mo-wrap">
                    <SectionHead eyebrow="Alquileres" title="Para vivir" accent="o vacacionar">
                        <div className="mo-rv" style={{ display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'flex-start' }}>
                            <p className="mo-body">Casas, cabañas y departamentos junto a los lagos y ríos del Valle de Calamuchita.</p>
                            <MoreLink to="/alquileres">Ver todos los alquileres</MoreLink>
                        </div>
                    </SectionHead>
                    <Featured items={newestFirst(rents)} loading={loadingRents} operation="Alquiler" basePath="/propiedad/alquiler" />
                    <ToolsBand style={{ marginTop: 72 }} />
                </div>
            </section>

            <SellSplit />
            <InstagramGrid />
            <VisitSection />
        </Layout>
    );
};

export default Home;
