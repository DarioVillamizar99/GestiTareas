import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar';
import SiderBarContainer from '../../components/SideBarContainer';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';


const CrearUsuarios = () => {

    const navigate = useNavigate();

    const [usuario, setusuario] = useState({
        nombre: '',
        email: '',
        password: ''
    });

    const { nombre, email, password } = usuario;

    useEffect(() => {
        document.getElementById("nombre").focus();
    }, [])

    const onChange = (e) => {
        setusuario({
            ...usuario,
            [e.target.name]: e.target.value,
            [e.target.email]: e.target.value,
            [e.target.password]: e.target.value
        })
    }

    const crearUsuario = async () => {
        const data = {
            nombre: usuario.nombre,
            password: usuario.password,
            email: usuario.email
        }

        const response = await APIInvoke.invokePOST(`/usuario/agregar`, data);
        const idUsuario = response.idUsuario;

        if (idUsuario === '') {
            const msg = "El usuario no pudo ser creado, intente de nuevo";
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
            navigate("/usuarios-admin")
            const msg = "El usuario fue creado correctamente.";
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

            setusuario({
                nombre: '',
                email: '',
                password: ''
            })
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        crearUsuario();
    }

    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <SiderBarContainer></SiderBarContainer>
            <div className="content-wrapper">

                <Header
                    titulo={"Agregar Usuarios"}
                    breadCrumb1={"Listado de Usuarios"}
                    breadCrumb2={"Agregar Usuarios"}
                    ruta1={"/usuarios-admin"} />

                <section className="content">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                    <i className="fas fa-minus" />
                                </button>
                                <button type="button" className="btn btn-tool" data-card-widget="remove" title="Remove">
                                    <i className="fas fa-times" />
                                </button>
                            </div>
                        </div>
                        <div className='card-body'>
                            <form style={{ width: '50%' }} onSubmit={onSubmit}>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="Nombre">Nombre</label>
                                        <input type="text"
                                            className="form-control"
                                            id="nombre"
                                            placeholder="Enter Nombre"
                                            name='nombre'
                                            value={nombre}
                                            onChange={onChange}
                                            required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Email1">Email</label>
                                        <input type="email"
                                            className="form-control"
                                            id="email1"
                                            placeholder="Enter email"
                                            name='email'
                                            value={email}
                                            onChange={onChange}
                                            required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Password">Contraseña</label>
                                        <input type="password"
                                            className="form-control"
                                            id="password"
                                            placeholder="Password"
                                            name='password'
                                            value={password}
                                            onChange={onChange}
                                            required />
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button type="submit" className="btn btn-primary">Enviar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div >
            <Footer></Footer>
        </div >
    );
}

export default CrearUsuarios;