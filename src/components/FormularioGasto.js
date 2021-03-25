import React from 'react';

//STYLES AND RESOURCES
import { ReactComponent as PlusIcon } from './../images/plus.svg'

//ELEMENTS
import Boton from '../elements/Boton';
import {
    Formulario, Input, InputGrande, ContenedorBoton
} from './../elements/ElementosFormulario';

const FormularioGasto = () => {
    return (
        <Formulario>

            <div>
                <Input type='text' placeholder='Descripción' />
                <InputGrande type='text' placeholder='$0.00' />
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
        </Formulario>
    )
}

export default FormularioGasto
