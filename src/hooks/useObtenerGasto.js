import { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import { db } from './../firebase/firebase_config';

const useObtenerGasto = ({ id_gasto }) => {

    // console.log(id_gasto);

    const history = useHistory();

    //STATES PARA LOS GASTOS DE LA BD
    const [gasto, setGasto] = useState([]);

    useEffect(() => {

        const unsuscribe = db.collection('gastos')
            .doc(id_gasto)
            .get()
            .then((doc) => { //DOCUMENTO EXTRAIDO DE LA CONSULTA
                // COMPROBAMOS QUE EXISTA EL DOCUMENTO
                if (doc.exists) {
                    // SI EXISTE ALGUN DOCUMENTO VAMOS A CAMBIAR EL ESTADO
                    // PARA DEVOLVERLO A LA VISTA
                    setGasto({ ...doc.data(), id_gasto: doc.id });
                } else { //SI NO EXISTE EL DOCUMENTO TE REDIRIGE A LA VENTANA DE INICIO
                    history.push('/lista');
                }
            })

        //NOS DESCONECTAMOS DE LA SESION DE LA BD CUANDO SE DESMONTA EL COMPONENTE
        return unsuscribe;

    }, [history, id_gasto])

    return [gasto];
}

export default useObtenerGasto;
