import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Icon from './Icon';
import { SIZES } from '../../services/media';

const pad = (n) => String(n).padStart(2, '0');

const GridIcon = () => (
    <svg className="mo-ic" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="4" width="7" height="7" />
        <rect x="13" y="4" width="7" height="7" />
        <rect x="4" y="13" width="7" height="7" />
        <rect x="13" y="13" width="7" height="7" />
    </svg>
);

// Detecta un swipe horizontal (dedo o mouse) y llama a onPrev / onNext
const useSwipe = (onPrev, onNext) => {
    const start = useRef(null);
    return {
        onPointerDown: (e) => {
            start.current = { x: e.clientX, y: e.clientY };
        },
        onPointerUp: (e) => {
            if (!start.current) return;
            const dx = e.clientX - start.current.x;
            const dy = e.clientY - start.current.y;
            start.current = null;
            if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) (dx > 0 ? onPrev : onNext)();
        },
    };
};

// Visor a pantalla completa
const Lightbox = ({ images, index, setIndex, onClose, title }) => {
    const stripRef = useRef(null);
    const total = images.length;
    const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [setIndex, total]);
    const next = useCallback(() => setIndex((i) => (i + 1) % total), [setIndex, total]);
    const swipe = useSwipe(prev, next);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
        };
        window.addEventListener('keydown', onKey);
        document.body.classList.add('mo-lock');
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.classList.remove('mo-lock');
        };
    }, [onClose, prev, next]);

    // Mantiene la miniatura activa visible dentro de la tira (sin mover la página)
    useEffect(() => {
        const strip = stripRef.current;
        const thumb = strip?.children[index];
        if (!strip || !thumb) return;
        const left = thumb.offsetLeft - strip.clientWidth / 2 + thumb.clientWidth / 2;
        strip.scrollTo({ left, behavior: 'smooth' });
    }, [index]);

    // Precarga la anterior y la siguiente
    useEffect(() => {
        [images[(index + 1) % total], images[(index - 1 + total) % total]].forEach((img) => {
            if (img) new Image().src = img.url;
        });
    }, [index, images, total]);

    const current = images[index];

    return createPortal(
        <div className="mo-lb" role="dialog" aria-modal="true" aria-label={`Galería de fotos${title ? ` — ${title}` : ''}`}>
            <div className="mo-lb-top">
                <span className="mo-lb-count">
                    {pad(index + 1)} / {pad(total)}
                </span>
                {title && <span className="mo-lb-title">{title}</span>}
                <button type="button" className="mo-lb-close" onClick={onClose} aria-label="Cerrar galería">
                    <Icon name="close" />
                </button>
            </div>

            <div className="mo-lb-stage" {...swipe}>
                {total > 1 && (
                    <button type="button" className="mo-lb-nav mo-lb-nav--prev" onClick={prev} aria-label="Foto anterior">
                        <Icon name="arrowLeft" />
                    </button>
                )}
                <img key={current.url} src={current.url} srcSet={current.srcSet || undefined} sizes="100vw" alt={current.alt || `${title || 'Foto'} ${index + 1}`} draggable="false" />
                {total > 1 && (
                    <button type="button" className="mo-lb-nav mo-lb-nav--next" onClick={next} aria-label="Foto siguiente">
                        <Icon name="arrow" />
                    </button>
                )}
            </div>

            {total > 1 && (
                <div className="mo-lb-strip" ref={stripRef}>
                    {images.map((img, i) => (
                        <button
                            key={img.url}
                            type="button"
                            className={`mo-lb-thumb${i === index ? ' is-on' : ''}`}
                            onClick={() => setIndex(i)}
                            aria-label={`Ver foto ${i + 1}`}
                            aria-current={i === index ? 'true' : undefined}
                        >
                            <img src={img.url} srcSet={img.srcSet || undefined} sizes={SIZES.thumb} alt="" loading="lazy" decoding="async" />
                        </button>
                    ))}
                </div>
            )}
        </div>,
        document.body
    );
};

