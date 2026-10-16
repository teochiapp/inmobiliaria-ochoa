import React from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import usePreferentialZones from './usePreferentialZones';
import { SITE, waLink } from '../../config/site';
import logoBlanco from '../../public/brand/logo-blanco.png';

const Footer = () => {
    const { preferential } = usePreferentialZones();
    const year = new Date().getFullYear();

    return (
        <footer className="mo-foot">
            <div className="mo-wrap">
                <div className="mo-foot-cta">
                    <h2>
                        ¿Buscás tu próxima <em className="mo-it">propiedad?</em>
                    </h2>
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                        <a className="mo-btn mo-btn--red" href={waLink()} target="_blank" rel="noopener noreferrer">
                            Hablemos por WhatsApp <Icon name="arrow" />
                        </a>
                        <Link className="mo-btn mo-btn--ghost" to="/contacto">
                            Contacto
                        </Link>
                    </div>
                </div>

                <div className="mo-foot-grid">
                    <div className="mo-foot-brand">
                        <img src={logoBlanco} alt={SITE.name} />
                        <p>15 años hablando de oportunidades. Comprometidos con ayudarte a encontrar el hogar de tus sueños.</p>
                        <div className="mo-socials">
                            <a href={SITE.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <Icon name="facebook" />
                            </a>
                            <a href={SITE.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <Icon name="instagram" />
                            </a>
                            <a href={SITE.socials.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                                <Icon name="youtube" />
                            </a>
                            <a href={`mailto:${SITE.email}`} aria-label="Email">
                                <Icon name="mail" />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h5>Navegación</h5>
                        <ul>
                            <li><Link to="/">Inicio</Link></li>
                            <li><Link to="/sobre-nosotros">Sobre nosotros</Link></li>
                            <li><Link to="/propiedades-venta">Propiedades en venta</Link></li>
                            <li><Link to="/alquileres">Alquileres</Link></li>
                            <li><Link to="/contacto">Contacto</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h5>Zonas</h5>
                        <ul>
                            {preferential.map((z) => (
                                <li key={z.name}>{z.path ? <Link to={z.path}>{z.name}</Link> : <span>{z.name}</span>}</li>
                            ))}
                            <li>
                                <a href={waLink(SITE.salesWhatsapp, 'Hola, quisiera solicitar una tasación.')} target="_blank" rel="noopener noreferrer">
                                    Solicitar tasación
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h5>Contacto</h5>
                        <ul className="mo-foot-contact">
                            <li>
                                <Icon name="clock" size="sm" />
                                <span>Lun a vie · 09:00 a 12:00<br />y 17:00 a 18:30</span>
                            </li>
                            <li>
                                <Icon name="phone" size="sm" />
                                <a href={waLink()} target="_blank" rel="noopener noreferrer">{SITE.phoneDisplay}</a>
                            </li>
                            <li>
                                <Icon name="mail" size="sm" />
                                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="mo-wordmark" aria-hidden="true">Marin Ochoa</div>

            <div className="mo-wrap">
                <div className="mo-foot-bottom">
                    <span>© {year} Inmobiliaria Marin Ochoa. Todos los derechos reservados.</span>
                    <a href="https://surcodes.com" target="_blank" rel="noopener noreferrer">
                        Desarrollado por <b>SurCodes</b>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
