import React, { useState } from 'react';
import Layout from '../../components/mo/Layout';
import PageHero from '../../components/mo/PageHero';
import Icon from '../../components/mo/Icon';
import { VisitSection } from '../../components/mo/Sections';
import { SITE, waLink } from '../../config/site';
import heroBg from '../../public/galeria/villarumipalarriba.jpg';
import isologo from '../../public/brand/isologo.png';
import useHours from '../../components/mo/useHours';
import { emailEnabled, sendContactEmail } from '../../services/contact';

const INTENTS = ['Comprar', 'Vender', 'Alquilar', 'Tasar'];
const EMPTY = { nombre: '', telefono: '', email: '', mensaje: '' };

const validate = (f) => {
    const e = {};
    if (!f.nombre.trim()) e.nombre = 'El nombre es obligatorio';
    if (!f.telefono.trim()) e.telefono = 'El teléfono es obligatorio';
    if (!f.email.trim()) e.email = 'El email es obligatorio';
    else if (!/\S+@\S+\.\S+/.test(f.email)) e.email = 'El email no es válido';
    if (!f.mensaje.trim()) e.mensaje = 'El mensaje no puede estar vacío';
    return e;
};

const Contact = () => {
    const [intent, setIntent] = useState('Comprar');
    const [form, setForm] = useState(EMPTY);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState({ type: '', message: '' });
    const { hours } = useHours();

    const setField = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
        if (errors[name]) setErrors((er) => ({ ...er, [name]: '' }));
    };

    // Si EmailJS está configurado el mensaje llega por email; si no, se abre WhatsApp con el mensaje armado.
    const onSubmit = async (e) => {
        e.preventDefault();
        const errs = validate(form);
        if (Object.keys(errs).length) {
            setErrors(errs);
            return;
        }
        if (emailEnabled) {
            setStatus({ type: 'loading', message: '' });
            try {
                await sendContactEmail({
                    name: form.nombre,
                    email: form.email,
                    phone: form.telefono,
                    message: `Me interesa: ${intent}.\n\n${form.mensaje}`,
                    originPage: 'Página de Contacto',
                });
                setStatus({ type: 'success', message: '¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.' });
                setForm(EMPTY);
            } catch (err) {
                console.error('EmailJS Error:', err);
                setStatus({ type: 'error', message: `Hubo un error al enviar el mensaje. Escribinos por WhatsApp al ${SITE.phoneDisplay}.` });
            }
            return;
        }
        const text = `Hola, me interesa: ${intent}.\n\n${form.mensaje}\n\nNombre: ${form.nombre}\nTeléfono: ${form.telefono}\nEmail: ${form.email}`;
        window.open(waLink(intent === 'Vender' || intent === 'Tasar' ? SITE.salesWhatsapp : SITE.whatsapp, text), '_blank', 'noopener');
        setStatus({ type: 'success', message: `¡Listo! Abrimos WhatsApp con tu mensaje. Si no se abrió, escribinos al ${SITE.phoneDisplay}.` });
        setForm(EMPTY);
    };

    const field = (name, label, props = {}, full = false) => (
        <div className={`mo-cfield${full ? ' mo-cfield--full' : ''}`}>
            <label htmlFor={`c-${name}`}>{label} *</label>
            {props.as === 'textarea' ? (
                <textarea id={`c-${name}`} name={name} rows="4" value={form[name]} onChange={setField} placeholder={props.placeholder} aria-invalid={!!errors[name]} />
            ) : (
                <input id={`c-${name}`} name={name} type={props.type || 'text'} value={form[name]} onChange={setField} placeholder={props.placeholder} aria-invalid={!!errors[name]} />
            )}
            {errors[name] && <span className="mo-field-err">{errors[name]}</span>}
        </div>
    );

    return (
        <Layout title="Contacto">
            <PageHero
                image={heroBg}
                innerStyle={{ paddingBottom: 168 }}
                crumbs={[{ label: 'Inicio', to: '/' }, { label: 'Contacto' }]}
                title="Hablemos"
                accent="de tu próxima propiedad"
                subtitle="Estamos acá para ayudarte a cumplir tus sueños."
            />

            <section className="mo-sec mo-sec--ivory" style={{ paddingTop: 0 }}>
                <div className="mo-wrap">
                    <div className="mo-cgrid">
                        <a className="mo-ccard mo-rv" href={waLink()} target="_blank" rel="noopener noreferrer">
                            <Icon name="whatsapp" />
                            <h4>WhatsApp · Franco</h4>
                            <p>{SITE.phoneDisplay}</p>
                        </a>
                        <a className="mo-ccard mo-rv" href={waLink(SITE.salesWhatsapp)} target="_blank" rel="noopener noreferrer">
                            <Icon name="home" />
                            <h4>Ventas y tasaciones · Angelina</h4>
                            <p>{SITE.salesDisplay}</p>
                        </a>
                        <a className="mo-ccard mo-rv" href={`mailto:${SITE.email}`}>
                            <Icon name="mail" />
                            <h4>Email</h4>
                            <p>{SITE.email}</p>
                        </a>
                        <div className="mo-ccard mo-rv">
                            <Icon name="clock" />
                            <h4>Horarios</h4>
                            <p style={{ fontSize: 15 }}>
                                {hours.map((h) => (
                                    <span key={h.label} style={{ display: 'block' }}>
                                        {h.label}: {h.value}
                                    </span>
                                ))}
                            </p>
                        </div>
                    </div>

                    <div className="mo-cform-wrap mo-rv" style={{ marginTop: 96 }}>
                        <div className="mo-cform">
                            <span className="mo-eyebrow">Escribinos</span>
                            <h2 className="mo-h2" style={{ marginTop: 22 }}>
                                Contactanos
                            </h2>
                            <p className="mo-body" style={{ marginTop: 14 }}>
                                Estamos acá para ayudarte con cualquier consulta. Te respondemos en horario de oficina.
                            </p>
                            <form onSubmit={onSubmit} noValidate>
                                <div className="mo-cfield mo-cfield--full">
                                    <span className="mo-cfield-label" style={{ font: "700 10px/1 'Lato', sans-serif", letterSpacing: '.26em', textTransform: 'uppercase', color: '#3B3F63' }}>
                                        Me interesa
                                    </span>
                                    <div className="mo-chips">
                                        {INTENTS.map((v) => (
                                            <button key={v} type="button" className={`mo-chipbtn${v === intent ? ' is-on' : ''}`} aria-pressed={v === intent} onClick={() => setIntent(v)}>
                                                {v}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                {field('nombre', 'Nombre completo', { placeholder: 'Ingresá tu nombre' })}
                                {field('telefono', 'Teléfono', { type: 'tel', placeholder: 'Ingresá tu número' })}
                                {field('email', 'Email', { type: 'email', placeholder: 'ejemplo@correo.com' }, true)}
                                {field('mensaje', 'Mensaje', { as: 'textarea', placeholder: '¿En qué podemos ayudarte?' }, true)}
                                {status.message && (
                                    <p className="mo-ok" role="status" style={status.type === 'error' ? { color: '#A9161D' } : undefined}>
                                        <i />
                                        {status.message}
                                    </p>
                                )}
                                <div className="mo-cfield--full" style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                                    <button type="submit" className="mo-btn mo-btn--red" disabled={status.type === 'loading'}>
                                        {status.type === 'loading' ? 'Enviando…' : 'Enviar mensaje'} <Icon name="arrow" />
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="mo-cform-side">
                            <img className="mo-iso" src={isologo} alt="" />
                            <div style={{ position: 'relative' }}>
                                <span className="mo-eyebrow" style={{ color: '#fff' }}>
                                    Horarios de atención
                                </span>
                                <div className="mo-hours" style={{ marginTop: 24 }}>
                                    {hours.map((h) => (
                                        <div key={h.label}>
                                            <span>{h.label}</span>
                                            <b>{h.value}</b>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 12, marginTop: 48 }}>
                                <p style={{ font: "italic 500 24px/1.35 'Cormorant Garamond', Georgia, serif" }}>¿Preferís algo más rápido? Escribinos directo.</p>
                                <a className="mo-btn mo-btn--ghost" href={waLink()} target="_blank" rel="noopener noreferrer" style={{ borderColor: 'rgba(255,255,255,.6)', color: '#fff' }}>
                                    Abrir WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <VisitSection showInstagram />
        </Layout>
    );
};

export default Contact;
