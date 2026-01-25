import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
    SliderTitle
} from './zones.styles';

// Datos de propiedades - usando las mismas imágenes del CodePen original
const rentProperties = [
    {
        id: 1,
        image: 'https://devloop01.github.io/voyage-slider/images/scotland-mountains.jpg',
        title: 'Highlands',
        subtitle: 'Scotland',
        description: 'The mountains are calling'
    },
    {
        id: 2,
        image: 'https://devloop01.github.io/voyage-slider/images/machu-pichu.jpg',
        title: 'Machu Pichu',
        subtitle: 'Peru',
        description: 'Adventure is never far away'
    },
    {
        id: 3,
        image: 'https://devloop01.github.io/voyage-slider/images/chamonix.jpg',
        title: 'Chamonix',
        subtitle: 'France',
        description: 'Let your dreams come true'
    }
];

const lerp = (a, b, t) => a + (b - a) * t;

const Rent = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [rotDeg, setRotDeg] = useState({ current: { x: 0, y: 0 }, target: { x: 0, y: 0 } });
    const [bgPos, setBgPos] = useState({ current: { x: 0, y: 0 }, target: { x: 0, y: 0 } });
    const slideRefs = useRef([]);
    const rafRef = useRef(null);

    const totalSlides = rentProperties.length;

    const getSlideState = (index) => {
        const diff = (index - currentIndex + totalSlides) % totalSlides;
        if (diff === 0) return 'current';
        if (diff === 1) return 'next';
        if (diff === totalSlides - 1) return 'previous';
        return 'hidden';
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
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

    return (
        <RentSection>
            <SliderContainer>
                <SliderButton onClick={handlePrev} aria-label="Previous slide">
                    <ChevronLeft />
                </SliderButton>

                <SlidesWrapper>
                    <Slides>
                        {rentProperties.map((property, index) => {
                            const state = getSlideState(index);
                            const isCurrent = state === 'current';

                            return (
                                <React.Fragment key={property.id}>
                                    <Slide
                                        ref={(el) => (slideRefs.current[index] = el)}
                                        data-state={state}
                                        onMouseMove={(e) => handleMouseMove(e, index)}
                                        onMouseLeave={handleMouseLeave}
                                        onClick={() => setCurrentIndex(index)}
                                        style={{ cursor: state === 'current' ? 'default' : 'pointer' }}
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
                        {rentProperties.map((property, index) => {
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

export default Rent;
