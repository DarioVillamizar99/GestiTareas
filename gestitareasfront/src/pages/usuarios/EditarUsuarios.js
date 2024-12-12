import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import SiderBarContainer from '../../components/SideBarContainer';
import Navbar from '../../components/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';

const EditarUsuarios = () => {

    const navigate = useNavigate();
    const { idUsuario } = useParams();

    // Estado para el formulario
    const [usuario, setUsuario] = useState({
        nombre: '',
        email: ''
    });

    // Configurar valores iniciales en el estado cuando `idUsuario` cambie
    useEffect(() => {
        if (idUsuario) {
            let arreglo = idUsuario.split('|');
            setUsuario({
                nombre: arreglo[1],
                email: arreglo[2]
                
            });
        }
        document.getElementById("nombre").focus();
    }, [idUsuario]);

    useEffect(() => {
        document.getElementById("nombre").focus();
    }, [])

    const onChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    const editarUsuario = async () => {
        try {
            // Extraer el idUsuario desde los parámetros de la URL
            const id = idUsuario.split('|')[0];
            const data = {
                idUsuario: id,
                nombre: usuario.nombre,
                email: usuario.email,
                password: '1234'
            };
            
            // Llama a la API con el idUsuario en la URL
            const response = await APIInvoke.invokePUT(`/usuario/actualizar`, data);
            console.log(response)
            // Verificar respuesta de la API
            if (response !== data) {
                navigate("/usuarios-admin");
                swal({
                    title: 'Información',
                    text: 'El usuario fue editado correctamente.',
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
            } else {
                throw new Error("Error al editar el usuario.");
            }
        } catch (error) {
            console.error("Error al editar el usuario:", error);
            swal({
                title: 'Error',
                text: 'Hubo un problema al editar el usuario. Inténtalo de nuevo.',
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
        }
    };
    
    

    const onSubmit = (e) => {
        e.preventDefault();
        editarUsuario();
    }

    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <SiderBarContainer></SiderBarContainer>
            <div className="content-wrapper">

                <Header
                    titulo={"Editar Usuarios"}
                    breadCrumb1={"Listado de Usuarios"}
                    breadCrumb2={"Editar Usuarios"}
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
                                            value={usuario.nombre}
                                            onChange={onChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Email1">Email</label>
                                        <input type="email"
                                            className="form-control"
                                            id="email1"
                                            placeholder="Enter email"
                                            name='email'
                                            value={usuario.email}
                                            onChange={onChange} />
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button type="submit" className="btn btn-primary">Guardar</button>
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

export default EditarUsuarios;