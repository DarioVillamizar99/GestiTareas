/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import APPIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';

const Login = () => {

    const navigate = useNavigate();

    const [usuario, setUsuario] = useState({
        email: '',
        password: ''
    });

    const { email, password } = usuario;

    const onChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        document.getElementById("email").focus();
    }, [])

    const iniciarSesion = async () => {
        const data = {
            email: usuario.email,
            password: usuario.password
        };

        try {
            // Llamar a la API y esperar la respuesta
            const response = await APPIInvoke.invokePOST(`/logincliente`, data);

            // Si el backend responde con un estado exitoso (por ejemplo, 200 o 201)
            if (response.status === 200) {
                swal({
                    title: 'Inicio de sesión exitoso',
                    text: '¡Bienvenido!',
                    icon: 'success',
                    buttons: {
                        confirm: {
                            text: 'Ok',
                            value: true,
                            visible: true,
                            className: 'btn btn-success',
                            closeModal: true
                        }
                    }
                });

            } else if (response.status === 401) {
                swal({
                    title: 'Error',
                    text: 'Usuario o Contraseña incorrectos',
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
        } catch (error) {
            console.error('Error al intentar iniciar sesión:', error);

            // Mostrar un mensaje de error genérico para otros estados
            swal({
                title: 'Error',
                text: 'Ocurrió un problema al intentar iniciar sesión. Inténtelo de nuevo más tarde.',
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
        iniciarSesion();
    }

    return (
        <div className="hold-transition login-page">
            <div className="login-box">
                <div className="login-logo">
                    <Link to={"#"}><b>Iniciar</b>SESIÓN</Link>
                </div>
                {/* /.login-logo */}
                <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">Bienvenido, ingrese sus credenciales</p>

                        <form onSubmit={onSubmit}>
                            <div className="input-group mb-3">
                                <input type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={onChange}
                                    required
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                    </div>
                                </div>
                            </div>

                            <div className="input-group mb-3">
                                <input type="password"
                                    className="form-control"
                                    placeholder="Contraseña"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={onChange}
                                    required
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>

                            <div className="social-auth-links text-center mb-3">
                                <button type='submit' className="btn btn-block btn-primary">
                                    Ingresar
                                </button>
                                <Link to={"/crear-cuenta"} className="btn btn-block btn-danger">
                                    Crear Cuenta
                                </Link>
                            </div>
                        </form>
                    </div>
                    {/* /.login-card-body */}
                </div>
            </div>
        </div>

    );
}

export default Login;