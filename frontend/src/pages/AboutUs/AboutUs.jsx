import React from 'react';
import Layout from '../../components/mo/Layout';
import PageHero from '../../components/mo/PageHero';
import Icon from '../../components/mo/Icon';
import { CtaBand } from '../../components/mo/Sections';
import { SITE, waLink } from '../../config/site';
import useHours from '../../components/mo/useHours';

import heroBg from '../../public/galeria/santa-rosa.jpg';
import equipoImg from '../../public/aboutUs/equipo.png';
import francoImg from '../../public/aboutUs/chico.jpeg';
import angelinaImg from '../../public/aboutUs/chica.jpeg';
import oficinaIlustracion from '../../public/hero/marin-ochoa.png';

const PILLARS = [
    { icon: 'award', title: 'Trayectoria garantizada', text: 'Más de una década de experiencia brindando seguridad en cada operación.' },
    { icon: 'compass', title: 'Asesoramiento integral', text: 'Soporte completo y personalizado en compra, venta y gestión de propiedades.' },
    { icon: 'shield', title: 'Equipo profesional', text: 'Comprometidos con la transparencia, la integridad y tu satisfacción total.' },
];

const VALUES = [
    { icon: 'award', title: 'Excelencia', text: 'Nos comprometemos a brindar un servicio de la más alta calidad en cada detalle.' },
    { icon: 'shield', title: 'Integridad', text: 'La honestidad y la transparencia son los pilares de todas nuestras relaciones.' },
    { icon: 'spark', title: 'Innovación', text: 'Usamos la mejor tecnología y estrategias de marketing para destacar tu propiedad.' },
    { icon: 'heart', title: 'Compromiso', text: 'Tu éxito es nuestro éxito. Te acompañamos en cada paso del proceso inmobiliario.' },
];

const TEAM = [
    { name: 'Franco Ochoa', role: 'Agente inmobiliario', image: francoImg, whatsapp: SITE.whatsapp, email: SITE.email },
    { name: 'Angelina Cerutti', role: 'Asesora de ventas', image: angelinaImg, whatsapp: SITE.salesWhatsapp },
];

