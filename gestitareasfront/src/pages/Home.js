import React from 'react'
import Navbar from '../components/Navbar';
import SiderBarContainer from '../components/SideBarContainer';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';


const Home = () => {
    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <SiderBarContainer></SiderBarContainer>
            <div className="content-wrapper">
                
                <Header 
                    titulo={"Dashboard"}
                    breadCrumb1={"Inicio"}
                    breadCrumb2={"Dashboard"}
                    ruta1={"/home"}
                />

                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-info">
                                    <div className="inner">
                                        <h3>Usuarios</h3>
                                        <p>&nbsp;</p>
                                    </div>
                                    <div className="icon">
                                        <i className="fa fa-user"></i>
                                    </div>
                                    <Link to={"/usuarios-admin"} className="small-box-footer">Ver Usuarios
                                        <i className="fas fa-arrow-cicle-right"></i>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-danger">
                                    <div className="inner">
                                        <h3>Tareas</h3>
                                        <p>&nbsp;</p>
                                    </div>
                                    <div className="icon">
                                        <i className="fa fa-edit"></i>
                                    </div>
                                    <Link to={"#"} className="small-box-footer">
                                        Ver Tareas
                                        <i className="fas fa-arrow-cicle-right"></i>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default Home;