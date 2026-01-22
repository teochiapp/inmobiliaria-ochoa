import React from 'react';
import Slider from 'react-slick';
import HeroSlide from './HeroSlide';
import { HeroContainer } from './Hero.styles';

const Hero = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        fade: true,
        cssEase: 'ease-in-out',
    };

    const slides = [
        {
            id: 1,
            backgroundImage: '/src/public/hero.png',
            title: 'Mirador del Lago',
            subtitle: 'El mejor lugar para comprar tu lote y vivir en el paraíso',
        },
        {
            id: 2,
            backgroundImage: '/src/public/hero.png',
            title: 'Mirador del Lago',
            subtitle: 'El mejor lugar para comprar tu lote y vivir en el paraíso',
        },
        {
            id: 3,
            backgroundImage: '/src/public/hero.png',
            title: 'Mirador del Lago',
            subtitle: 'El mejor lugar para comprar tu lote y vivir en el paraíso',
        },
    ];

    return (
        <HeroContainer>
            <Slider {...settings}>
                {slides.map((slide) => (
                    <HeroSlide
                        key={slide.id}
                        backgroundImage={slide.backgroundImage}
                        title={slide.title}
                        subtitle={slide.subtitle}
                    />
                ))}
            </Slider>
        </HeroContainer>
    );
};

export default Hero;