/**
 * Galería de fotos.
 * - Escritorio: mosaico (1 grande + hasta 4 chicas) con "Ver las N fotos".
 * - Celular: carrusel deslizable con contador.
 * - Al tocar cualquier foto se abre el visor a pantalla completa (flechas, teclado, swipe y miniaturas).
 * images: [{ url, srcSet, alt }]
 */
const PropertyGallery = ({ images = [], title = '' }) => {
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const [slide, setSlide] = useState(0);
    const trackRef = useRef(null);
    const total = images.length;

    useEffect(() => {
        setIndex(0);
        setSlide(0);
        trackRef.current?.scrollTo({ left: 0 });
    }, [images]);

    if (!total) return null;

    const openAt = (i) => {
        setIndex(i);
        setOpen(true);
    };
    const tiles = images.slice(0, 5);
    const layout = `mo-mosaic mo-mosaic--${Math.min(total, 5)}`;

    const onTrackScroll = (e) => {
        const el = e.currentTarget;
        setSlide(Math.round(el.scrollLeft / Math.max(1, el.clientWidth)));
    };
    const goSlide = (dir) => {
        const el = trackRef.current;
        if (!el) return;
        const target = Math.min(total - 1, Math.max(0, slide + dir));
        el.scrollTo({ left: target * el.clientWidth, behavior: 'smooth' });
    };

    return (
        <div className="mo-gallery">
            {/* Mosaico (escritorio / tablet) */}
            <div className={layout}>
                {tiles.map((img, i) => {
                    const isLast = i === tiles.length - 1 && total > tiles.length;
                    return (
                        <button key={img.url} type="button" className="mo-mosaic-tile" onClick={() => openAt(i)} aria-label={`Ampliar foto ${i + 1} de ${total}`}>
                            <img
                                src={img.url}
                                srcSet={img.srcSet || undefined}
                                sizes={img.srcSet ? (i === 0 ? SIZES.gallery : SIZES.card) : undefined}
                                alt={img.alt || `${title} — foto ${i + 1}`}
                                loading={i === 0 ? 'eager' : 'lazy'}
                                decoding="async"
                            />
                            {isLast && (
                                <span className="mo-mosaic-more">
                                    <b>+{total - tiles.length}</b>
                                    fotos
                                </span>
                            )}
                        </button>
                    );
                })}
                {total > 1 && (
                    <button type="button" className="mo-mosaic-all" onClick={() => openAt(0)}>
                        <GridIcon />
                        Ver las {total} fotos
                    </button>
                )}
            </div>

            {/* Carrusel (celular) */}
            <div className="mo-carousel">
                <div className="mo-carousel-track" ref={trackRef} onScroll={onTrackScroll}>
                    {images.map((img, i) => (
                        <button key={img.url} type="button" className="mo-carousel-slide" onClick={() => openAt(i)} aria-label={`Ampliar foto ${i + 1} de ${total}`}>
                            <img src={img.url} srcSet={img.srcSet || undefined} sizes={img.srcSet ? SIZES.full : undefined} alt={img.alt || `${title} — foto ${i + 1}`} loading={i === 0 ? 'eager' : 'lazy'} decoding="async" draggable="false" />
                        </button>
                    ))}
                </div>
                {total > 1 && (
                    <>
                        <button type="button" className="mo-carousel-nav mo-carousel-nav--prev" onClick={() => goSlide(-1)} aria-label="Foto anterior" disabled={slide === 0}>
                            <Icon name="arrowLeft" />
                        </button>
                        <button type="button" className="mo-carousel-nav mo-carousel-nav--next" onClick={() => goSlide(1)} aria-label="Foto siguiente" disabled={slide >= total - 1}>
                            <Icon name="arrow" />
                        </button>
                        <span className="mo-carousel-count">
                            {pad(slide + 1)} / {pad(total)}
                        </span>
                    </>
                )}
            </div>

            {open && <Lightbox images={images} index={index} setIndex={setIndex} onClose={() => setOpen(false)} title={title} />}
        </div>
    );
};

export default PropertyGallery;