const AboutUs = () => {
    const { hours } = useHours();
    return (
    <Layout title="Sobre nosotros">
        <PageHero
            image={heroBg}
            crumbs={[{ label: 'Inicio', to: '/' }, { label: 'Sobre nosotros' }]}
            title="Sobre"
            accent="nosotros"
            subtitle="Innovación y tradición inmobiliaria en el corazón del Valle de Calamuchita."
            meta={[{ value: '15+', label: 'Años de trayectoria' }]}
        />

        <section className="mo-sec mo-sec--ivory">
            <div className="mo-wrap">
                <div className="mo-about-head">
                    <div>
                        <span className="mo-eyebrow mo-rv">Quiénes somos</span>
                        <h2 className="mo-h2 mo-rv">
                            Somos <em className="mo-it">Marin Ochoa</em> Inmobiliaria
                        </h2>
                    </div>
                    <div>
                        <p className="mo-lead mo-rv">
                            Desde hace más de 15 años somos parte de la historia de numerosas familias y empresas. Nos dedicamos con pasión al mercado inmobiliario, especializándonos en conectar a las personas con sus espacios ideales.
                        </p>
                        <p className="mo-body mo-rv" style={{ marginTop: 20 }}>
                            Te ayudamos a navegar el proceso de compra, venta o alquiler con total seguridad y confianza. Nuestro compromiso es brindarte un asesoramiento integral para que encuentres el lugar donde tus sueños se hacen realidad.
                        </p>
                    </div>
                </div>

                <div className="mo-pillars">
                    {PILLARS.map((p) => (
                        <div className="mo-pillar mo-rv" key={p.title}>
                            <div className="mo-pillar-ic">
                                <Icon name={p.icon} size="lg" />
                            </div>
                            <h3 className="mo-h3">{p.title}</h3>
                            <p className="mo-body">{p.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section className="mo-wide mo-px" aria-label="Nuestro equipo en la oficina">
            <img src={equipoImg} alt="El equipo de Marin Ochoa reunido con clientes en la oficina" loading="lazy" />
            <div className="mo-wide-cap">
                <div className="mo-wrap">
                    <p className="mo-rv">“Te acompañamos en cada paso, desde la primera visita hasta la firma de la escritura.”</p>
                </div>
            </div>
        </section>

        <section className="mo-sec mo-dark">
            <div className="mo-wrap">
                <div className="mo-sec-head">
                    <div>
                        <span className="mo-eyebrow mo-rv">Nuestros valores</span>
                        <h2 className="mo-h2 mo-rv">
                            Los principios que <em className="mo-it">nos guían</em>
                        </h2>
                    </div>
                    <p className="mo-body mo-rv">Lo que sostiene nuestro trabajo, día a día y operación por operación.</p>
                </div>
                <div className="mo-values">
                    {VALUES.map((v, i) => (
                        <div className="mo-value mo-rv" key={v.title}>
                            <b>{String(i + 1).padStart(2, '0')}</b>
                            <Icon name={v.icon} size="lg" />
                            <h3>{v.title}</h3>
                            <p>{v.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section className="mo-sec mo-sec--white">
            <div className="mo-wrap">
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 72 }}>
                    <span className="mo-eyebrow mo-rv">Nuestro equipo</span>
                    <h2 className="mo-h2 mo-rv" style={{ marginTop: 22 }}>
                        Expertos <em className="mo-it">a tu servicio</em>
                    </h2>
                    <p className="mo-body mo-rv" style={{ marginTop: 18, maxWidth: 520 }}>
                        Conocé a los profesionales que harán realidad tus objetivos inmobiliarios.
                    </p>
                </div>
                <div className="mo-team">
                    {TEAM.map((m) => (
                        <article className="mo-member mo-rv" key={m.name}>
                            <div className="mo-member-photo">
                                <img src={m.image} alt={m.name} loading="lazy" />
                                <div className="mo-member-soc">
                                    <a href={waLink(m.whatsapp)} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp de ${m.name}`}>
                                        <Icon name="whatsapp" />
                                    </a>
                                    {m.email && (
                                        <a href={`mailto:${m.email}`} aria-label={`Email de ${m.name}`}>
                                            <Icon name="mail" />
                                        </a>
                                    )}
                                    <a href={SITE.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                        <Icon name="instagram" />
                                    </a>
                                </div>
                            </div>
                            <div className="mo-member-info">
                                <div>
                                    <b>{m.name}</b>
                                    <small>{m.role}</small>
                                </div>
                                <a className="mo-arrow" href={waLink(m.whatsapp)} target="_blank" rel="noopener noreferrer" aria-label={`Contactar a ${m.name}`}>
                                    <Icon name="arrow" />
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>

        <section className="mo-sec mo-sec--blush">
            <div className="mo-wrap mo-car">
                <div className="mo-rv-clip" style={{ background: '#fff', overflow: 'hidden', aspectRatio: '3 / 2' }}>
                    <img src={oficinaIlustracion} alt="Ilustración de la fachada de la oficina de Marin Ochoa" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                    <span className="mo-eyebrow mo-rv">Nuestra casa</span>
                    <h2 className="mo-h2 mo-rv" style={{ marginTop: 22 }}>
                        La puerta <em className="mo-it">siempre abierta</em>
                    </h2>
                    <p className="mo-body mo-rv" style={{ marginTop: 22 }}>
                        Nuestra marca es una puerta abierta, y así trabajamos: cerca, con trato directo y respuestas claras. Visitanos en la oficina o escribinos cuando quieras.
                    </p>
                    <div className="mo-hours mo-rv" style={{ marginTop: 28, color: '#1C1D2B' }}>
                        {hours.map((h) => (
                            <div key={h.label} style={{ borderColor: '#E6D0D3' }}>
                                <span>{h.label}</span>
                                <b>{h.value}</b>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        <CtaBand title="Contactanos para descubrir" accent="tu propiedad ideal" cta="Contactar ahora" href={waLink()} />
    </Layout>
    );
};

export default AboutUs;
