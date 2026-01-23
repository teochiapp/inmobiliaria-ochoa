import React from 'react';
import { Bed, Bath, MapPin } from 'lucide-react';
import {
    CardContainer,
    ImageContainer,
    PropertyImage,
    PropertyInfo,
    PropertyName,
    PropertyPrice,
    PropertyDetails,
    DetailItem,
    PropertyLocation,
    InfoButton
} from './PropertyCard.styles';

const PropertyCard = ({ image, name, price, bedrooms, bathrooms, location }) => {
    return (
        <CardContainer>
            <ImageContainer>
                <PropertyImage src={image} alt={name} />
            </ImageContainer>

            <PropertyInfo>
                <PropertyName>{name}</PropertyName>
                <PropertyPrice>{price}</PropertyPrice>

                <PropertyDetails>
                    <DetailItem>
                        <Bed size={18} />
                        <span>{bedrooms}</span>
                    </DetailItem>
                    <DetailItem>
                        <Bath size={18} />
                        <span>{bathrooms}</span>
                    </DetailItem>
                </PropertyDetails>

                <PropertyLocation>
                    <MapPin size={16} />
                    <span>{location}</span>
                </PropertyLocation>

                <InfoButton>+INFO</InfoButton>
            </PropertyInfo>
        </CardContainer>
    );
};

export default PropertyCard;
