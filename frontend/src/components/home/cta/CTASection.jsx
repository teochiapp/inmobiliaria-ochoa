import React from 'react';
import { ExternalLink, Building2, DollarSign } from 'lucide-react';
import { CTAContainer, ContentWrapper, CTAButton, CTATitle, CTADescription, ButtonGroup, CardContent } from './CTASection.styles';
import SpotlightCard from '../../common/SpotlightCard';


const CTASection = () => {
    return (
        <CTAContainer>
            <ContentWrapper>
                <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(255, 255, 255, 0.1)">
                    <CardContent>
                        <CTATitle>Decidí mejor antes de alquilar</CTATitle>
                        <CTADescription>
                            Calculá el impacto real del aumento del alquiler y consultá el dólar actualizado
                        </CTADescription>

                        <ButtonGroup>
                            <CTAButton
                                href="https://dolarhoy.com/"
                                target="_blank"
                                className="secondary"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                DolarHoy <DollarSign />
                            </CTAButton>

                            <CTAButton
                                href="https://vivienda.buenosaires.gob.ar/calculadora_alquiler#top"
                                target="_blank"
                                className="primary"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Calculadora <Building2 />
                            </CTAButton>
                        </ButtonGroup>
                    </CardContent>
                </SpotlightCard>
            </ContentWrapper>
        </CTAContainer>
    );
};

export default CTASection;
