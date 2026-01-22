import React from 'react';

const PropertyCard = ({ property }) => {
    return (
        <div className="property-card">
            <h3>{property.title}</h3>
            <p>Ubicación: {property.location}</p>
            <p className="price">Precio: USD {property.price.toLocaleString()}</p>
            <button className="btn-detail">Ver detalle</button>
        </div>
    );
};

export default PropertyCard;
