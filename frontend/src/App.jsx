import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import AboutUs from './pages/AboutUs/AboutUs';
import PropertiesForSale from './pages/PropertiesForSale/PropertiesForSale';
import Rentals from './pages/Rentals/Rentals';

import Contact from './pages/Contact/Contact';
import PropertyDetail from './pages/PropertyDetail/PropertyDetail';
import ZoneProperties from './pages/ZoneProperties/ZoneProperties';
import ZonePropertiesExclusive from './pages/ZoneProperties/ZonePropiertiesExlusive';
import ScrollToTop from './components/common/ScrollToTop';
import FloatingWhatsApp from './components/common/FloatingWhatsApp';
import NotFound from './pages/NotFound/NotFound';

function App() {
    return (
        <Router>
            <ScrollToTop />
            <FloatingWhatsApp />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sobre-nosotros" element={<AboutUs />} />
                <Route path="/propiedades-venta" element={<PropertiesForSale />} />
                <Route path="/alquileres" element={<Rentals />} />
                <Route path="/contacto" element={<Contact />} />

                {/* Ruta de propiedades por zona */}
                <Route path="/zona/:id" element={<ZoneProperties />} />
                <Route path="/propiedades-exclusivas" element={<ZonePropertiesExclusive />} />
                <Route path="/zona-exclusiva/:id" element={<ZonePropertiesExclusive />} />

                {/* Rutas de detalles de propiedades */}
                <Route path="/propiedad/venta/:id" element={<PropertyDetail type="venta" />} />
                <Route path="/propiedad/alquiler/:id" element={<PropertyDetail type="alquiler" />} />

                {/* 404 Not Found - Esta ruta debe estar AL FINAL */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
