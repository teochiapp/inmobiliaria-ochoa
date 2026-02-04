import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import logoLargoImg from '../../public/aboutUs/logo-largo.png';

const ContactForm = ({ noBackground = false }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState({ type: '', message: '' });

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio';
        if (!formData.phone.trim()) newErrors.phone = 'El teléfono es obligatorio';
        if (!formData.email.trim()) {
            newErrors.email = 'El email es obligatorio';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'El email no es válido';
        }
        if (!formData.message.trim()) newErrors.message = 'El mensaje no puede estar vacío';

        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clean error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setStatus({ type: 'loading', message: 'Enviando mensaje...' });

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            setStatus({ type: 'success', message: '¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.' });
            setFormData({ name: '', phone: '', email: '', message: '' });
        } catch (error) {
            setStatus({ type: 'error', message: 'Hubo un error al enviar el mensaje. Por favor intenta nuevamente.' });
        }
    };

    return (
        <FormSection $noBackground={noBackground}>
            <RelativeWrapper>
                <Container
                    as={motion.div}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <FormSide>
                        <HeaderDiv>
                            <Title>CONTACTANOS</Title>
                            <Subtitle>Estamos acá para ayudarte con cualquier consulta</Subtitle>
                        </HeaderDiv>

                        <StyledForm onSubmit={handleSubmit} noValidate>
                            <FormGroup>
                                <Label htmlFor="name">Nombre Completo *</Label>
                                <Input
                                    as={motion.input}
                                    whileFocus={{ scale: 1.01 }}
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    $error={errors.name}
                                    placeholder="Ingrese su nombre"
                                />
                                {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="phone">Teléfono *</Label>
                                <Input
                                    as={motion.input}
                                    whileFocus={{ scale: 1.01 }}
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    $error={errors.phone}
                                    placeholder="Ingrese su número"
                                />
                                {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="email">Email *</Label>
                                <Input
                                    as={motion.input}
                                    whileFocus={{ scale: 1.01 }}
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    $error={errors.email}
                                    placeholder="ejemplo@correo.com"
                                />
                                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="message">Mensaje *</Label>
                                <TextArea
                                    as={motion.textarea}
                                    whileFocus={{ scale: 1.01 }}
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    $error={errors.message}
                                    placeholder="¿En qué podemos ayudarle?"
                                    rows="5"
                                />
                                {errors.message && <ErrorMessage>{errors.message}</ErrorMessage>}
                            </FormGroup>

                            <ButtonWrapper>
                                <SubmitButton
                                    as={motion.button}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="submit"
                                    disabled={status.type === 'loading'}
                                >
                                    {status.type === 'loading' ? 'ENVIANDO...' : 'ENVIAR MENSAJE'}
                                </SubmitButton>
                            </ButtonWrapper>

                            {status.message && (
                                <StatusMessage
                                    as={motion.div}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    $type={status.type}
                                >
                                    {status.message}
                                </StatusMessage>
                            )}
                        </StyledForm>
                    </FormSide>
                    <ImageSide
                        as={motion.div}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        <img src={logoLargoImg} alt="Logo Inmobiliaria Ochoa" />
                    </ImageSide>
                </Container>
            </RelativeWrapper>
        </FormSection>
    );
};

export default ContactForm;


const FormSection = styled.section`
    padding: ${props => props.$noBackground ? '0' : '4rem 1rem'};
    background-color: ${props => props.$noBackground ? 'transparent' : 'var(--text-light)'};
    display: flex;
    justify-content: center;
    position: relative;
    overflow-x: hidden;
`;

const RelativeWrapper = styled.div`
    position: relative;
    width: 100%;
    max-width: 1200px;
    display: flex;
    justify-content: center;
`;

const Container = styled.div`
    width: 100%;
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
    display: flex;
    overflow: hidden;
    z-index: 1;

    @media (max-width: 750px) {
        flex-direction: column;
        max-width: 800px;
    }
`;

const FormSide = styled.div`
    flex: 1;
    padding: 3rem;

    @media (max-width: 768px) {
        padding: 2rem;
    }
`;

const ImageSide = styled.div`
    flex: 1;
    background-color: #f8f9fa;
    display: flex;
    align-items: center;
    justify-content: center;
    
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }

    @media (max-width: 950px) {
        display: none;
    }
`;

const HeaderDiv = styled.div`
    text-align: center;
    margin-bottom: 2.5rem;
`;

const Title = styled.h2`
    font-family: var(--headings-font);
    color: var(--brand-blue);
    font-size: 2rem;
    margin-bottom: 0.5rem;
    letter-spacing: 1px;
`;

const Subtitle = styled.p`
    font-family: var(--text-font);
    color: #666;
    font-size: 1.1rem;
`;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const Label = styled.label`
    font-family: var(--text-font);
    font-weight: 600;
    color: var(--brand-blue);
    font-size: 0.95rem;
`;

const Input = styled.input`
    padding: 1rem;
    border: 1px solid ${props => props.$error ? 'var(--brand-red)' : '#ddd'};
    border-radius: 6px;
    font-family: var(--text-font);
    font-size: 1rem;
    transition: border-color 0.3s ease;
    background-color: #fdfdfd;

    &:focus {
        outline: none;
        border-color: var(--brand-blue);
        background-color: white;
    }
`;

const TextArea = styled.textarea`
    padding: 1rem;
    border: 1px solid ${props => props.$error ? 'var(--brand-red)' : '#ddd'};
    border-radius: 6px;
    font-family: var(--text-font);
    font-size: 1rem;
    transition: border-color 0.3s ease;
    resize: vertical;
     background-color: #fdfdfd;

    &:focus {
        outline: none;
        border-color: var(--brand-blue);
         background-color: white;
    }
`;

const ErrorMessage = styled.span`
    color: var(--brand-red);
    font-size: 0.85rem;
    font-family: var(--text-font);
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 1rem;
`;

const SubmitButton = styled.button`
    background-color: var(--brand-blue);
    color: white;
    padding: 1rem 3rem;
    border: none;
    cursor: pointer;
    font-family: var(--headings-font);
    font-size: 1rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: all 0.3s ease;
    width: 100%;
    max-width: 300px;
    
    &:hover {
        background-color: var(--brand-red);
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

const StatusMessage = styled.div`
    margin-top: 1rem;
    padding: 1rem;
    text-align: center;
    border-radius: 6px;
    font-family: var(--text-font);
    font-weight: 500;
    
    background-color: ${props =>
        props.$type === 'success' ? '#d4edda' :
            props.$type === 'error' ? '#f8d7da' : '#e2e3e5'};
    
    color: ${props =>
        props.$type === 'success' ? '#155724' :
            props.$type === 'error' ? '#721c24' : '#383d41'};
`;
