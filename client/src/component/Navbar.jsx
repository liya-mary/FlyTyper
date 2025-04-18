import Typer from "./Typer"


function Navbar() {

    return (
        // <nav className="navbar">
        //     <div className="navbar-left">
        //         <a href="/" className="logo">
        //         Fly Typer
        //         </a>
        //     </div>
        //     <div className="navbar-center">
        //         <ul className="nav-links">
        //         <li>
        //             <a href="/products">Home</a>
        //         </li>
        //         <li>
        //             <a href="/about">About Us</a>
        //         </li>
        //         <li>
        //             <a href="/contact">High Scores</a>
        //         </li>
        //         </ul>
        //     </div>
        //     <div className="navbar-right">
        //         SignUp/Login
        //     </div>
        // </nav>

        <div>
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                        Fly Typer
                    </a>
                    <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <a className="navbar-item">
                            Home
                        </a>

                        <a className="navbar-item">
                            About
                        </a>
                    </div>
                </div>
            </nav>

        </div>


    )
}

export default Navbar
