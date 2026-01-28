import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import AboutUs from './pages/AboutUs/AboutUs';
import PropertiesForSale from './pages/PropertiesForSale/PropertiesForSale';
import Rentals from './pages/Rentals/Rentals';
import News from './pages/News/News';
import Contact from './pages/Contact/Contact';
import PropertyDetail from './pages/PropertyDetail/PropertyDetail';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sobre-nosotros" element={<AboutUs />} />
                <Route path="/propiedades-venta" element={<PropertiesForSale />} />
                <Route path="/alquileres" element={<Rentals />} />
                <Route path="/propiedad/venta/:id" element={<PropertyDetail type="venta" />} />
                <Route path="/propiedad/alquiler/:id" element={<PropertyDetail type="alquiler" />} />
                <Route path="/novedades" element={<News />} />
                <Route path="/contacto" element={<Contact />} />
            </Routes>
        </Router>
    );
}

export default App;
