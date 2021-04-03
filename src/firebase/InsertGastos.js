import { db } from './firebase_config'

const InsertGastos = (
    { descripcion, cantidad, categoria, fecha, id_usuario }
) => {
    return db.collection('gastos').add({
        descripcion: descripcion,
        cantidad: cantidad,
        categoria: Number(categoria),
        fecha: fecha,
        id_usuario: id_usuario
    });
}

export default InsertGastos
