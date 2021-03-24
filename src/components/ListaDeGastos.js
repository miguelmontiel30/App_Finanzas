import React from 'react';
import { Helmet } from "react-helmet";

//STYLED COMPONENTS
import {
    Header,
    Titulo
} from './../elements/Header'
import BtnRegresar from '../elements/BtnRegresar';

import { useAuth } from '../contexts/AuthContext'

const ListaDeGastos = () => {

    const { usuario } = useAuth();
    console.log(usuario);

    return (
        <>
            <Helmet>
                <title>Lista de Gastos</title>
            </Helmet>

            <Header>

                <BtnRegresar />
                <Titulo>Lista de Gastos</Titulo>

            </Header>

        </>
    )
}

export default ListaDeGastos
