import { useState, useEffect } from 'react'
import { db } from './../firebase/firebase_config'
import { useAuth } from './../contexts/AuthContext'
import { endOfMonth, getUnixTime, startOfMonth } from 'date-fns'

const useObtenerGastosMes = () => {

    //FECHAS QUE UTILIZAREMOS PARA FILTRAR LOS DATOS POR MES
    const fechaInicio = getUnixTime(startOfMonth(new Date()));
    const fechaFin = getUnixTime(endOfMonth(new Date()));
    // console.log(fechaInicio, fechaFin );

    //STATES PARA LOS GASTOS DE LA BD
    const [gastos, setGastos] = useState([]);
    const [ultimoGasto, setUltimoGasto] = useState(null);
    const [hayMasPorCargar, setHayMasPorCargar] = useState(false);

    //HOOK PARA OBTENER DATOS DE LA SESIÓN DEL USUARIO
    const { usuario } = useAuth();

    const cargarMasGastos = () => {
        // console.log('Dio click');
        db.collection('gastos')
            .where('id_usuario', '==', usuario.uid)
            .where('fecha', '>=', fechaInicio)
            .where('fecha', '<=', fechaFin)
            .orderBy('fecha', 'desc')
            .limit(10)
            .startAfter(ultimoGasto) //COMENZAMOS DESDE EL ULTIMO REGISTRO
            .onSnapshot((snapshot) => {
                // console.log(snapshot.docs[0].data());

                // COMPROBAMOS QUE EXISTA MÁS DE UN DOCUMENTO PARA CARGAR
                if (snapshot.docs.length > 0) {

                    // SETEAMOS EL ESTADO PARA SEGUIR MOSTRANDO EL BOTON
                    setHayMasPorCargar(true);

                    // INDICAMOS DESDE DONDE QUEREMOS EMPEZAR A CARGAR DATOS
                    // CUANDO QUERAMOS CARGAR LOS DEMÁS DATOS CON EL BOTON
                    setUltimoGasto(snapshot.docs[snapshot.docs.length - 1])

                    // SETEAMOS LOS GASTOS AL ESTADO PARA MOSTRARLOS EN LA VISTA
                    setGastos(

                        // YA HABÍAN GASTOS PREVIOS, ASÍ QUE SE CONCATENAN LOS
                        // NUEVOS DATOS DEVUELTOS DEL SNAPSHOT CON LOS
                        // QUE CONTENIA EL ARRAY DE GASTOS ANTERIORES
                        gastos.concat(
                            // RECORREMOS TODOS LOS GASTOS DEVUELTOS DEL SNAPSHOT
                            snapshot.docs.map((gasto) => {
                                // console.log(gasto.data());

                                // DEVOLVEMOS LA DATA QUE NOS TRAE EL GASTO Y SETAMOS UN ID
                                return { ...gasto.data(), id_gasto: gasto.id }
                            })
                        )

                    );

                } else { //SI NO HAY MAS REGISTROS POR CARGAR ENTONCES SETEA EL ESTADO A FALSE
                    setHayMasPorCargar(false);
                }
            });
    }

    useEffect(() => {

        const unsuscribe = db.collection('gastos')
            .where('id_usuario', '==', usuario.uid)
            .where('fecha', '>=', fechaInicio)
            .where('fecha', '<=', fechaFin)
            .orderBy('fecha', 'desc')
            .limit(10)
            .onSnapshot((snapshot) => {

                // COMPROBAMOS QUE EXISTA MÁS DE UN DOCUMENTO PARA CARGAR
                if (snapshot.docs.length > 0) {

                    // SETEAMOS EL ESTADO PARA SEGUIR MOSTRANDO EL BOTON
                    setHayMasPorCargar(true);

                    // INDICAMOS DESDE DONDE QUEREMOS EMPEZAR A CARGAR DATOS
                    // CUANDO QUERAMOS CARGAR LOS DEMÁS DATOS CON EL BOTON
                    setUltimoGasto(snapshot.docs[snapshot.docs.length - 1])

                } else { //SI NO HAY MAS REGISTROS POR CARGAR ENTONCES SETEA EL ESTADO A FALSE
                    setHayMasPorCargar(false);
                }

                // SETEAMOS LOS GASTOS AL ESTADO PARA MOSTRARLOS EN LA VISTA
                // ESTE ARRAY CAMBIA CADA QUE HAY UN CAMBIO EN LA BD
                setGastos(
                    // RECORREMOS TODOS LOS GASTOS DEVUELTOS DEL SNAPSHOT
                    snapshot.docs.map((gasto) => {
                        // console.log(gasto.data());                    

                        // DEVOLVEMOS LA DATA QUE NOS TRAE EL GASTO Y SETAMOS UN ID
                        return { ...gasto.data(), id_gasto: gasto.id }
                    })

                );

            });

        //NOS DESCONECTAMOS DE LA SESION DE LA BD CUANDO SE DESMONTA EL COMPONENTE
        return unsuscribe;

    }, [usuario, fechaInicio, fechaFin])

    return [gastos, hayMasPorCargar, cargarMasGastos];
}

export default useObtenerGastosMes;
