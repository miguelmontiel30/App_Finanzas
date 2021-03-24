import React, { useState } from 'react'
import styled from 'styled-components';
import Helmet from 'react-helmet'
import { useHistory } from 'react-router';

//STYLED COMPONENTS
import {
    ContenedorHeader,
    Header,
    Titulo
} from './../elements/Header';
import {
    Formulario,
    Input,
    ContenedorBoton
} from './../elements/ElementosFormulario';
import Boton from '../elements/Boton';
import Alert from '../elements/Alert';

//IMPORTAMOS LA IMAGEN
import { ReactComponent as SVGLogin } from './../images/login.svg'
import { auth } from '../firebase/firebase_config';



const Login = () => {

    // HOOK PARA REDIRECCIONAR AL USUARIO
    const history = useHistory();

    //ESTADOS PARA COMPLETAR LOS INPUTS DE LA INTERFAZ
    const [correo, setCorreo] = useState('');
    const [contrasenia, setContrasenia] = useState('');

    //STATE PARA LAS ALERTAS EN EL EL LOGIN
    const [estadoAlerta, setEstadoAlerta] = useState(false);
    const [contenidoAlerta, setContenidoAlerta] = useState({});

    const SVG = styled(SVGLogin)`
    width: 100%;
    heigth: 12rem; /*100px*/
    margin-bottom: 1.25rem; /*20px*/
`;

    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log('Dio Submit');

        //RESETEAMOS LA ALERTA
        setEstadoAlerta(false);
        setContenidoAlerta({});

        //VAMOS A COMPROBAR QUE EL USUARIO ESTE ENVIANDO CORRECTAMENTE UN CORREO
        const exp_reg = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;

        if (!exp_reg.test(correo)) { //SI EL USUARIO ENVIO CUALQUIER OTRA COSA QUE NO SEA UN CORREO
            // console.log('El usuario no envió un correo');

            //ACTIVAMOS EL CONTENIDO DE LA ALERTA
            setEstadoAlerta(true);
            setContenidoAlerta({
                tipo: 'error',
                mensaje: 'Ingrese un correo válido'
            });

            // console.log(contenidoAlerta);


            return; //SI SE CUMPLIO EL CONDICIONAL YA NO EJECUTA LAS SIGUIENTES LINEAS DE CODIGO
        }

        //VERIFICAMOS QUE NO HAYA CAMPOS VACIOS
        if (correo === '' || contrasenia === '') {
            // console.log('Por favor rellena todos los datos');
            //ACTIVAMOS EL CONTENIDO DE LA ALERTA
            setEstadoAlerta(true);
            setContenidoAlerta({
                tipo: 'error',
                mensaje: 'Por favor rellena todos los datos'
            });
            return; //SI SE CUMPLIO EL CONDICIONAL YA NO EJECUTA LAS SIGUIENTES LINEAS DE CODIGO
        }

        try {
            await auth.signInWithEmailAndPassword(correo, contrasenia);
            // console.log('Se creó el usuario con éxito');
            history.push('/');
            //ACTIVAMOS EL CONTENIDO DE LA ALERTA
            // setEstadoAlerta(true);
            // setContenidoAlerta({
            //     tipo: 'exito',
            //     mensaje: 'Se creó el usuario con éxito'
            // });
        } catch (error) {
            // console.log(error);
            let mensaje;

            switch (error.code) {
                case 'auth/wrong-password':
                    mensaje = 'La contraseña no es correcta.'
                    break;
                case 'auth/user-not-found':
                    mensaje = 'El usuario no es válido.'
                    break;
                default:
                    mensaje = 'Hubo un error al intentar acceder a la cuenta.'
                    break;
            }

            //ACTIVAMOS EL CONTENIDO DE LA ALERTA
            setEstadoAlerta(true);
            setContenidoAlerta({
                tipo: 'error',
                mensaje: mensaje
            });

            // console.log(mensaje);
        }

    }

    const handleCorreo = (correo_input) => {
        setCorreo(correo_input);
        // console.log(correo);
    }

    const handleContrasenia = (contrasenia_input) => {
        setContrasenia(contrasenia_input);
    }

    return (
        <>

            <Alert
                tipo={contenidoAlerta.tipo}
                mensaje={contenidoAlerta.mensaje}
                contenidoAlerta={contenidoAlerta}
                estadoAlerta={estadoAlerta}
                setEstadoAlerta={setEstadoAlerta}
            />

            <Helmet>
                <title>Iniciar Sesión</title>
            </Helmet>

            <Header>

                <ContenedorHeader>
                    <Titulo>Iniciar Sesión</Titulo>
                    <Boton to='/registro-usuario'>Registrarse</Boton>
                </ContenedorHeader>

            </Header>

            <Formulario>

                <SVG />

                <Input
                    placeholder='Correo Electrónico'
                    type='email'
                    value={correo}
                    onChange={(e) => handleCorreo(e.target.value)}
                />

                <Input
                    placeholder='Contraseña'
                    type='password'
                    value={contrasenia}
                    onChange={(e) => { handleContrasenia(e.target.value) }}
                />

                <ContenedorBoton>
                    <Boton
                        as='button'
                        primario
                        type='submit'
                        onClick={handleSubmit}>Iniciar Sesión</Boton>
                </ContenedorBoton>

            </Formulario>


        </>
    )
}

export default Login
