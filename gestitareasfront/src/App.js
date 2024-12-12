import React, {Fragment} from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './pages/auth/Login';
import CrearCuenta from './pages/auth/CrearCuenta';
import Home from './pages/Home';
import UsuariosAdmin from './pages/usuarios/UsuariosAdmin';
import CrearUsuarios from './pages/usuarios/CrearUsuarios';
import EditarUsuarios from './pages/usuarios/EditarUsuarios';
import HomeCli from './pages/HomeCli'


function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" exact element={<Login/>}/>
          <Route path="/crear-cuenta" exact element={<CrearCuenta/>}/>
          <Route path="/home" exact element={<Home/>}/>
          <Route path="/home2" exact element={<HomeCli/>}/> 
          <Route path="/usuarios-admin" exact element={<UsuariosAdmin/>}></Route>
          <Route path="/crear-usuario" exact element={<CrearUsuarios/>}></Route>
          <Route path="/editar-usuario/:idUsuario" exact element={<EditarUsuarios/>}></Route>
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
