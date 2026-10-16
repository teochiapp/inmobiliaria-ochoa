import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/mo/Layout';
import Icon from '../../components/mo/Icon';

const ease = 'cubic-bezier(.22,.8,.2,1)';

const NotFound = () => (
    <Layout title="Página no encontrada" footer={false} dark>
        <section className="mo-404">
            <div className="mo-404-in">
                <div className="mo-door" aria-hidden="true">
                    <div className="mo-door-frame" />
                    <div className="mo-door-light" />
                    <div className="mo-door-leaf" />
                </div>
                <b className="mo-404-n" style={{ animation: `mo-fadeup 1.2s ${ease} .2s both` }}>
                    404
                </b>
                <h1 style={{ animation: `mo-fadeup 1.2s ${ease} .4s both` }}>
                    Esta puerta <em className="mo-it" style={{ color: '#EC5A60' }}>no lleva a ningún lado</em>
                </h1>
                <p style={{ animation: `mo-fadeup 1.2s ${ease} .6s both` }}>Lo sentimos, parece que la página que estás buscando no existe o fue movida.</p>
                <div className="mo-404-links" style={{ animation: `mo-fadeup 1.2s ${ease} .8s both` }}>
                    <Link className="mo-btn mo-btn--red" to="/">
                        Volver al inicio <Icon name="arrow" />
                    </Link>
                    <Link className="mo-btn mo-btn--ghost" to="/propiedades-venta">
                        Ver propiedades
                    </Link>
                </div>
            </div>
        </section>
    </Layout>
);

export default NotFound;
