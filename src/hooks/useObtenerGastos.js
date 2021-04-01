import { useState, useEffect } from 'react'
import { db } from './../firebase/firebase_config'
import { useAuth } from './../contexts/AuthContext'

const useObtenerGastos = () => {

    const [gastos, setGastos] = useState([]);
    const { usuario } = useAuth();

    useEffect(() => {

        
        const unsuscribe = db.collection('gastos')
            .where('id_usuario', '==', usuario.uid)
            .orderBy('fecha', 'desc')
            .limit(10)
            .onSnapshot((snapshot) => {
                setGastos(
                    snapshot.docs.map((gasto) => {
                        // console.log(gasto.data());
                        return { ...gasto.data(), id_gasto: gasto.id }
                    })

                );
                // console.log(snapshot.docs[0].data());
            });

        return unsuscribe;
    }, [usuario])

    return [gastos];
}

export default useObtenerGastos;
