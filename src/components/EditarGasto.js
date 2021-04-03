import React from 'react';
import { Helmet } from "react-helmet";
import { useParams } from 'react-router-dom'

//STYLED COMPONENTS
import {
    Header,
    Titulo
} from './../elements/Header';

//BTN REGRESAR
import BtnRegresar from '../elements/BtnRegresar';

//COMPONENTS
import BarraTotalGastado from './BarraTotalGastado';
import FormularioGasto from './FormularioGasto';

// HOOKS PARA OBTENER EL GASTO
import useObtenerGasto from '../hooks/useObtenerGasto';

const EditarGasto = () => {

    const {id_gasto} = useParams();
    // console.log(id_gasto);

    // ACCEDEMOS AL HOOK PARA OBTENER EL GASTO 
    // Y COMO PARAMETRO LE ENVIAMOS EL GASTO QUE RECIBIMOS DE LA URL
    const [gasto] = useObtenerGasto({id_gasto});

    // console.log(gasto);

    return (
        <>
            <Helmet>
                <title>Editar Gasto</title>
            </Helmet>

            <Header>

                <BtnRegresar ruta='/lista' />
                <Titulo>Editar Gasto</Titulo>

            </Header>

            <FormularioGasto gasto={gasto} />

            <BarraTotalGastado />

        </>
    )
}

export default EditarGasto
