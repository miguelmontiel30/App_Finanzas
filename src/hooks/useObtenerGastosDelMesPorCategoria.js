import { useEffect, useState } from "react";

// HOOK QUE OBTIENE LOS DATOS DE LOS GASTOS DEL MES
import useObtenerGastosMes from '../hooks/useObtenerGastosMes';

const useObtenerGastosDelMesPorCategoria = () => {

    // STATE PARA EL CAMBIO DE DATOS DE LAS CATEGORIAS
    const [gastosPorCategoria, setGastosPorCategoria] = useState([]);

    // A TRAVES DEL HOOK OBTENEMOS LOS DATOS DE LOS GASTOS
    const [gastos] = useObtenerGastosMes();
    // console.log(gastos);


    useEffect(() => {

        const sumaDeGastos = gastos.reduce((objetoResultante, objetoActual) => {

            const categoriaActual = objetoActual.categoria;
            const cantidadActual = objetoActual.cantidad;

            objetoResultante[categoriaActual] += cantidadActual;

            return objetoResultante

        }, {
            'comida': 0,
            'cuentas y pagos': 0,
            'hogar': 0,
            'transporte': 0,
            'ropa': 0,
            'salud e higiene': 0,
            'compras': 0,
            'diversion': 0,
        })

        // console.log(sumaDeGastos);
        // console.log(
        setGastosPorCategoria(
            Object.keys(sumaDeGastos).map((elemento) => {
                return { categoria: elemento, cantidad: sumaDeGastos[elemento] }
            })
        );




    }, [gastos, gastosPorCategoria])

    return gastosPorCategoria;
}

export default useObtenerGastosDelMesPorCategoria;