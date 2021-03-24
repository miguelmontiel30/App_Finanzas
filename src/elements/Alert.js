import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import theme from './../theme';

// console.log(theme.rojo);

const slideDown = keyframes`
    0% {
        transform: translateY(-1.25rem); /* 20px */
        opacity: 0;
    }
 
    10% {
        transform: translateY(1.25rem);
        opacity: 1;
    }
    
    90% {
        transform: translateY(1.25rem);
        opacity: 1;
    }
 
    100% {
        transform: translateY(1.25rem);
        opacity: 0;
    }
`;

const ContenedorAlerta = styled.div`
    z-index: 1000;
    width: 100%;
    left: 0;
    top: 1.25rem; /* 20px */
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${slideDown} 4s ease forwards;
 
    p {
 
        background: ${(props) => {
        if (props.tipo == 'error') {
            // console.log(theme.rojo);
            return theme.rojo;
        } else if (props.tipo == 'exito') {
            return theme.verde;
        } else {
            return '#000';
        }
    }};
        color: #fff;
        padding: 1.25rem 2.5rem; /* 20px 40px */
        border-radius: 0.31rem; /* 5px */
        box-shadow: 0px 0px 15px rgba(0,0,0,.1);
        text-align: center;
    }
`;

const Alert = ({ tipo, mensaje, estadoAlerta, setEstadoAlerta }) => {

    useEffect(() => {

        // console.log(tipo);
        // console.log(mensaje);
        // console.log(estadoAlerta);
        let tiempo_en_pantalla;

        if (estadoAlerta) {
            // ASIGNAMOS LA ALERTA A FALSE DESPUES DE 2 SEGUNDOS
            tiempo_en_pantalla = setTimeout(() => {
                setEstadoAlerta(false);
            }, 4000);
        }

        // CUANDO SE DESMONTA EL COMPONENTE LIMPIAMOS LA VARIABLE
        return () => { clearTimeout(tiempo_en_pantalla); }

    }, [estadoAlerta, setEstadoAlerta])

    return (
        <>
            {
                estadoAlerta //SI LA ALERTA ESTA ACTIVA LA MOSTRAMOS EN LA INTERFAZ
                &&
                <ContenedorAlerta
                    tipo={tipo}
                >
                    <p>
                        {mensaje}
                    </p>
                </ContenedorAlerta>
            }
        </>
    )
}

export default Alert;
