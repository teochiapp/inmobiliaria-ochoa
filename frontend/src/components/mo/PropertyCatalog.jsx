import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Icon from './Icon';
import PropertyCard, { cardOperation } from './PropertyCard';
import { usePropertyFilter } from '../../hooks/usePropertyFilter';

const ITEMS_PER_PAGE = 12;
const BED_OPTIONS = [
    { value: 'any', label: 'Todas' },
    { value: '1', label: '1+' },
    { value: '2', label: '2+' },
    { value: '3', label: '3+' },
    { value: '4', label: '4+' },
    { value: '5', label: '5+' },
];
const BATH_OPTIONS = [
    { value: 'any', label: 'Todos' },
    { value: '1', label: '1+' },
    { value: '2', label: '2+' },
    { value: '3', label: '3+' },
    { value: '4', label: '4+' },
];
const M2_OPTIONS = [
    { value: 'any', label: 'Cualquiera' },
    { value: '50', label: '50 m² o más' },
    { value: '100', label: '100 m² o más' },
    { value: '300', label: '300 m² o más' },
    { value: '500', label: '500 m² o más' },
    { value: '1000', label: '1.000 m² o más' },
];
const priceOf = (p) => {
    const n = parseInt(String(p.precio || '').replace(/[^0-9]/g, ''), 10);
    return Number.isNaN(n) ? null : n;
};
const SORTS = {
    recent: (a, b) => new Date(b.createdAt || b.publishedAt || 0) - new Date(a.createdAt || a.publishedAt || 0) || b.id - a.id,
    priceAsc: (a, b) => (priceOf(a) ?? Infinity) - (priceOf(b) ?? Infinity),
    priceDesc: (a, b) => (priceOf(b) ?? -1) - (priceOf(a) ?? -1),
    area: (a, b) => (b.m2 || 0) - (a.m2 || 0),
};

const pageList = (current, total) => {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    const pages = [1];
    if (current > 3) pages.push('…');
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i += 1) pages.push(i);
    if (current < total - 2) pages.push('…');
    pages.push(total);
    return pages;
};

