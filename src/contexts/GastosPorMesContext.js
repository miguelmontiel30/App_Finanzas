import React, { useState, useEffect, useContext, createContext } from 'react'

// HOOK QUE OBTIENE LOS DATOS DE LOS GASTOS DEL MES
import useObtenerGastosMes from '../hooks/useObtenerGastosMes';

const TotalGastadoMesContext = createContext();

// CREAMOS UN HOOK PARA PODER UTILIZAR EL CONTEXTO DE LOS GASTOS
const useGastosPorMes = () => useContext(TotalGastadoMesContext)

const TotalGastadoProvider = ({ children }) => {

    // ESTADO PARA EL TOTAL DE LOS GASTOS POR MES
    const [total, setTotal] = useState(0);

    // CARGAMOS LOS DATOS QUE TRAEMOS DE LOS HOOKS
    const [gastos] = useObtenerGastosMes();

    useEffect(() => {

        let total_gastos = 0;
        // console.log(total_gastos);

        gastos.map((gasto) => {
            // console.log(gasto);
            total_gastos += Number(gasto.cantidad);
        })
        // console.log(gastos);

        setTotal(total_gastos); 
        // console.log(total_gastos);

    }, [gastos])

    return (
        <TotalGastadoMesContext.Provider value={{ total: total }}>
            {children}
        </TotalGastadoMesContext.Provider>
    )
}

export { TotalGastadoProvider, useGastosPorMes }
