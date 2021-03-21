import React from 'react'
import { Helmet } from "react-helmet";

//STYLED COMPONENTS
import {
    Header,
    Titulo
} from './../elements/Header'
import BtnRegresar from '../elements/BtnRegresar';

const GastosPorCategoria = () => {
    return (
        <>
            <Helmet>
                <title>Gastos por Categoría</title>
            </Helmet>

            <Header>

                <BtnRegresar />
                <Titulo>Gastos por Categoría</Titulo>

            </Header>

        </>
    )
}

export default GastosPorCategoria
