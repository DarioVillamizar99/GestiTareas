import React, {Fragment} from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './pages/auth/Login';
import CrearCuenta from './pages/auth/CrearCuenta';
import Home from './pages/Home';
import UsuariosAdmin from './pages/usuarios/UsuariosAdmin';
import CrearUsuarios from './pages/usuarios/CrearUsuarios';


function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" exact element={<Login/>}/>
          <Route path="/crear-cuenta" exact element={<CrearCuenta/>}/>
          <Route path="/home" exact element={<Home/>}/>
          <Route path="/usuarios-admin" exact element={<UsuariosAdmin/>}></Route>
          <Route path="/crear-usuario" exact element={<CrearUsuarios/>}></Route>
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
