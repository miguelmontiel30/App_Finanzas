import React from 'react'
import {useHistory} from 'react-router-dom'

// AUTENTICATION FILES
import { auth } from './../firebase/firebase_config'

//STYLES AND RESOURCES
import { ReactComponent as IconoCerrarSesion } from './../images/log-out.svg'

//ELEMENTS
import Boton from '../elements/Boton'

const BotonCerrarSesion = () => {

    const history = useHistory();


    const cerrarSesion = async () => {
        try {
            await auth.signOut();
            history.push('/login');
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <Boton iconoGrande as='button' onClick={cerrarSesion}>
            <IconoCerrarSesion />
        </Boton>
    )
}

export default BotonCerrarSesion
