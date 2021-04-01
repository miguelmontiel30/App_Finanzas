import React from 'react';
import { ReactComponent as IconoComida } from './../images/cat_comida.svg';
import { ReactComponent as IconoCompras } from './../images/cat_compras.svg';
import { ReactComponent as IconoCuentasYPagos } from './../images/cat_cuentas-y-pagos.svg';
import { ReactComponent as IconoDiversion } from './../images/cat_diversion.svg';
import { ReactComponent as IconoHogar } from './../images/cat_hogar.svg';
import { ReactComponent as IconoRopa } from './../images/cat_ropa.svg';
import { ReactComponent as IconoSaludEHigiene } from './../images/cat_salud-e-higiene.svg';
import { ReactComponent as IconoTransporte } from './../images/cat_transporte.svg';

const IconoCategorias = ({ id_icono }) => {

    // console.log(id_icono);
    switch (id_icono) {
        case 'comida':
            return <IconoComida/>;            
        case 'cuentas y pagos':
            return <IconoCuentasYPagos/>;
        case 'Hogar':
            return <IconoHogar/>;
        case 'transporte':
            return <IconoTransporte/>;
        case 'ropa':
            return <IconoRopa/>;
        case 'salud e higiene':
            return <IconoSaludEHigiene/>;
        case 'compras':
            return <IconoCompras/>;
        case 'diversion':
            return <IconoDiversion/>;
        default:
            break;
    }

}

export default IconoCategorias;
