import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useZones from '../../../hooks/useZones';
import {
    RentSection,
    SliderContainer,
    SliderButton,
    SlidesWrapper,
    Slides,
    Slide,
    SlideInner,
    SlideImageWrapper,
    SlideImage,
    SlideBg,
    SlidesInfos,
    SlideInfo,
    SlideInfoInner,
    SlideInfoTextWrapper,
    SlideInfoText,
} from './zones.styles';

const lerp = (a, b, t) => a + (b - a) * t;

const Zones = () => {
    const { zones, loading } = useZones();
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [rotDeg, setRotDeg] = useState({ current: { x: 0, y: 0 }, target: { x: 0, y: 0 } });
    const [bgPos, setBgPos] = useState({ current: { x: 0, y: 0 }, target: { x: 0, y: 0 } });
    const slideRefs = useRef([]);
    const rafRef = useRef(null);

    const totalSlides = zones ? zones.length : 0;

    const getSlideState = (index) => {
        if (totalSlides === 0) return 'hidden';
        const diff = (index - currentIndex + totalSlides) % totalSlides;
        if (diff === 0) return 'current';
        if (diff === 1) return 'next';
        if (diff === totalSlides - 1) return 'previous';
        return 'hidden';
    };

    const handlePrev = () => {
        if (totalSlides > 0) {
            setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
        }
    };

    const handleNext = () => {
        if (totalSlides > 0) {
            setCurrentIndex((prev) => (prev + 1) % totalSlides);
        }
    };

    const handleMouseMove = (e, index) => {
        if (getSlideState(index) !== 'current') return;

        const rect = e.currentTarget.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;

        const ox = (offsetX - rect.width * 0.5) / (Math.PI * 3);
        const oy = -(offsetY - rect.height * 0.5) / (Math.PI * 4);

        setRotDeg(prev => ({ ...prev, target: { x: ox, y: oy } }));
        setBgPos(prev => ({ ...prev, target: { x: -ox * 0.3, y: oy * 0.3 } }));
    };

    const handleMouseLeave = () => {
        setRotDeg(prev => ({ ...prev, target: { x: 0, y: 0 } }));
        setBgPos(prev => ({ ...prev, target: { x: 0, y: 0 } }));
    };

    useEffect(() => {
        if (totalSlides === 0) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % totalSlides);
        }, 5000);
        return () => clearInterval(interval);
    }, [currentIndex, totalSlides]);

    useEffect(() => {
        const animate = () => {
            setRotDeg(prev => ({
                current: {
                    x: lerp(prev.current.x, prev.target.x, 0.1),
                    y: lerp(prev.current.y, prev.target.y, 0.1)
                },
                target: prev.target
            }));

            setBgPos(prev => ({
                current: {
                    x: lerp(prev.current.x, prev.target.x, 0.1),
                    y: lerp(prev.current.y, prev.target.y, 0.1)
                },
                target: prev.target
            }));

            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, []);

    if (loading) {
        return (
            <RentSection>
                <div style={{ textAlign: 'center', padding: '2rem', color: 'white' }}>Cargando zonas...</div>
            </RentSection>
        );
    }

    if (!zones || zones.length === 0) return null;

    return (
        <RentSection>
            <SliderContainer>
                <SliderButton onClick={handlePrev} aria-label="Previous slide">
                    <ChevronLeft />
                </SliderButton>

                <SlidesWrapper>
                    <Slides>
                        {zones.map((property, index) => {
                            const state = getSlideState(index);
                            const isCurrent = state === 'current';

                            return (
                                <React.Fragment key={property.id}>
                                    <Slide
                                        ref={(el) => (slideRefs.current[index] = el)}
                                        data-state={state}
                                        onMouseMove={(e) => handleMouseMove(e, index)}
                                        onMouseLeave={handleMouseLeave}
                                        onClick={() => {
                                            if (state === 'current') {
                                                // Use documentId for Strapi v5 compatibility
                                                navigate(`/zona/${property.documentId || property.id}`);
                                            } else {
                                                setCurrentIndex(index);
                                            }
                                        }}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <SlideInner
                                            style={{
                                                '--rotX': isCurrent ? `${rotDeg.current.y}deg` : '0deg',
                                                '--rotY': isCurrent ? `${rotDeg.current.x}deg` : '0deg',
                                                '--bgPosX': isCurrent ? `${bgPos.current.x}%` : '0%',
                                                '--bgPosY': isCurrent ? `${bgPos.current.y}%` : '0%',
                                            }}
                                        >
                                            <SlideImageWrapper>
                                                <SlideImage src={property.image} alt={property.title} />
                                            </SlideImageWrapper>
                                        </SlideInner>
                                    </Slide>
                                    <SlideBg
                                        data-state={state}
                                        $bgImage={property.image}
                                    />
                                </React.Fragment>
                            );
                        })}
                    </Slides>

                    <SlidesInfos>
                        {zones.map((property, index) => {
                            const state = getSlideState(index);
                            const isCurrent = state === 'current';

                            return (
                                <SlideInfo key={`info-${property.id}`} data-state={state}>
                                    <SlideInfoInner
                                        style={{
                                            '--rotX': isCurrent ? `${rotDeg.current.y}deg` : '0deg',
                                            '--rotY': isCurrent ? `${rotDeg.current.x}deg` : '0deg',
                                        }}
                                    >
                                        <SlideInfoTextWrapper>
                                            <SlideInfoText data-title>
                                                <span>{property.title}</span>
                                            </SlideInfoText>
                                            <SlideInfoText data-subtitle>
                                                <span>{property.subtitle}</span>
                                            </SlideInfoText>
                                            <SlideInfoText data-description>
                                                <span>{property.description}</span>
                                            </SlideInfoText>
                                        </SlideInfoTextWrapper>
                                    </SlideInfoInner>
                                </SlideInfo>
                            );
                        })}
                    </SlidesInfos>
                </SlidesWrapper>

                <SliderButton onClick={handleNext} aria-label="Next slide">
                    <ChevronRight />
                </SliderButton>
            </SliderContainer>
        </RentSection>
    );
};

export default Zones;
