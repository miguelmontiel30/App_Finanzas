import React from 'react'
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';

//IMAGES
import { ReactComponent as IconoEditar } from './../images/editar.svg'
import { ReactComponent as IconoBorrar } from './../images/borrar.svg'
//ICONS
import IconoCategorias from './../elements/IconoCategorias'

//STYLED COMPONENTS
import {
    Header,
    Titulo
} from './../elements/Header';
import Boton from '../elements/Boton';
import {
    Lista,
    ElementoLista,
    Categoria,
    Descripcion,
    Valor,
    Fecha,
    ContenedorBotones,
    BotonAccion,
    BotonCargarMas,
    ContenedorBotonCentral,
    ContenedorSubtitulo,
    Subtitulo
} from './../elements/ElementosDeLista'

//FUNCTIONS
import ConvertirMoneda from '../functios/ConvertirMoneda';
import ConvertirFecha from '../functios/ConvertirFecha';

//BTN REGRESAR
import BtnRegresar from '../elements/BtnRegresar';

//COMPONENTS
import BarraTotalGastado from './BarraTotalGastado';

//HOOK PARA OBTENER LOS GASTOS POR MES
import useObtenerGastosMes from './../hooks/useObtenerGastosMes'

//OPERACIONES CON LA BD
import borrarGasto from '../firebase/borrarGasto';

const GastosPorCategoria = () => {

    const [gastos, hayMasPorCargar, cargarMasGastos] = useObtenerGastosMes();
    // console.log(gastos);

    const agruparPorFecha = (gastos, index, fecha) => {
        if (index !== 0) {
            let fechaActual = fecha;
            let fechaAnterior = gastos[index - 1].fecha;

            // console.log(ConvertirFecha(fechaActual), ConvertirFecha(fechaAnterior));

            if (ConvertirFecha(fechaActual) === ConvertirFecha(fechaAnterior)) {
                // console.log(true);
                return true;
            } else {
                // console.log(false);
                return false;
            }
        }
    }

    return (
        <>
            <Helmet>
                <title>Gastos por Categoría</title>
            </Helmet>

            <Header>

                <BtnRegresar />
                <Titulo>Gastos por Categoría</Titulo>

            </Header>

            <Lista>
                {
                    gastos.map((gasto, index) => {
                        // console.log(gasto);
                        return (
                            <div key={gasto.id_gasto}>

                                {
                                    // COMPRUEBA DE QUE LAS FECHAS NO SEAN IGUALES
                                    !agruparPorFecha(gastos, index, gasto.fecha) &&
                                    //SI NO SON IGUALES RENDERIZA EL COMPONENTE FECHA
                                    <Fecha>{ConvertirFecha(gasto.fecha)}</Fecha>
                                }

                                <ElementoLista >

                                    <Categoria>
                                        <IconoCategorias id_icono={gasto.categoria} />
                                    </Categoria>

                                    <Descripcion>
                                        {gasto.descripcion}
                                    </Descripcion>

                                    <Valor>
                                        {/* {gasto.cantidad} */}
                                        {ConvertirMoneda(gasto.cantidad)}
                                    </Valor>

                                    <ContenedorBotones>
                                        <BotonAccion as={Link} to={`/editar/${gasto.id_gasto}`}>
                                            <IconoEditar />
                                        </BotonAccion>
                                        <BotonAccion onClick={() => borrarGasto(gasto.id_gasto)}>
                                            <IconoBorrar />
                                        </BotonAccion>
                                    </ContenedorBotones>

                                </ElementoLista>
                            </div>
                        )
                    })
                }
            </Lista>


            {
                hayMasPorCargar &&
                <ContenedorBotonCentral>
                    <BotonCargarMas onClick={() => cargarMasGastos()}>
                        Cargar Más
                    </BotonCargarMas>
                </ContenedorBotonCentral>
            }

            {
                // EN CASO DE QUE NO HAYA GASTOS VAMOS A MOSTRAR UNA LEYENDA
                gastos.length === 0 &&
                <ContenedorSubtitulo>
                    <Subtitulo>No hay gastos por Mostrar</Subtitulo>
                    <Boton as={Link} to='/'>Agregar Gasto</Boton>
                </ContenedorSubtitulo>
            }

            <BarraTotalGastado />

        </>
    )
}

export default GastosPorCategoria
