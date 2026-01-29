import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ScheduleSection = () => {
    const days = [
        { day: 'Lunes', time: '7:00 Am - 6:00 Pm' },
        { day: 'Martes', time: '8:00 Am - 5:00 Pm' },
        { day: 'Miércoles', time: '7:00 Am - 6:00 Pm' },
        { day: 'Jueves', time: '8:00 Am - 5:00 Pm' },
        { day: 'Viernes', time: '8:00 Am - 4:00 Pm' },
        { day: 'Sáb & Dom', time: '¡Cerrado!' },
    ];

    return (
        <Section>
            <Container
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <Title>Horarios de Atención</Title>
                <ScheduleRow>
                    {days.map((item, index) => (
                        <DayItem key={item.day}>
                            <DayName>{item.day}</DayName>
                            <TimeText $isClosed={item.time === '¡Cerrado!'}>{item.time}</TimeText>
                            {index < days.length - 1 && <Divider />}
                        </DayItem>
                    ))}
                </ScheduleRow>
            </Container>
        </Section>
    );
};

export default ScheduleSection;

const Section = styled.section`
    padding: 3rem 1rem;
    background-color: #ffff;
    display: flex;
    justify-content: center;
    width: 100%;
`;

const Container = styled(motion.div)`
    width: 100%;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
`;

const Title = styled.h2`
    font-family: var(--headings-font);
    font-size: 2rem;
    color: black;
    text-transform: uppercase;
    letter-spacing: 3px;
    font-weight: 700;
    opacity: 0.8;
`;

const ScheduleRow = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgba(43, 46, 75, 0.2);
    border-bottom: 1px solid rgba(43, 46, 75, 0.2);
    padding: 2rem 0;

    @media (max-width: 1024px) {
        flex-wrap: wrap;
        justify-content: center;
        gap: 2rem;
        padding: 1.5rem;
        border: 1px solid rgba(43, 46, 75, 0.1);
        border-radius: 12px;
    }
`;

const DayItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    flex: 1;
    position: relative;

    @media (max-width: 1024px) {
        flex: none;
        min-width: 140px;
    }
`;

const DayName = styled.span`
    font-family: var(--text-font);
    font-weight: 800;
    font-size: 1.1rem;
    color: var(--brand-blue);
    text-transform: uppercase;
`;

const TimeText = styled.span`
    font-family: var(--text-font);
    font-size: 0.95rem;
    color: ${props => props.$isClosed ? 'var(--brand-red)' : '#555'};
    font-weight: 500;
`;

const Divider = styled.div`
    position: absolute;
    right: 0;
    top: 15%;
    height: 70%;
    width: 1px;
    background-color: rgba(43, 46, 75, 0.15);

    @media (max-width: 1024px) {
        display: none;
    }
`;
