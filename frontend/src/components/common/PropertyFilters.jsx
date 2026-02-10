import React, { useState, useRef, useEffect } from 'react';
import { Search, DollarSign, Bed, Bath, ChevronDown, Ruler, SlidersHorizontal, X } from 'lucide-react';
import {
    FilterContainer,
    FilterInput
} from '../home/sales/SalesSection.styles';

const InputWrapper = ({ children, icon: Icon }) => (
    <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
        <Icon
            size={18}
            color="#2B2E4B"
            style={{ position: 'absolute', left: '15px', zIndex: 1, pointerEvents: 'none' }}
        />
        {children}
    </div>
);

const CustomSelect = ({ value, onChange, options, icon: Icon, placeholder, name, isMobile }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (optionValue) => {
        onChange({ target: { name, value: optionValue } });
        setIsOpen(false);
    };

    const selectedLabel = options.find(opt => opt.value === value)?.label || placeholder;

    return (
        <div ref={dropdownRef} style={{ position: 'relative', flex: 1, minWidth: '160px' }}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    padding: isMobile ? '0.6rem 1rem 0.6rem 2.8rem' : '0.8rem 1rem 0.8rem 2.8rem', // Padding left for icon
                    border: '1.5px solid #e0e0e0',
                    borderRadius: '50px',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontFamily: 'var(--text-font)',
                    fontSize: '0.95rem',
                    color: value === 'any' ? '#666' : 'var(--text-dark)',
                    transition: 'all 0.3s ease',
                    boxShadow: isOpen ? '0 0 0 2px rgba(0, 51, 102, 0.1)' : '0 2px 5px rgba(0,0,0,0.02)',
                    borderColor: isOpen ? 'var(--brand-blue)' : '#e0e0e0'
                }}
            >
                {/* Icon Left */}
                <Icon
                    size={18}
                    color="#2B2E4B"
                    style={{ position: 'absolute', left: '15px', pointerEvents: 'none' }}
                />

                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {selectedLabel}
                </span>

                <ChevronDown size={16} color="#2B2E4B" style={{ marginLeft: '10px' }} />
            </div>

            {isOpen && (
                <div style={{
                    position: 'absolute',
                    top: '110%',
                    left: 0,
                    width: '100%',
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    border: '1px solid #eee',
                    zIndex: 100,
                    overflow: 'hidden',
                    padding: '0.5rem'
                }}>
                    {options.map((option) => (
                        <div
                            key={option.value}
                            onClick={() => handleSelect(option.value)}
                            style={{
                                padding: '0.6rem 1rem',
                                cursor: 'pointer',
                                borderRadius: '8px',
                                fontSize: '0.9rem',
                                color: value === option.value ? 'var(--brand-blue)' : '#444',
                                backgroundColor: value === option.value ? '#f0f4f8' : 'transparent',
                                transition: 'background-color 0.2s',
                                fontWeight: value === option.value ? '600' : '400'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = value === option.value ? '#f0f4f8' : '#f9f9f9'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = value === option.value ? '#f0f4f8' : 'transparent'}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const MobileFilterToggle = ({ onClick }) => (
    <div
        onClick={onClick}
        style={{
            display: 'none', // Hidden on desktop by default
            justifyContent: 'center',
            alignItems: 'center',
            width: '45px',
            height: '45px',
            backgroundColor: 'white',
            border: '1.5px solid #e0e0e0',
            borderRadius: '50%',
            cursor: 'pointer',
            position: 'fixed',
            top: 'calc(80px + 2rem)', // Below header
            right: '1rem',
            margin: 0,
            zIndex: 1000,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            color: 'var(--brand-blue)'
        }}
        className="mobile-filter-btn"
    >
        <SlidersHorizontal size={22} color="#2B2E4B" />
    </div>
);

const PropertyFilters = ({ filters, onFilterChange, layout = 'horizontal' }) => {
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const bedOptions = [
        { value: 'any', label: 'Habitaciones' },
        { value: '1', label: '1+' },
        { value: '2', label: '2+' },
        { value: '3', label: '3+' },
        { value: '4', label: '4+' },
        { value: '5', label: '5+' }
    ];

    const bathOptions = [
        { value: 'any', label: 'Baños' },
        { value: '1', label: '1+' },
        { value: '2', label: '2+' },
        { value: '3', label: '3+' },
        { value: '4', label: '4+' }
    ];

    const m2Options = [
        { value: 'any', label: 'm² Total' },
        { value: '20', label: '20+ m²' },
        { value: '50', label: '50+ m²' },
        { value: '100', label: '100+ m²' },
        { value: '300', label: '300+ m²' },
        { value: '500', label: '500+ m²' },
        { value: '1000', label: '1000+ m²' }
    ];

    useEffect(() => {
        if (isMobile && showMobileFilters) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; }
    }, [isMobile, showMobileFilters]);

    // Pipe separator component
    const PipeSeparator = () => (
        <div style={{
            width: '1px',
            height: '40px',
            backgroundColor: '#e0e0e0',
            margin: '0 0.5rem'
        }} />
    );

    // Determine container style based on layout and mobile state
    const containerStyle = isMobile ? {
        display: showMobileFilters ? 'flex' : 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        zIndex: 2000,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: '2rem',
        overflowY: 'auto',
        gap: '1rem'
    } : layout === 'sidebar' ? {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '16px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
        border: '1px solid #eee'
    } : {
        // Horizontal layout (original for Home)
        display: 'flex',
        flexDirection: 'row',
        gap: '0rem',
        flexWrap: 'wrap',
        alignItems: 'center',
        margin: '0 auto 2rem auto',
        width: '100%',
        maxWidth: '1400px'
    };

    return (
        <>
            <style>
                {`
                    @media (max-width: 768px) {
                        .mobile-filter-btn { display: flex !important; }
                    }
                `}
            </style>

            <MobileFilterToggle onClick={() => setShowMobileFilters(true)} />

            <FilterContainer style={containerStyle}>
                {isMobile && (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1.5rem',
                        marginTop: '8vh',
                        paddingBottom: '1rem',
                        borderBottom: '2px solid #e0e0e0',
                        width: '100%'
                    }}>
                        <h3 style={{
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            margin: 0,
                            color: 'var(--brand-blue)'
                        }}>Filtros</h3>
                        <div
                            onClick={() => setShowMobileFilters(false)}
                            style={{
                                cursor: 'pointer',
                                padding: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '50%',
                                backgroundColor: '#f5f5f5',
                                transition: 'all 0.3s ease',
                                width: '40px',
                                height: '40px'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'var(--brand-red)';
                                e.currentTarget.querySelector('svg').style.color = 'white';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#f5f5f5';
                                e.currentTarget.querySelector('svg').style.color = '#2B2E4B';
                            }}
                        >
                            <X size={24} color="#2B2E4B" strokeWidth={2.5} />
                        </div>
                    </div>
                )}

                <div style={{ width: (layout === 'sidebar' || isMobile) ? '100%' : 'auto', flex: (layout === 'sidebar' || isMobile) ? 'none' : 2, minWidth: (layout === 'sidebar' || isMobile) ? 'auto' : '200px' }}>
                    <InputWrapper icon={Search}>
                        <FilterInput
                            type="text"
                            placeholder="Buscar por ubicación..."
                            name="name"
                            value={filters.name}
                            onChange={onFilterChange}
                            style={{ paddingLeft: '40px', width: '100%' }}
                        />
                    </InputWrapper>
                </div>

                {layout === 'horizontal' && !isMobile && <PipeSeparator />}

                <div style={{
                    display: 'flex',
                    flexDirection: (layout === 'sidebar' && !isMobile) ? 'column' : 'row',
                    gap: isMobile ? '1rem' : '0.5rem',
                    width: (layout === 'sidebar' || isMobile) ? '100%' : 'auto',
                    flex: (layout === 'sidebar' || isMobile) ? 'none' : 2,
                    minWidth: (layout === 'sidebar' || isMobile) ? 'auto' : '240px'
                }}>
                    <InputWrapper icon={DollarSign}>
                        <FilterInput
                            type="number"
                            placeholder="Mín"
                            name="minPrice"
                            value={filters.minPrice}
                            onChange={onFilterChange}
                            style={{ paddingLeft: '35px', width: '100%', minWidth: (layout === 'sidebar' || isMobile) ? 'auto' : '100px' }}
                        />
                    </InputWrapper>

                    <InputWrapper icon={DollarSign}>
                        <FilterInput
                            type="number"
                            placeholder="Máx"
                            name="maxPrice"
                            value={filters.maxPrice}
                            onChange={onFilterChange}
                            style={{ paddingLeft: '35px', width: '100%', minWidth: (layout === 'sidebar' || isMobile) ? 'auto' : '100px' }}
                        />
                    </InputWrapper>
                </div>

                {layout === 'horizontal' && !isMobile && <PipeSeparator />}

                {isMobile ? (
                    <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
                        <div style={{ flex: 1 }}>
                            <CustomSelect
                                name="beds"
                                value={filters.beds}
                                onChange={onFilterChange}
                                options={bedOptions}
                                icon={Bed}
                                placeholder="Habitaciones"
                                isMobile={isMobile}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <CustomSelect
                                name="baths"
                                value={filters.baths}
                                onChange={onFilterChange}
                                options={bathOptions}
                                icon={Bath}
                                placeholder="Baños"
                                isMobile={isMobile}
                            />
                        </div>
                    </div>
                ) : (
                    <>
                        <div style={{ width: layout === 'sidebar' ? '100%' : 'auto', flex: layout === 'sidebar' ? 'none' : 1 }}>
                            <CustomSelect
                                name="beds"
                                value={filters.beds}
                                onChange={onFilterChange}
                                options={bedOptions}
                                icon={Bed}
                                placeholder="Habitaciones"
                                isMobile={isMobile}
                            />
                        </div>

                        {layout === 'horizontal' && !isMobile && <PipeSeparator />}

                        <div style={{ width: layout === 'sidebar' ? '100%' : 'auto', flex: layout === 'sidebar' ? 'none' : 1 }}>
                            <CustomSelect
                                name="baths"
                                value={filters.baths}
                                onChange={onFilterChange}
                                options={bathOptions}
                                icon={Bath}
                                placeholder="Baños"
                                isMobile={isMobile}
                            />
                        </div>
                    </>
                )}

                {layout === 'horizontal' && !isMobile && <PipeSeparator />}

                <div style={{ width: (layout === 'sidebar' || isMobile) ? '100%' : 'auto', flex: (layout === 'sidebar' || isMobile) ? 'none' : 1 }}>
                    <CustomSelect
                        name="m2"
                        value={filters.m2}
                        onChange={onFilterChange}
                        options={m2Options}
                        icon={Ruler}
                        placeholder="m²"
                        isMobile={isMobile}
                    />
                </div>

                {isMobile && (
                    <button
                        onClick={() => setShowMobileFilters(false)}
                        style={{
                            marginTop: '1.5rem',
                            padding: '1rem',
                            backgroundColor: 'var(--brand-blue)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50px',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            width: '100%'
                        }}
                    >
                        Ver resultados
                    </button>
                )}
            </FilterContainer>
        </>
    );
};

export default PropertyFilters;
