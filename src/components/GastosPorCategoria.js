import React from 'react'
import { Helmet } from "react-helmet";

//STYLED COMPONENTS
import {
    Header,
    Titulo
} from './../elements/Header';

//BTN REGRESAR
import BtnRegresar from '../elements/BtnRegresar';

//COMPONENTS
import BarraTotalGastado from './BarraTotalGastado';

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

            <BarraTotalGastado /> 

        </>
    )
}

export default GastosPorCategoria
