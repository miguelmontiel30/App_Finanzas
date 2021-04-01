import {format, fromUnixTime} from 'date-fns'
import {es} from 'date-fns/locale'

const ConvertirFecha = (fecha) => {

    // FORMATEAMOS EL TIPO DE FECHA QUE GUARDAMOS POR DEFECTO EN LA BD
    return format(fromUnixTime(fecha), "dd 'de' MMMM 'de' yyyy", {locale: es})
}

export default ConvertirFecha;
