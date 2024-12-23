import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="float-right d-none d-sm-block">
                <b>Version</b> 3.2.0
            </div>
            <strong>Copyright © 2024-2028 <Link to="#">GestiTAREAS</Link>.</strong> Todos los derechos reservados.
        </footer>

    );
}

export default Footer;