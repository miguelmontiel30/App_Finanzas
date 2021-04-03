import { db } from './firebase_config'

const borrarGasto = (id_gasto) => {
    db.collection('gastos').doc(id_gasto).delete()
}

export default borrarGasto;