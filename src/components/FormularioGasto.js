import React, { useState } from 'react';

//STYLES AND RESOURCES
import { ReactComponent as PlusIcon } from './../images/plus.svg'

//ELEMENTS
import Boton from '../elements/Boton';
import {
    Formulario, Input, InputGrande, ContenedorBoton, ContenedorFiltros
} from './../elements/ElementosFormulario';
import Alert from '../elements/Alert';

//COMPONENTS
import SelectCategorias from './SelectCategorias';
import SelectDayPicker from './SelectDayPicker';

//PARA CONVERTIR EL TIEMPO EN DECIMALES
import getUnixTime from 'date-fns/getUnixTime'

//ARCHIVO DE CONFIGURACIÓN PARA INSERTAR GASTOS A LA BD
import InsertGastos from '../firebase/InsertGastos';

//IMPORTAMOS LOS DATOS DE SESION DEL USUARIO
import { useAuth } from './../contexts/AuthContext'


const FormularioGasto = () => {

    //STATE PARA LAS ALERTAS EN EL REGISTRO DE USUARIOS
    const [estadoAlerta, setEstadoAlerta] = useState(false);
    const [contenidoAlerta, setContenidoAlerta] = useState({});

    //ESTADOS PARA COMPLETAR LOS INPUTS DE LA INTERFAZ
    const [descripcion, setDescripcion] = useState('');
    const [cantidad, setCantidad] = useState('');

    //CON ESTE ESTADO VAMOS A PODER SELECCIONAR LAS DIFERENTES FECHAS DEL SELECT
    const [selectedDate, setDate] = useState(new Date());
    // console.log(selectedDate);


    //CON ESTE ESTADO VAMOS A PODER SELECCIONAR LOS DIFERENTES ITEMS DEL SELECT
    const [opcionSeleccionada, setOpcionSeleccionada] = useState('Hogar');

    const handleOpcion = (event) => {
        let data_select = event.currentTarget.dataset.id;
        // console.log(event.currentTarget.dataset.id);
        setOpcionSeleccionada(data_select);
    }

    const handleDescripcion = (descripcion_input) => {
        setDescripcion(descripcion_input);
        // console.log(descripcion_input);
    }

    const handleCantidad = (cantidad_input) => {
        setCantidad(cantidad_input);
    }

    //LLAMAMOS AL HOOK DE SESION PARA UTILIZAR LOS DATOS DE SESION
    //DEL USUARIO
    const { usuario } = useAuth();

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log('Dio submit');

        // console.log(descripcion);
        // console.log(cantidad);
        // const cantidad = parseFloat(cantidad).toFixed(2);
        // console.log(opcionSeleccionada);
        // console.log(getUnixTime(selectedDate));
        // console.log(usuario.uid);

        //VERIFICAMOS QUE NO LLEVE LA DESCRIPCION O LA CANTIDAD VACIOS 
        if (descripcion === '' || cantidad === '') {
            // console.log('Por favor rellena todos los datos');
            //ACTIVAMOS EL CONTENIDO DE LA ALERTA
            setEstadoAlerta(true);
            setContenidoAlerta({
                tipo: 'error',
                mensaje: 'Por favor rellena todos los datos'
            });
            return; //SI SE CUMPLIO EL CONDICIONAL YA NO EJECUTA LAS SIGUIENTES LINEAS DE CODIGO
        }

        // CARGAMOS LA FUNCION QUE INSERTA LOS REGISTROS A LA BD
        InsertGastos({
            descripcion: descripcion,
            cantidad: parseFloat(cantidad).toFixed(2),
            categoria: opcionSeleccionada,
            fecha: getUnixTime(selectedDate),
            id_usuario: usuario.uid
        }).then(() => {

            //RESETEAMOS LOS CAMPOS PARA SEGUIR AGREGANDO MAS
            setDescripcion('');
            setCantidad('');
            setOpcionSeleccionada('Hogar');
            setDate(new Date());

            //MANDAMOS UNA ALERTA PARA MOSTRARLE AL USUARIO QUE
            //SE AGREGARON CORRECTAMENTE LOS DATOS
            setEstadoAlerta(true);
            setContenidoAlerta({
                tipo: 'exito',
                mensaje: 'Se ha registrado el gasto correctamente.'
            });
        }).catch((eror) => {
            // console.log(eror);
            //ACTIVAMOS EL CONTENIDO DE LA ALERTA
            setEstadoAlerta(true);
            setContenidoAlerta({
                tipo: 'error',
                mensaje: 'Hubo un problema al intentar agregar tu gasto'
            });
        })
    }


    return (
        <>
            <Formulario onSubmit={handleSubmit}>

                <ContenedorFiltros>
                    <SelectCategorias
                        opcionSeleccionada={opcionSeleccionada}
                        handleOpcion={handleOpcion} />
                    <SelectDayPicker
                        selectedDate={selectedDate}
                        setDate={setDate} />
                </ContenedorFiltros>

                <div>

                    <Input
                        type='text'
                        placeholder='Descripción'
                        value={descripcion}
                        id='descripcion'
                        name='descripcion'
                        onChange={(e) => handleDescripcion(e.target.value)} />

                    <InputGrande
                        type='text'
                        placeholder='$0.00'
                        value={cantidad}
                        id='cantidad'
                        name='cantidad'
                        onChange={
                            (e) => {
                                handleCantidad(e.target.value.replace(/[^0-9.]/g, ''))
                            }
                        }
                    />

                </div>

                <ContenedorBoton>
                    <Boton
                        as='button'
                        type='submit'
                        primario
                        conIcono>
                        Agregar Gasto <PlusIcon />
                    </Boton>
                </ContenedorBoton>

                <Alert
                    tipo={contenidoAlerta.tipo}
                    mensaje={contenidoAlerta.mensaje}
                    contenidoAlerta={contenidoAlerta}
                    estadoAlerta={estadoAlerta}
                    setEstadoAlerta={setEstadoAlerta}
                />

            </Formulario>
        </>

    )
}

export default FormularioGasto
