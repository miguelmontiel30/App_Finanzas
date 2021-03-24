import React, { useState, useContext, useEffect } from 'react';
import { auth } from './../firebase/firebase_config'

//CREAMOS EL CONTEXTO
const AuthContext = React.createContext();

//CREAMOS EL HOOK PARA ACCEDER AL CONTEXTO
const useAuth = () => {
    return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {

    //STATE PARA SABER EL ESTADO DEL USUARIO Y 
    //SI ES QUE SE ENCUENTRA CON SESION ACTIVA
    const [usuario, setUsuario] = useState(false);

    //CREAMOS OTRO STATE PARA MOSTRAR O NO EL CONTENIDO 
    //DEPENDIENDO DE SI SE INICIO SESION O NO
    const [cargandoUser, setCargandoUser] = useState(true)

    useEffect(() => {

        const cancelarSubscripcion = auth.onAuthStateChanged((usuario) => {
            setUsuario(usuario);
            setCargandoUser(false);
        })

        return cancelarSubscripcion;

    }, [])

    return (
        <AuthContext.Provider value={{ usuario: usuario }}>
            {
                /* SI NO SE ESTA CARGANDO LOS DATOS DEL USUARIO 
                SE MUESTRA LA INTERFAZ */
                !cargandoUser && children
            }
        </AuthContext.Provider>
    );

}

export { AuthProvider, AuthContext, useAuth }