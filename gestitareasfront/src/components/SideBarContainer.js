import React from 'react'
import Menu from './Menu';
import Logo from '../../node_modules/admin-lte/dist/img/AdminLTELogo.png';
import { Link } from 'react-router-dom';

const SiderBarContainer = () => {
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            {/* Brand Logo */}
            <Link to={"/home"} className="brand-link">
                <img src={Logo} alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                <span className="brand-text font-weight-light">GESTITAREAS</span>
            </Link>
            {/* Sidebar */}
            <div className="sidebar">
                <Menu></Menu>
            </div>
            {/* /.sidebar */}
        </aside>

    );
}

export default SiderBarContainer;