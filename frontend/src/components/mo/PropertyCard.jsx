import React from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import { formatPrice } from '../../config/site';
import { SIZES } from '../../services/media';

// Tarjeta de propiedad. `property` usa la forma que devuelven useSales / useRents / useZoneProperties.
const PropertyCard = ({ property, to, operation = 'Venta' }) => {
    const isRent = operation === 'Alquiler';
    const { imagen, imagenSrcSet, nombre, ubicacion, habitaciones, baños: banos, m2, precio, periodo } = property;

    return (
        <Link className="mo-card mo-rv" to={to}>
            <div className="mo-card-media">
                {imagen ? <img src={imagen} srcSet={imagenSrcSet || undefined} sizes={imagenSrcSet ? SIZES.card : undefined} alt={nombre} loading="lazy" decoding="async" /> : <span className="mo-ph-img">Sin imagen</span>}
                <span className={`mo-chip${isRent ? ' mo-chip--red' : ''}`}>{operation}</span>
                <span className="mo-card-view">
                    Ver propiedad <Icon name="arrow" size="sm" />
                </span>
            </div>
            <div className="mo-card-body">
                {ubicacion && (
                    <p className="mo-card-loc">
                        <Icon name="pin" size="sm" />
                        {ubicacion}
                    </p>
                )}
                <h3 className="mo-card-t">{nombre}</h3>
                <ul className="mo-specs">
                    {habitaciones > 0 && (
                        <li>
                            <Icon name="bed" />
                            {habitaciones} hab.
                        </li>
                    )}
                    {banos > 0 && (
                        <li>
                            <Icon name="bath" />
                            {banos} {banos === 1 ? 'baño' : 'baños'}
                        </li>
                    )}
                    {m2 > 0 && (
                        <li>
                            <Icon name="area" />
                            {m2} m²
                        </li>
                    )}
                </ul>
                <div className="mo-card-foot">
                    <span className="mo-price">
                        <small>{isRent ? 'Alquiler' : 'Precio'}</small>
                        {formatPrice(precio, periodo)}
                    </span>
                    <span className="mo-arrow">
                        <Icon name="arrow" />
                    </span>
                </div>
            </div>
        </Link>
    );
};

export const cardOperation = (property, fallback = 'Venta') =>
    property.type === 'alquiler' ? 'Alquiler' : property.type === 'venta' ? 'Venta' : fallback;

export default PropertyCard;
