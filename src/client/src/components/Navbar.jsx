import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/user";
import Logo from "./Logo";

export default function Navbar(props) {
    const pages = [
        'Discussion',
        'Group',
        'Dashboard',
    ].map((value) => {
        return (<li className='nav-item ' key={value}>
            <Link className='nav-link mx-lg-2' to={'/' + value.toLowerCase()}>
                {value}
            </Link>
        </li>);
    })


    const user = useContext(UserContext);

    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark text-light'>
            <div className='container-fluid align-items-center'>
                <div className='navbar-brand' href='/'>
                    <Logo />
                </div>
                <div className="collapse navbar-collapse" id='navbarSupportedContent'>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-lg-2">
                        {pages}
                    </ul>
                </div>
                <div class='d-flex align-items-center me-auto'>

                    {/* profile */}
                    <div className='nav-item'>
                        {user !== {} ?
                            <div className='dropdown ms-auto'>
                                <div className=" nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {user.userName}
                                </div>
                                <ul className="dropdown-menu dropdown-menu-start dropdown-menu-lg-end align-items-start" aria-labelledby="navbarDropdown">

                                    <li><Link className="dropdown-item" to="/settings">
                                        <i className="fa-solid fa-gear me-2"></i>
                                        Settings
                                    </Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="/logout">
                                        <i class="fa-solid fa-right-from-bracket me-2"></i>
                                        Logout</Link></li>
                                </ul>
                            </div>
                            :
                            <Link className='nav-link' to="/login">
                                Login
                            </Link>
                        }
                    </div>

                    {/* notification */}
                    <div className="nav-item ms-4 me-auto">
                        <Link className="nav-link " to="/notifications">
                            <div className='fa-layers fa-lg'>
                                <i className="fa-regular fa-bell"></i>
                                <i className="fa-solid fa-circle" data-fa-transform='shrink-10 up-4 right-4' color='red' ></i>
                            </div>
                        </Link>
                    </div>


                </div>
                <button className="navbar-toggler ms-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>


            </div>

        </nav>
    )
}
