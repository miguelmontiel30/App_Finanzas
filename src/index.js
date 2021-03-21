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

      <BrowserRouter>
        <Contenedor>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/registro-usuario' component={RegistroUsuarios} />
            <Route path='/categorias' component={GastosPorCategoria} />
            <Route path='/lista' component={ListaDeGastos} />
            <Route path='/editar/:id_gasto' component={EditarGasto} />
            <Route path='/' exact component={App} />
          </Switch>
        </Contenedor>
      </BrowserRouter>

      <Fondo />
    </>
  )
}

ReactDOM.render(<Index />, document.getElementById('root'));

export default Index
