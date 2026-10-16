import emailjs from '@emailjs/browser';

// Envío de formularios por EmailJS (mismas variables y plantilla que ya usaba el sitio).
// Variables de entorno necesarias:
//   REACT_APP_EMAILJS_SERVICE_ID, REACT_APP_EMAILJS_TEMPLATE_ID, REACT_APP_EMAILJS_PUBLIC_KEY
const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

export const emailEnabled = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

export const sendContactEmail = ({ name, email, phone, message, originPage, propertyName }) =>
    emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
            from_name: name,
            from_email: email,
            phone,
            message,
            origin_page: originPage || 'Página de Contacto',
            origin_url: window.location.href,
            property_name: propertyName || 'N/A',
        },
        PUBLIC_KEY
    );

export const isValidEmail = (value) => /\S+@\S+\.\S+/.test(value);
