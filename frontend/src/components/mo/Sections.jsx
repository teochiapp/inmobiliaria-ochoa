import React from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import { SITE, waLink, MAP_EMBED_URL } from '../../config/site';

import durazno from '../../public/galeria/durazno.jpg';
import embalse from '../../public/galeria/embalse.jpg';
import quillinzo from '../../public/galeria/quillinzo.jpg';
import villaDelDiquePlaya from '../../public/hero/villadeldique.jpg';
import villaRumipalCosta from '../../public/galeria/villa-rumipal.jpeg';
import villaRumipalPano from '../../public/galeria/villarumipalarriba.jpg';
import embalseAerea from '../../public/hero/hero.png';
import fotoGrupal from '../../public/foto-grupal.jpeg';

export const SectionHead = ({ eyebrow, title, accent, children }) => (
    <div className="mo-sec-head">
        <div>
            <span className="mo-eyebrow mo-rv">{eyebrow}</span>
            <h2 className="mo-h2 mo-rv">
                {title} {accent && <em className="mo-it">{accent}</em>}
            </h2>
        </div>
        {children}
    </div>
);

export const MoreLink = ({ to, children }) => (
    <Link className="mo-link" to={to}>
        {children} <Icon name="arrow" />
    </Link>
);

export const ToolsBand = ({ style }) => (
    <div className="mo-tools mo-rv" style={style}>
        <div style={{ position: 'relative', zIndex: 1 }}>
            <h3>Decidí mejor antes de alquilar</h3>
            <p>Calculá el impacto real del aumento del alquiler y consultá el dólar actualizado.</p>
        </div>
        <div className="mo-tools-btns">
            <a className="mo-btn mo-btn--ghost" href="https://dolarhoy.com/" target="_blank" rel="noopener noreferrer">
                <Icon name="dollar" />
                Dólar hoy
            </a>
            <a className="mo-btn mo-btn--red" href="https://vivienda.buenosaires.gob.ar/calculadora_alquiler" target="_blank" rel="noopener noreferrer">
                Calculadora <Icon name="arrow" />
            </a>
        </div>
    </div>
);

export const CtaBand = ({ title, accent, cta, href }) => (
    <section className="mo-band">
        <div className="mo-wrap mo-band-in">
            <h2 className="mo-rv">
                {title}{' '}
                <em className="mo-it" style={{ color: '#fff' }}>
                    {accent}
                </em>
            </h2>
            <a className="mo-btn mo-btn--ghost mo-rv" href={href} target="_blank" rel="noopener noreferrer">
                {cta} <Icon name="arrow" />
            </a>
        </div>
    </section>
);

export const SellSplit = () => (
    <section className="mo-dark mo-dark--deep">
        <div className="mo-split">
            <div className="mo-split-media mo-px">
                <img src={fotoGrupal} alt="Equipo de Marin Ochoa reunido en la oficina" loading="lazy" />
            </div>
            <div className="mo-split-copy">
                <span className="mo-eyebrow mo-rv">Tasaciones y ventas</span>
                <h2 className="mo-h2 mo-rv" style={{ marginTop: 22 }}>
                    Tasá y vendé tu propiedad <em className="mo-it">con nosotros</em>
                </h2>
                <p className="mo-lead mo-rv" style={{ marginTop: 24 }}>
                    Vender con Marin Ochoa significa elegir un servicio integral, personalizado y de alta gama. Te acompañamos en cada paso de la operación.
                </p>
                <div className="mo-steps">
                    <div className="mo-step mo-rv">
                        <b>01</b>
                        <h4>Estimación</h4>
                        <p>Analizamos tu propiedad y el mercado para definir un valor real.</p>
                    </div>
                    <div className="mo-step mo-rv">
                        <b>02</b>
                        <h4>Mandato de venta</h4>
                        <p>Firmamos el mandato y diseñamos la estrategia comercial.</p>
                    </div>
                    <div className="mo-step mo-rv">
                        <b>03</b>
                        <h4>Escritura</h4>
                        <p>Coordinamos todo hasta la formalización de la escritura.</p>
                    </div>
                </div>
                <a
                    className="mo-btn mo-btn--red mo-rv"
                    style={{ marginTop: 48 }}
                    href={waLink(SITE.salesWhatsapp, 'Hola, quisiera solicitar una estimación de mi propiedad.')}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Solicitar una estimación <Icon name="arrow" />
                </a>
            </div>
        </div>
    </section>
);

