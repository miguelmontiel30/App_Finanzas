import React from 'react';
import Helmet from 'react-helmet'

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
            <Boton to='/'>Cerrar Sesión</Boton>
          </ContenedorBotones>

        </ContenedorHeader>

      </Header>

    </>
  );
}

export default App;
