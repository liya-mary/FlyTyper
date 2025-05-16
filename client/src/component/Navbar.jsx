import React from 'react';
import { useState } from 'react';


function Navbar() {
    const [isActive, setIsActive] = useState(false);
    return (

        <div>
            <nav className="navbar has-background-link-65 columns is-3 " role="navigation" aria-label="main navigation">
                <div className="navbar-brand ">

                    <a className="navbar-item has-text-light is-size-3 has-text-weight-bold  custom-hover m-4" href="/">
                        Fly Typer
                    </a>
                    <a role="button" className={`navbar-burger ${isActive ? "is-active" : ""}`} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div id="navbarBasicExample" className={`navbar-menu ${isActive ? "is-active" : ""}`}>
                    <div className="navbar-start ">
                        <a className="navbar-item has-text-light is-size-5 custom-hover ml-6 " href="/">
                            Home
                        </a>

                        <a className="navbar-item has-text-light is-size-5 custom-hover ml-6 ">
                            About
                        </a>
                    </div>
                    <div className="navbar-end ">
                        <a className="navbar-item has-text-light is-size-5 custom-hover  mr-6 " href="/">
                            Login
                        </a>
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Navbar
