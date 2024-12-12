import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar';
import SiderBarContainer from '../../components/SideBarContainer';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';

const UsuariosAdmin = () => {

    const [usuarios, setUsuarios] = useState([]);

    const cargarUsuarios = async () => {
        const response = await APIInvoke.invokeGET(`/list/usuario`);
        //console.log(response);
        setUsuarios(response);
    }

    useEffect(() => {
        cargarUsuarios();
    }, [])

    const eliminarUsuarios = async (e, idUsuario) => {
        e.preventDefault();
        const response = await APIInvoke.invokeDELETE(`/usuario/${idUsuario}`);

        if(!response.status === 200) {
            const msg = "El usuario no pudo ser eliminado, intente de nuevo";
                swal({
                    title: 'Error',
                    text: msg,
                    icon: 'error',
                    buttons: {
                        confirm: {
                            text: 'Ok',
                            value: true,
                            visible: true,
                            className: 'btn btn-danger',
                            closeModal: true
                        }
                    }
                });
        } else {
            const msg = "El usuario fue eliminado correctamente.";
                swal({
                    title: 'Información',
                    text: msg,
                    icon: 'success',
                    buttons: {
                        confirm: {
                            text: 'Ok',
                            value: true,
                            visible: true,
                            className: 'btn btn-primary',
                            closeModal: true
                        }
                    }
                });
                cargarUsuarios();
        }
    }

    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <SiderBarContainer></SiderBarContainer>
            <div className="content-wrapper">

                <Header
                    titulo={"Listado de Usuarios"}
                    breadCrumb1={"Inicio"}
                    breadCrumb2={"Listado de usuarios"}
                    ruta1={"/home"} />

                <section className="content">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title"><Link to={"/crear-usuario"} className='btn btn-block btn-success btn-sm'>Agregar</Link></h3>
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                    <i className="fas fa-minus" />
                                </button>
                                <button type="button" className="btn btn-tool" data-card-widget="remove" title="Remove">
                                    <i className="fas fa-times" />
                                </button>
                            </div>
                        </div>
                        <div className="card-body">

                            <table className="table table-head-fixed text-nowrap">
                                <thead>
                                    <tr>
                                        <th style={{ width: '10%' }}>ID Usuario</th>
                                        <th>Nombre</th>
                                        <th>Email</th>
                                        <th style={{ width: '20%' }}>Fecha creación</th>
                                        <th style={{ width: '10%' }}>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        usuarios.map(
                                            item =>
                                                <tr key={item.idUsuario}>
                                                    <td>{item.idUsuario}</td>
                                                    <td>{item.nombre}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.fechaCreacion}</td>
                                                    <td>
                                                        <button className='btn btn-sm btn-primary'>Editar</button>&nbsp;
                                                        <button onClick={(e) => eliminarUsuarios(e, item.idUsuario)} className='btn btn-sm btn-danger'>Eliminar</button>
                                                    </td>
                                                </tr>
                                        )
                                    }

                                </tbody>
                            </table>


                        </div>
                    </div>
                </section>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default UsuariosAdmin;