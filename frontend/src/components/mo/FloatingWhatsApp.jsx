import React, { useState } from 'react';
import Icon from './Icon';
import { SITE, waLink } from '../../config/site';
import francoImg from '../../public/aboutUs/chico.jpeg';

const FloatingWhatsApp = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="mo-wa-dock">
            <div className="mo-wa">
                {open && (
                    <div className="mo-wa-card" role="dialog" aria-label="Chat de WhatsApp">
                        <div className="mo-wa-head">
                            <img src={francoImg} alt="Franco Ochoa" />
                            <div>
                                <b>Marin Ochoa</b>
                                <small>Respondemos en horario de oficina</small>
                            </div>
                        </div>
                        <p className="mo-wa-msg">Hola, bienvenidos a la Inmobiliaria Marin Ochoa. ¿Querés hacernos alguna consulta? Mandanos un mensaje.</p>
                        <a className="mo-btn mo-btn--red mo-btn--sm" href={waLink()} target="_blank" rel="noopener noreferrer">
                            Abrir chat
                        </a>
                    </div>
                )}
                <button
                    className="mo-wa-btn"
                    type="button"
                    aria-label={open ? 'Cerrar chat de WhatsApp' : 'Abrir chat de WhatsApp'}
                    aria-expanded={open}
                    onClick={() => setOpen((v) => !v)}
                >
                    <Icon name={open ? 'close' : 'whatsapp'} />
                </button>
            </div>
        </div>
    );
};

export default FloatingWhatsApp;
