import React from 'react';
import { Link } from 'react-router-dom';
import { SIZES } from '../../services/media';

// Héroe de páginas internas.
// crumbs: [{ label, to? }] · title: primera línea · accent: segunda línea en cursiva
const PageHero = ({ image, imageSrcSet, crumbs = [], eyebrow, title, accent, subtitle, meta = [], small = false, style, innerStyle, children }) => (
    <section className={`mo-phero${small ? ' mo-phero--sm' : ''}`} style={style}>
        <div className="mo-phero-bg">{image && <img src={image} srcSet={imageSrcSet || undefined} sizes={imageSrcSet ? SIZES.full : undefined} alt="" fetchpriority="high" />}</div>
        <div className="mo-wrap mo-phero-in" style={innerStyle}>
            {crumbs.length > 0 && (
                <nav className="mo-crumbs" aria-label="Ruta">
                    {crumbs.map((c, i) => (
                        <React.Fragment key={`${c.label}-${i}`}>
                            {i > 0 && <i />}
                            {c.to ? <Link to={c.to}>{c.label}</Link> : <span>{c.label}</span>}
                        </React.Fragment>
                    ))}
                </nav>
            )}
            <div className="mo-phero-row">
                <div>
                    {eyebrow && (
                        <span className="mo-eyebrow mo-eyebrow--light" style={{ marginTop: 28, animation: 'mo-fadeup 1s cubic-bezier(.22,.8,.2,1) .3s both' }}>
                            {eyebrow}
                        </span>
                    )}
                    <h1 className="mo-h1" style={eyebrow ? { marginTop: 18 } : undefined}>
                        <span className="mo-line mo-line-up">
                            <span>{title}</span>
                        </span>
                        {accent && (
                            <span className="mo-line mo-line-up">
                                <span>
                                    <em className="mo-it">{accent}</em>
                                </span>
                            </span>
                        )}
                    </h1>
                    {subtitle && <p className="mo-phero-sub">{subtitle}</p>}
                </div>
                {meta.length > 0 && (
                    <div className="mo-phero-meta">
                        {meta.map((m) => (
                            <div key={m.label}>
                                <b>{m.value}</b>
                                <span>{m.label}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {children}
        </div>
    </section>
);

export default PageHero;
