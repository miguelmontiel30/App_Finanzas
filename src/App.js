import React from 'react';
import Helmet from 'react-helmet'

//COMPONENTS
import BotonCerrarSesion from './components/BotonCerrarSesion';
import FormularioGasto from './components/FormularioGasto';
import BarraTotalGastado from './components/BarraTotalGastado';

//STYLE COMPONENTS
import Boton from './elements/Boton';
import {
  Header,
  Titulo,
  ContenedorHeader,
  ContenedorBotones
} from './elements/Header'

function App() {
  return (
    <>

      <Helmet>
        <title>Agregar Gastos</title>
      </Helmet>

      <Header>

        <ContenedorHeader>

          <Titulo>Agregar Gastos</Titulo>

          <ContenedorBotones>
            <Boton to='/categorias'>Categorias</Boton>
            <Boton to='/lista'>Lista de Gastos</Boton>
            <BotonCerrarSesion to='/' />
          </ContenedorBotones>

        </ContenedorHeader>


      </Header>

      <FormularioGasto />

      <BarraTotalGastado />
    </>
  );
}

export default App;
