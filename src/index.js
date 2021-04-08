import React from 'react';
import ReactDOM from 'react-dom';
import WebFont from 'webfontloader'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Helmet } from "react-helmet";

//STYLES
import './index.css';
import Contenedor from './elements/Contenedor';
import Fondo from './elements/Fondo';

//ICONS
import favicon from './images/logo.png'

//COMPONENTS
import App from './App';
import Login from './components/Login';
import RegistroUsuarios from './components/RegistroUsuarios';
import ListaDeGastos from './components/ListaDeGastos';
import GastosPorCategoria from './components/GastosPorCategoria';
import EditarGasto from './components/EditarGasto';

//Importamos EL PROVEEDOR DEL CONTEXTO
import { AuthProvider } from './contexts/AuthContext'
import { TotalGastadoProvider } from './contexts/GastosPorMesContext'

// COMPONENTE PARA LAS RUTAS PRIVADAS
import RutaPrivada from './components/RutaPrivada';


WebFont.load({
  google: {
    families: ['Roboto', 'sans-serif']
  }
});

const Index = () => {
  return (
    <>

      <Helmet>
        <link rel="shortcut icon" href={favicon} type='image/x-icon'></link>
        <title>App Finanzas</title>
      </Helmet>

      <AuthProvider>
        <TotalGastadoProvider>
          <BrowserRouter>
            <Contenedor>
              <Switch>

                [//RUTAS NO PROTEGIDAS (PARA QUE CREEN SU CUENTA O INICIEN SESION)]
              <Route path='/login' component={Login} />
                <Route path='/registro-usuario' component={RegistroUsuarios} />

                <RutaPrivada path='/categorias'>
                  <GastosPorCategoria />
                </RutaPrivada>

                <RutaPrivada path='/lista'>
                  <ListaDeGastos />
                </RutaPrivada>

                <RutaPrivada path='/editar/:id_gasto'>
                  <EditarGasto />
                </RutaPrivada>

                <RutaPrivada path='/'>
                  <App />
                </RutaPrivada>

              </Switch>
            </Contenedor>
          </BrowserRouter>
        </TotalGastadoProvider>
      </AuthProvider>

      <Fondo />
    </>
  )
}

ReactDOM.render(<Index />, document.getElementById('root'));

export default Index
