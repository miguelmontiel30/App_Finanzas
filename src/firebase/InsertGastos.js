import { db } from './firebase_config'

const InsertGastos = (
    { descripcion, cantidad, categoria, fecha, id_usuario }
) => {
    return db.collection('gastos').add({
        descripcion: descripcion,
        cantidad: Number(cantidad),
        categoria: categoria,
        fecha: fecha,
        id_usuario: id_usuario
    });
}

export default InsertGastos
