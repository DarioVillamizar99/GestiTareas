import React from 'react'
import {Link} from 'react-router-dom'

const Menu = () => {
    return (
        < nav className="mt-2" >
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                {/* Add icons to the links using the .nav-icon class
       with font-awesome or any other icon font library */}
                <li className="nav-item">
                    <Link to={"/home"} className="nav-link">
                        <i className="nav-icon fas fa-th" />
                        <p>
                            Inicio
                        </p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"#"} className="nav-link">
                        <i className="nav-icon fas fa-edit" />
                        <p>
                            Tareas
                        </p>
                    </Link>
                </li>
            </ul>
        </nav>

    );
}

export default Menu;