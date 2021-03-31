import React, { useState } from 'react';
import styled from 'styled-components'
import theme from './../theme'

//IMPORTAMOS LAS IMAGENES E ICONOS NECESARIOS
import { ReactComponent as IconDown } from './../images/down.svg';
import IconoCategorias from './../elements/IconoCategorias';

//IMPORTAMOS LA DATA DEL ARCHIVO DE LAS CATEGORIAS
import categorias from './../data/Categorias'

const ContenedorSelect = styled.div`
    background: ${theme.grisClaro};
    cursor: pointer;
    border-radius: 0.625rem; /* 10px */
    position: relative;
    height: 5rem; /* 80px */
    width: 40%;
    padding: 0px 1.25rem; /* 20px */
    font-size: 1.5rem; /* 24px */
    text-align: center;
    display: flex;
    align-items: center;
    transition: .5s ease all;
    &:hover {
        background: ${theme.grisClaro2};
    }
`;

const OpcionSeleccionada = styled.div`
    width: 100%;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: space-between;
    svg {
        width: 1.25rem; /* 20px */
        height: auto;
        margin-left: 1.25rem; /* 20px */
    }
`;

const Opciones = styled.div`
    background: ${theme.grisClaro};
    position: absolute;
    top: 5.62rem; /* 90px */
    left: 0;
    width: 100%;
    border-radius: 0.625rem; /* 10px */
    max-height: 18.75rem; /* 300px */
    overflow-y: auto;
`;

const Opcion = styled.div`
    padding: 1.25rem; /* 20px */
    display: flex;
    svg {
        width: 28px;
        height: auto;
        margin-right: 1.25rem; /* 20px */
    }
    &:hover {
        background: ${theme.grisClaro2};
    }
`;

const SelectCategorias = ({opcionSeleccionada, handleOpcion }) => {


    //CON EL ESTADO VAMOS A MOSTRAR O NO LA LISTA DE CATEGORIAS
    const [mostrarSelect, setMostrarSelect] = useState(false);        

    return (


        <ContenedorSelect onClick={() => setMostrarSelect(!mostrarSelect)}>

            <OpcionSeleccionada>
                {opcionSeleccionada} <IconDown />
            </OpcionSeleccionada>

            {
                //SI EL SELECT ESTA MOSTRANDO LAS CATEGORIAS 
                //VAMOS A MOSTRAR LOS DATOS DEL SELECT 
                mostrarSelect &&

                <Opciones>
                    {
                        //RECORREMOS EL ARREGLO DE CATEGORIAS 
                        //PARA PODER MOSTRAR VARIAS OPCIONES
                        categorias.map((categoria) => {
                            // console.log(categorias);
                            return (
                                <Opcion
                                    key={categoria.id}
                                    data-id={categoria.id}
                                    onClick={handleOpcion}
                                >
                                    <IconoCategorias id_icono={categoria.id} />
                                    {categoria.texto}
                                </Opcion>
                            )
                        })
                    }
                </Opciones>

            }

        </ContenedorSelect>
    )
}

export default SelectCategorias