const Filters = ({ idPrefix, filters, onChange, onReset, onDone, doneLabel, inline }) => (
    <div
        className="mo-filters"
        aria-label="Filtros"
        style={inline ? { position: 'static', marginBottom: 28, animation: 'mo-fadeup .5s cubic-bezier(.22,.8,.2,1) both' } : undefined}
    >
        <div className="mo-filters-head">
            <b>Filtros</b>
            <button type="button" onClick={onReset}>
                Limpiar
            </button>
        </div>
        <div className="mo-fgroup">
            <label htmlFor={`${idPrefix}-loc`}>Ubicación</label>
            <div className="mo-input">
                <Icon name="search" />
                <input id={`${idPrefix}-loc`} type="text" name="name" value={filters.name} onChange={onChange} placeholder="Buscar por ubicación…" />
            </div>
        </div>
        <div className="mo-fgroup">
            <span>Precio</span>
            <div className="mo-range">
                <div className="mo-input mo-input--plain">
                    <input type="number" min="0" name="minPrice" value={filters.minPrice} onChange={onChange} placeholder="Mínimo" aria-label="Precio mínimo" />
                </div>
                <div className="mo-input mo-input--plain">
                    <input type="number" min="0" name="maxPrice" value={filters.maxPrice} onChange={onChange} placeholder="Máximo" aria-label="Precio máximo" />
                </div>
            </div>
        </div>
        <div className="mo-fgroup">
            <span>Habitaciones</span>
            <div className="mo-pills">
                {BED_OPTIONS.map((o) => (
                    <button
                        key={o.value}
                        type="button"
                        className={`mo-pill${filters.beds === o.value ? ' is-on' : ''}`}
                        aria-pressed={filters.beds === o.value}
                        onClick={() => onChange({ target: { name: 'beds', value: o.value } })}
                    >
                        {o.label}
                    </button>
                ))}
            </div>
        </div>
        <div className="mo-fgroup">
            <span>Baños</span>
            <div className="mo-pills">
                {BATH_OPTIONS.map((o) => (
                    <button
                        key={o.value}
                        type="button"
                        className={`mo-pill${filters.baths === o.value ? ' is-on' : ''}`}
                        aria-pressed={filters.baths === o.value}
                        onClick={() => onChange({ target: { name: 'baths', value: o.value } })}
                    >
                        {o.label}
                    </button>
                ))}
            </div>
        </div>
        <div className="mo-fgroup">
            <label htmlFor={`${idPrefix}-m2`}>Superficie total</label>
            <div className="mo-input mo-input--plain">
                <select id={`${idPrefix}-m2`} name="m2" value={filters.m2} onChange={onChange}>
                    {M2_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                            {o.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
        <button type="button" className="mo-btn mo-btn--navy" onClick={onDone}>
            {doneLabel}
        </button>
    </div>
);

/**
 * Catálogo con filtros, orden y paginación.
 * operation: 'Venta' | 'Alquiler' (si la propiedad trae `type`, se usa ese)
 * baseUrl: '/propiedad/venta' | '/propiedad/alquiler' (o property.baseUrl)
 */
const PropertyCatalog = ({ properties = [], loading, error, operation = 'Venta', baseUrl = '', countLabel = 'propiedades encontradas', withFilters = true }) => {
    const [params] = useSearchParams();
    // Filtros iniciales desde la URL (?ubicacion=&hab=&max=) — vienen del buscador del inicio
    const [initial] = useState(() => ({
        ...(params.get('ubicacion') ? { name: params.get('ubicacion') } : {}),
        ...(params.get('hab') ? { beds: params.get('hab') } : {}),
        ...(params.get('max') ? { maxPrice: params.get('max') } : {}),
    }));
    const { filters, handleFilterChange, resetFilters, filteredProperties } = usePropertyFilter(properties, initial);
    const [sort, setSort] = useState('recent');
    const [page, setPage] = useState(1);
    const [mobileFilters, setMobileFilters] = useState(false);

    const sorted = useMemo(() => [...filteredProperties].sort(SORTS[sort]), [filteredProperties, sort]);
    const totalPages = Math.max(1, Math.ceil(sorted.length / ITEMS_PER_PAGE));
    const visible = sorted.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    useEffect(() => setPage(1), [filters, sort]);

    const goTo = (p) => {
        setPage(p);
        document.getElementById('resultados')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const linkFor = (p) => `${p.baseUrl || baseUrl}/${p.id}`;

    return (
        <section className="mo-sec mo-sec--tight mo-sec--ivory" style={{ scrollMarginTop: 96 }}>
            <div className={withFilters ? 'mo-wrap mo-cat' : 'mo-wrap'}>
                {withFilters && (
                    <Filters
                        idPrefix="f"
                        filters={filters}
                        onChange={handleFilterChange}
                        onReset={resetFilters}
                        onDone={() => goTo(1)}
                        doneLabel="Ver resultados"
                    />
                )}

                <div id="resultados" style={{ scrollMarginTop: 110 }}>
                    <div className="mo-cat-bar">
                        <p>
                            <b>{loading ? '…' : sorted.length}</b> {countLabel}
                        </p>
                        <div className="mo-cat-tools">
                            {withFilters && (
                                <button
                                    type="button"
                                    className="mo-btn mo-btn--line mo-btn--sm mo-ftoggle"
                                    aria-expanded={mobileFilters}
                                    onClick={() => setMobileFilters((v) => !v)}
                                >
                                    <Icon name="filter" />
                                    Filtros
                                </button>
                            )}
                            <div className="mo-input mo-input--plain mo-sort">
                                <select aria-label="Ordenar" value={sort} onChange={(e) => setSort(e.target.value)}>
                                    <option value="recent">Más recientes</option>
                                    <option value="priceAsc">Menor precio</option>
                                    <option value="priceDesc">Mayor precio</option>
                                    <option value="area">Mayor superficie</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {withFilters && mobileFilters && (
                        <Filters
                            idPrefix="m"
                            inline
                            filters={filters}
                            onChange={handleFilterChange}
                            onReset={resetFilters}
                            onDone={() => setMobileFilters(false)}
                            doneLabel={`Ver ${sorted.length} resultados`}
                        />
                    )}

                    {loading && (
                        <div className="mo-cards mo-cards--stack" style={{ gap: 28 }}>
                            {[0, 1, 2].map((i) => (
                                <div key={i} className="mo-skel" />
                            ))}
                        </div>
                    )}
                    {!loading && error && <p className="mo-state">No pudimos cargar las propiedades. Probá de nuevo en unos minutos.</p>}
                    {!loading && !error && sorted.length === 0 && (
                        <div className="mo-state">
                            <p>No encontramos propiedades que coincidan con los filtros.</p>
                            {withFilters && (
                                <button type="button" className="mo-btn mo-btn--line mo-btn--sm" style={{ marginTop: 20 }} onClick={resetFilters}>
                                    Limpiar filtros
                                </button>
                            )}
                        </div>
                    )}
                    {!loading && !error && sorted.length > 0 && (
                        <div className="mo-cards mo-cards--stack" style={{ gap: 28 }}>
                            {visible.map((p) => (
                                <PropertyCard key={`${p.type || operation}-${p.id}`} property={p} to={linkFor(p)} operation={cardOperation(p, operation)} />
                            ))}
                        </div>
                    )}

                    {!loading && totalPages > 1 && (
                        <nav className="mo-pag" aria-label="Paginación">
                            <button type="button" onClick={() => goTo(page - 1)} disabled={page === 1} aria-label="Página anterior">
                                <Icon name="arrowLeft" />
                            </button>
                            {pageList(page, totalPages).map((p, i) =>
                                p === '…' ? (
                                    <span key={`e${i}`}>…</span>
                                ) : (
                                    <button key={p} type="button" className={p === page ? 'is-on' : ''} aria-current={p === page ? 'page' : undefined} onClick={() => goTo(p)}>
                                        {p}
                                    </button>
                                )
                            )}
                            <button type="button" onClick={() => goTo(page + 1)} disabled={page === totalPages} aria-label="Página siguiente">
                                <Icon name="arrow" />
                            </button>
                        </nav>
                    )}
                </div>
            </div>
        </section>
    );
};

export default PropertyCatalog;
