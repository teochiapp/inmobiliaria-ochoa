import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import AboutUs from './pages/AboutUs/AboutUs';
import PropertiesForSale from './pages/PropertiesForSale/PropertiesForSale';
import Rentals from './pages/Rentals/Rentals';

import Contact from './pages/Contact/Contact';
import PropertyDetail from './pages/PropertyDetail/PropertyDetail';
import ZoneProperties from './pages/ZoneProperties/ZoneProperties';
import ScrollToTop from './components/common/ScrollToTop';

function App() {
    return (
        <Router>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sobre-nosotros" element={<AboutUs />} />
                <Route path="/propiedades-venta" element={<PropertiesForSale />} />
                <Route path="/alquileres" element={<Rentals />} />

                <Route path="/contacto" element={<Contact />} />

                {/* Ruta de propiedades por zona */}
                <Route path="/zona/:id" element={<ZoneProperties />} />

                {/* Rutas de detalles de propiedades */}
                <Route path="/propiedad/venta/:id" element={<PropertyDetail type="venta" />} />
                <Route path="/propiedad/alquiler/:id" element={<PropertyDetail type="alquiler" />} />
            </Routes>
        </Router>
    );
}

export default App;
