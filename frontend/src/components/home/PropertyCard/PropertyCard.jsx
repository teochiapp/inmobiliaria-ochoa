import React from 'react';
import { Link } from 'react-router-dom';
import { Bed, Bath, DollarSign } from 'lucide-react';
import {
    CardContainer,
    ImageContainer,
    PropertyImage,
    LocationTag,
    PropertyDetails,
    DetailItem,
    DetailValue,
    DetailLabel
} from './PropertyCard.styles';

const PropertyCard = ({ image, name, price, bedrooms, bathrooms, location, m2, link }) => {
    return (
        <CardContainer as={link ? Link : 'div'} to={link} style={{ textDecoration: 'none', display: 'block' }}>
            <ImageContainer>
                <PropertyImage src={image} alt={name} />
                <LocationTag>{location}</LocationTag>

                <PropertyDetails>
                    <DetailItem>
                        <DetailValue>{price}</DetailValue>
                        <DetailLabel>Precio</DetailLabel>
                    </DetailItem>
                    <DetailItem>
                        <DetailValue>{bedrooms}</DetailValue>
                        <DetailLabel>Habitaciones</DetailLabel>
                    </DetailItem>
                    <DetailItem>
                        <DetailValue>{bathrooms}</DetailValue>
                        <DetailLabel>Baños</DetailLabel>
                    </DetailItem>
                </PropertyDetails>
            </ImageContainer>
        </CardContainer>
    );
};

export default PropertyCard;
