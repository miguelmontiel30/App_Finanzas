import React from 'react'
import { Redirect, Route } from 'react-router';

//CONTEXTO DE AUTENTICACION DEL USUARIO
import { useAuth } from '../contexts/AuthContext';

//OBTENEMOS EL HIJO DEL COMPONENTE Y SUS PROPIEDADES (LA RUTA DEL COMPONENTE)
const RutaPrivada = ({ children, ...propiedadesDeRuta }) => {

    //IDENTIFICAMOS SI EL USUARIO TIENE UNA SESION ACTIVA EN 
    //EL SISTEMA
    const {usuario} = useAuth();

    console.log(usuario);
    
    //SI EL USUARIO TIENE UNA SESION ACTIVA 
    if (usuario) {

        return (
            <Route {...propiedadesDeRuta} >
                {children}
            </Route>
        );

    } else {
        return <Redirect to='login' />
    }

}

export default RutaPrivada;
