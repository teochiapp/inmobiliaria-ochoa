import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { ChevronRight, Home as HomeIcon } from 'lucide-react';
import SplitText from './SplitText';
import LightRays from './LightRays';

const Breadcrumb = ({ customItems, title, backgroundImage }) => {
    const location = useLocation();

    // Generate breadcrumb items from path if not custom provided
    const generateBreadcrumbs = () => {
        if (customItems) return customItems;

        const pathnames = location.pathname.split('/').filter(x => x);

        const breadcrumbMap = {
            'propiedades-en-venta': 'Propiedades en Venta',
            'propiedades-en-alquiler': 'Propiedades en Alquiler',
            'contacto': 'Contacto',
            'nosotros': 'Nosotros',
            'propiedad': 'Propiedad'
        };

        return pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            const label = breadcrumbMap[value] || value.charAt(0).toUpperCase() + value.slice(1);

            return {
                label,
                path: to,
                isLast: index === pathnames.length - 1
            };
        });
    };

    const breadcrumbs = generateBreadcrumbs();
    const currentPage = title || breadcrumbs[breadcrumbs.length - 1]?.label || 'Página';

    return (
        <BreadcrumbHeader $backgroundImage={backgroundImage}>
            <LightRaysBackground>
                <LightRays
                    raysOrigin="top-center"
                    raysColor="#ffffff"
                    raysSpeed={0.7}
                    lightSpread={2.5}
                    rayLength={3}
                    followMouse={true}
                    mouseInfluence={0.2}
                    noiseAmount={0.08}
                    distortion={0.25}
                    pulsating={false}
                    fadeDistance={1.5}
                    saturation={0.9}
                />
            </LightRaysBackground>
            <Overlay />
            <ContentWrapper>
                <BreadcrumbTrail>
                    <TrailItem>
                        <TrailLink to="/">
                            <HomeIcon size={14} />
                        </TrailLink>
                    </TrailItem>

                    {breadcrumbs.map((breadcrumb, index) => (
                        <React.Fragment key={breadcrumb.path}>
                            <Separator>
                                <ChevronRight size={12} />
                            </Separator>

                            <TrailItem>
                                {breadcrumb.isLast ? (
                                    <CurrentTrail>{breadcrumb.label}</CurrentTrail>
                                ) : (
                                    <TrailLink to={breadcrumb.path}>
                                        {breadcrumb.label}
                                    </TrailLink>
                                )}
                            </TrailItem>
                        </React.Fragment>
                    ))}
                </BreadcrumbTrail>

                <PageTitle>
                    <SplitText
                        text={currentPage.toUpperCase()}
                        tag="h1"
                        delay={20}
                        duration={2.5}
                        ease="power3.out"
                        splitType="chars"
                        from={{ opacity: 0, y: 20 }}
                        to={{ opacity: 1, y: 0 }}
                        threshold={0.3}
                        rootMargin="0px"
                        textAlign="center"
                    />
                </PageTitle>
            </ContentWrapper>
        </BreadcrumbHeader>
    );
};

export default Breadcrumb;

const BreadcrumbHeader = styled.header`
    position: relative;
    width: 100%;
    min-height: 280px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.$backgroundImage
        ? `linear-gradient(135deg, rgba(43, 46, 75, 0.92) 0%, rgba(11, 23, 46, 0.88) 100%), url(${props.$backgroundImage})`
        : 'linear-gradient(135deg, #2B2E4B 0%, #0B172E 100%)'};
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    padding: 6rem 2rem 3rem;
    margin-top: 80px;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: 
            radial-gradient(circle at 20% 50%, rgba(220, 53, 69, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(0, 51, 102, 0.08) 0%, transparent 50%);
        pointer-events: none;
        z-index: 1;
    }
    
    @media (max-width: 768px) {
        min-height: 200px;
        padding: 5rem 1.5rem 2rem;
        margin-top: 70px;
        background-attachment: scroll;
    }
`;

const LightRaysBackground = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.35;
    mix-blend-mode: screen;
    pointer-events: none;
    z-index: 0;
`;

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.15) 0%,
        rgba(0, 0, 0, 0.3) 100%
    );
    pointer-events: none;
    z-index: 1;
`;

const ContentWrapper = styled.div`
    position: relative;
    z-index: 2;
    max-width: 1200px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
`;

const BreadcrumbTrail = styled.nav`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    
    @media (max-width: 768px) {
        font-size: 0.85rem;
    }
`;

const TrailItem = styled.span`
    display: flex;
    align-items: center;
`;

const TrailLink = styled(Link)`
    font-family: 'Cinzel', serif;
    font-size: 0.8rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    transition: all 0.3s ease;
    text-shadow: 
        0 1px 3px rgba(0, 0, 0, 0.5),
        0 2px 6px rgba(0, 0, 0, 0.3);
    letter-spacing: 0.5px;
    
    &:hover {
        color: var(--brand-red);
        text-shadow: 
            0 1px 3px rgba(0, 0, 0, 0.6),
            0 2px 8px rgba(0, 0, 0, 0.4),
            0 0 15px rgba(220, 53, 69, 0.4);
        transform: translateY(-1px);
    }
    
    @media (max-width: 768px) {
        font-size: 0.75rem;
    }
`;

const CurrentTrail = styled.span`
    font-family: 'Cinzel', serif;
    font-size: 0.8rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
    text-shadow: 
        0 1px 3px rgba(0, 0, 0, 0.5),
        0 2px 6px rgba(0, 0, 0, 0.3);
    letter-spacing: 0.5px;
    
    @media (max-width: 768px) {
        font-size: 0.75rem;
    }
`;

const Separator = styled.span`
    color: rgba(255, 255, 255, 0.4);
    display: flex;
    align-items: center;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const PageTitle = styled.div`
    h1 {
        font-family: 'Cinzel', serif;
        font-size: 3.5rem;
        font-weight: 700;
        color: white;
        text-align: center;
        margin: 0;
        letter-spacing: 2px;
        text-shadow: 
            0 2px 4px rgba(0, 0, 0, 0.3),
            0 4px 8px rgba(0, 0, 0, 0.2),
            0 8px 16px rgba(0, 0, 0, 0.15),
            0 0 30px rgba(255, 255, 255, 0.1);
        line-height: 1.2;
        
        @media (max-width: 968px) {
            font-size: 2.5rem;
            letter-spacing: 1.5px;
        }
        
        @media (max-width: 768px) {
            font-size: 1.8rem;
            letter-spacing: 1px;
        }
    }
`;