const IG_IMAGES = [
    { src: durazno, alt: 'Río en El Durazno' },
    { src: embalse, alt: 'Lago de Embalse' },
    { src: quillinzo, alt: 'Río en Quillinzo' },
    { src: villaDelDiquePlaya, alt: 'Costa de Villa del Dique' },
    { src: villaRumipalCosta, alt: 'Costa de Villa Rumipal' },
    { src: villaRumipalPano, alt: 'Panorámica de Villa Rumipal' },
];

export const InstagramGrid = () => (
    <section className="mo-sec mo-sec--blush">
        <div className="mo-wrap">
            <SectionHead eyebrow={SITE.instagramHandle} title="Seguinos" accent="en Instagram">
                <a className="mo-btn mo-btn--line mo-rv" href={SITE.socials.instagram} target="_blank" rel="noopener noreferrer">
                    <Icon name="instagram" />
                    Ir al perfil
                </a>
            </SectionHead>
            <div className="mo-ig">
                {IG_IMAGES.map((img) => (
                    <a key={img.alt} className="mo-rv" href={SITE.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label={`Instagram: ${img.alt}`}>
                        <img src={img.src} alt={img.alt} loading="lazy" />
                        <Icon name="instagram" />
                    </a>
                ))}
            </div>
        </div>
    </section>
);

export const InfoRow = ({ icon, label, children }) => (
    <div className="mo-info-row mo-rv">
        <span className="mo-info-ic">
            <Icon name={icon} />
        </span>
        <div>
            <h4>{label}</h4>
            {children}
        </div>
    </div>
);

export const MapCard = ({ image = embalseAerea, title = SITE.name, href = SITE.mapsUrl, cta = 'Cómo llegar', style }) => (
    <div className="mo-visit-map" style={style}>
        <img src={image} alt="Vista aérea del lago y las sierras" loading="lazy" />
        <div className="mo-pin" aria-hidden="true">
            <span />
        </div>
        <div className="mo-map-card">
            <b>{title}</b>
            <a className="mo-btn mo-btn--red mo-btn--sm" href={href} target="_blank" rel="noopener noreferrer">
                {cta} <Icon name="arrow" />
            </a>
        </div>
    </div>
);

export const AddressText = () =>
    SITE.address ? <p>{SITE.address}</p> : <p className="mo-ph">Consultá la dirección por WhatsApp</p>;

export const VisitSection = ({ showInstagram = false }) => (
    <section className="mo-visit">
        <div className="mo-visit-info">
            <div>
                <span className="mo-eyebrow mo-rv">Visitanos</span>
                <h2 className="mo-h2 mo-rv" style={{ marginTop: 22 }}>
                    Te esperamos <em className="mo-it">en la oficina</em>
                </h2>
            </div>
            <InfoRow icon="clock" label="Horarios">
                <p>
                    Lunes a viernes
                    <br />
                    09:00 a 12:00 · 17:00 a 18:30
                </p>
            </InfoRow>
            {showInstagram ? (
                <InfoRow icon="instagram" label="Instagram">
                    <a href={SITE.socials.instagram} target="_blank" rel="noopener noreferrer">
                        {SITE.instagramHandle}
                    </a>
                </InfoRow>
            ) : (
                <>
                    <InfoRow icon="phone" label="WhatsApp">
                        <a href={waLink()} target="_blank" rel="noopener noreferrer">
                            {SITE.phoneDisplay}
                        </a>
                    </InfoRow>
                    <InfoRow icon="mail" label="Email">
                        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                    </InfoRow>
                </>
            )}
            <InfoRow icon="pin" label="Oficina">
                <AddressText />
            </InfoRow>
        </div>
        <div className="mo-visit-map">
            <iframe
                src={MAP_EMBED_URL}
                title="Ubicación de Marin Ochoa Bienes Raíces"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0, filter: 'saturate(.85)' }}
            />
            <div className="mo-map-card">
                <b>{SITE.name}</b>
                <a className="mo-btn mo-btn--red mo-btn--sm" href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer">
                    Cómo llegar <Icon name="arrow" />
                </a>
            </div>
        </div>
    </section>
);
