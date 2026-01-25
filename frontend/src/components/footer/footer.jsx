import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Phone, Clock, Mail, MapPin } from 'lucide-react';
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
    return (
        <FooterContainer>
            <FooterContent>
                {/* Brand Section */}
                <FooterBrand>
                    <Logo>
                        {/* <img src="/logo.png" alt="Inmobiliaria Ochoa" /> */}
                        Marin<span>Ochoa</span>
                    </Logo>
                    <p>
                        Comprometidos con ayudarte a encontrar el hogar de tus sueños.
                        Ofrecemos las mejores propiedades en las ubicaciones más exclusivas
                        de Baja California Sur.
                    </p>
                    <SocialIcons>
                        <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
                        <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
                        <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
                        <a href="#" aria-label="Youtube"><Youtube size={20} /></a>
                    </SocialIcons>
                </FooterBrand>

                {/* Navigation */}
                <FooterColumn>
                    <ColumnTitle>Navegación</ColumnTitle>
                    <FooterLinks>
                        <li><a href="/">Inicio</a></li>
                        <li><a href="/propiedades-venta">Propiedades</a></li>
                        <li><a href="/sobre-nosotros">Sobre Nosotros</a></li>
                        <li><a href="/servicios">Servicios</a></li>
                        <li><a href="/contacto">Contacto</a></li>
                    </FooterLinks>
                </FooterColumn>

                {/* Quick Links */}
                <FooterColumn>
                    <ColumnTitle>Enlaces Rápidos</ColumnTitle>
                    <FooterLinks>
                        <li><a href="#">Preguntas Frecuentes</a></li>
                        <li><a href="#">Blog Inmobiliario</a></li>
                        <li><a href="#">Términos y Condiciones</a></li>
                        <li><a href="#">Política de Privacidad</a></li>
                        <li><a href="#">Mapa del Sitio</a></li>
                    </FooterLinks>
                </FooterColumn>

                {/* Work Hours & Contact */}
                <FooterColumn>
                    <ColumnTitle>Horario de Atención</ColumnTitle>
                    <WorkHours>
                        <div className="time">
                            <Clock size={18} />
                            7 AM - 5 PM, Lun - Sab
                        </div>
                        <p>
                            Nuestro equipo está disponible para atenderte en horario de oficina.
                            ¡Agenda tu visita hoy mismo!
                        </p>
                        <CallButton href="tel:+1234567890">
                            <Phone size={18} />
                            Llamar Ahora
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
