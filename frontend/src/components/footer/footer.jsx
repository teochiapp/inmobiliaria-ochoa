import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Phone, Clock, Mail, MapPin } from 'lucide-react';
import { FaWhatsapp } from "react-icons/fa";
import useZones from '../../hooks/useZones';
import logo from '../../public/logo.png';
import {
    FooterContainer,
    FooterContent,
    FooterColumn,
    FooterBrand,
    Logo,
    SocialIcons,
    ColumnTitle,
    FooterLinks,
    WorkHours,
    CallButton,
    Copyright
} from './Footer.styles';

const Footer = () => {
    const { zones, loading } = useZones();

    return (
        <FooterContainer>
            <FooterContent>
                {/* Brand Section */}
                <FooterBrand>
                    <Logo>
                        <img src={logo} alt="Inmobiliaria Ochoa" />
                    </Logo>
                    <p>
                        15 años hablando de oportunidades.
                        Comprometidos con ayudarte a encontrar el hogar de tus sueños.
                    </p>
                    <SocialIcons>
                        <a href="https://www.facebook.com/inmobiliariamarinochoa/?locale=es_LA" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={20} /></a>
                        <a href="https://www.instagram.com/marinochoainmobiliaria/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={20} /></a>
                        <a href="https://www.youtube.com/channel/UCA_HFMO1a5KJD-pNp-6nToQ" target="_blank" rel="noopener noreferrer" aria-label="Youtube"><Youtube size={20} /></a>
                        <a href="mailto:franco@marinochoa.com.ar" aria-label="Email"><Mail size={20} /></a>
                        <a href="https://api.whatsapp.com/send/?phone=5493571520528&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                            <FaWhatsapp size={20} />
                        </a>
                    </SocialIcons>
                </FooterBrand>

                {/* Navigation */}
                <FooterColumn>
                    <ColumnTitle>Navegación</ColumnTitle>
                    <FooterLinks>
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/propiedades-venta">Propiedades</Link></li>
                        <li><Link to="/alquileres">Alquileres</Link></li>
                        <li><Link to="/sobre-nosotros">Sobre Nosotros</Link></li>
                        <li><Link to="/contacto">Contacto</Link></li>
                    </FooterLinks>
                </FooterColumn>

                <FooterColumn>
                    <ColumnTitle>Zonas</ColumnTitle>
                    <FooterLinks>
                        {!loading && zones && zones.map((zone) => (
                            <li key={zone.documentId || zone.id}>
                                <Link to={`/zona/${zone.Slug || zone.slug || zone.documentId || zone.id}`}>
                                    {zone.title}
                                </Link>
                            </li>
                        ))}
                        {loading && <li>Cargando zonas...</li>}
                    </FooterLinks>
                </FooterColumn>


                {/* Work Hours & Contact */}
                <FooterColumn>
                    <ColumnTitle>Contacto y Horarios</ColumnTitle>
                    <WorkHours>
                        <div className="time">
                            <Clock size={18} />
                            <div>
                                <p style={{ margin: 0 }}>Lun - Vie. 09 a 12:00hs. Y 17 a 18:30hs.</p>
                            </div>
                        </div>


                        <div className="time">
                            <Mail size={18} />
                            <a href="mailto:franco@marinochoa.com.ar" style={{ color: 'inherit', textDecoration: 'none' }}>franco@marinochoa.com.ar</a>
                        </div>

                        <CallButton href="https://wa.me/5493571520528" target="_blank">
                            <Phone size={18} />
                            54 9 3571 52-0528
                        </CallButton>
                    </WorkHours>
                </FooterColumn>
            </FooterContent>

            <Copyright>
                <span>&copy; {new Date().getFullYear()} Inmobiliaria Marin Ochoa. Todos los derechos reservados.</span>
                <a href="https://surcodes.com" target="_blank" rel="noopener noreferrer" aria-label="SurCodes"><span>Desarrollado por <strong>SurCodes</strong></span></a>
            </Copyright>
        </FooterContainer>
    );
};

export default Footer;
