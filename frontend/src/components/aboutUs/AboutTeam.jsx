import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const teamData = [
    {
        id: 1,
        name: "Nombre Apellido",
        role: "Agente Inmobiliario",
        image: "/src/public/AboutUs/chico.jpeg", // Using a placeholder, user will replace
        socials: {
            facebook: "#",
            twitter: "#",
            linkedin: "#",
            instagram: "#"
        }
    },
    {
        id: 2,
        name: "Nombre Apellido",
        role: "Asesor de Ventas",
        image: "/src/public/AboutUs/chica.jpeg",
        socials: {
            facebook: "#",
            twitter: "#",
            linkedin: "#",
            instagram: "#"
        }
    }
];

const AboutTeam = () => {
    return (
        <Section>
            <Container>
                <Header>
                    <Badge>NUESTRO EQUIPO</Badge>
                    <Title>Expertos a su servicio</Title>
                    <Subtitle>Conozca a los profesionales que harán realidad sus objetivos inmobiliarios.</Subtitle>
                </Header>

                <Grid>
                    {teamData.map((member, index) => (
                        <Card
                            key={member.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <ImageWrapper>
                                {/* Placeholder for user to swap later */}
                                <MemberImage src={member.image} alt={member.name} />
                            </ImageWrapper>
                            <InfoCard>
                                <NameBox>
                                    <Name>{member.name}</Name>
                                    <Role>{member.role}</Role>
                                </NameBox>
                                <SocialLinks>
                                    <SocialIcon href={member.socials.facebook} target="_blank"><FaFacebookF /></SocialIcon>
                                    <SocialIcon href={member.socials.twitter} target="_blank"><FaTwitter /></SocialIcon>
                                    <SocialIcon href={member.socials.linkedin} target="_blank"><FaLinkedinIn /></SocialIcon>
                                    <SocialIcon href={member.socials.instagram} target="_blank"><FaInstagram /></SocialIcon>
                                </SocialLinks>
                            </InfoCard>
                        </Card>
                    ))}
                </Grid>
            </Container>
        </Section>
    );
};

export default AboutTeam;

const Section = styled.section`
    padding: 6rem 1rem;
    background-color: var(--text-light);
`;

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`;

const Header = styled.div`
    text-align: center;
    margin-bottom: 4rem;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
`;

const Badge = styled.span`
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: #ffe5e6;
    color: var(--brand-red);
    font-size: 0.85rem;
    font-weight: 700;
    border-radius: 50px;
    margin-bottom: 1rem;
    font-family: var(--text-font);
    letter-spacing: 1px;
    text-transform: uppercase;
`;

const Title = styled.h2`
    font-family: var(--headings-font);
    font-size: 2.5rem;
    color: var(--brand-blue);
    margin-bottom: 1rem;
`;

const Subtitle = styled.p`
    font-family: var(--text-font);
    font-size: 1.1rem;
    color: #64748b;
    line-height: 1.6;
`;

const Grid = styled.div`
    display: flex;
    justify-content: center;
    gap: 3rem;
    flex-wrap: wrap;
`;

const Card = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
`;

const ImageWrapper = styled.div`
    width: 100%;
    height: 350px;
    border-radius: 20px;
    overflow: hidden;
    margin-bottom: -40px; /* Overlap effect */
    position: relative;
    z-index: 1;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    background-color: #e2e8f0;
`;

const MemberImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
    object-position: top;

    ${Card}:first-child & {
transform: scale(2.6); /* maintain or increase zoom on hover for first child */
        object-position: center;
    }


    ${Card}:not(:first-child):hover & {
        transform: scale(1.05);
    }
`;

const InfoCard = styled.div`
    width: 85%;
    background: white;
    border-radius: 15px;
    padding: 2rem 1.5rem;
    box-shadow: 0 10px 40px rgba(0,0,0,0.08);
    position: relative;
    z-index: 2;
    text-align: center;
    transition: transform 0.3s ease;

    ${Card}:hover & {
        transform: translateY(-5px);
    }
`;

const NameBox = styled.div`
    margin-bottom: 1.5rem;
`;

const Name = styled.h3`
    font-family: var(--headings-font);
    font-size: 1.25rem;
    color: var(--brand-blue);
    margin-bottom: 0.25rem;
    font-weight: 700;
`;

const Role = styled.span`
    font-family: var(--text-font);
    font-size: 0.9rem;
    color: var(--brand-red);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
`;

const SocialLinks = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
`;

const SocialIcon = styled.a`
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #f1f5f9;
    color: #64748b;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    text-decoration: none;

    &:hover {
        background-color: var(--brand-red);
        color: white;
        transform: translateY(-2px);
    }
`;
