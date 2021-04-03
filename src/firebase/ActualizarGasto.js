import { db } from './firebase_config'

const ActualizarGasto = (
    {id_gasto, descripcion, cantidad, categoria, fecha }
) => {
    // console.log(id_gasto);
    return db.collection('gastos')
    .doc(id_gasto)
    .update({
        descripcion: descripcion,
        cantidad: Number(cantidad),
        categoria: categoria,
        fecha: fecha
    });
}

export default ActualizarGasto;
