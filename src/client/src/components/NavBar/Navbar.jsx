import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { isLoggedIn, UserContext } from "../../context/User";
import Logo from "../Utils/Logo";

const Navbar = (props) => {
    const pages = [
        'Discussion',
        'Group',
        'Dashboard',
    ].map((value) => {
        return (<li className='nav-item ps-2' key={value}>
            <NavLink className='nav-link mx-lg-2' to={'/' + value.toLowerCase()}>
                {value}
            </NavLink >
        </li>);
    })


    const { user } = useContext(UserContext);

    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark text-light py-0'
            style={{
                height: '7vh',
                zIndex: "100",
            }}
        >
            <div className='container-lg align-items-center justify-content-center bg-dark'>
                <div className='navbar-brand'>
                    <Logo />
                </div>

                {/* pages */}
                <div className="collapse navbar-collapse"

                    id='navbarSupportedContent'>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-lg-2">
                        {pages}
                    </ul>
                </div>



                {/* profile */}
                {isLoggedIn(user) ?
                    <div className="d-flex flex-row align-items-center justify-content-around">
                        <div className='nav-item d-flex align-items-center me-auto'>
                            <div className='dropdown ms-auto'>
                                <div className=" nav-link" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <div className="d-flex flex-row text-info align-content-end justify-content-end rounded-3 px-2 py-1 bg-light bg-opacity-10">
                                        <img className="avatar-tiny me-2" width={20}
                                            title={`${user.username}`}
                                            src={user.avatar || `https://ui-avatars.com/api/?name=${user.username}&background=random&bold=true&rounded=true`} alt={`user ${user.username}`} />
                                        {user.username}
                                    </div>
                                </div>
                                <ul className="dropdown-menu dropdown-menu-start dropdown-menu-lg-end align-items-start" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to="/dashboard">
                                        <i className="fa-regular fa-user me-2"></i>
                                        Dashboard
                                    </Link></li>
                                    {/* <li><Link className="dropdown-item" to="/settings">
                                        <i className="fa-solid fa-gear me-2"></i>
                                        Settings
                                    </Link></li> */}
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="/logout">
                                        <i className="fa-solid fa-right-from-bracket me-2"></i>
                                        Logout</Link></li>
                                </ul>
                            </div>
                        </div>
                        {/* notification
                        <div className="nav-item ms-2 me-auto me-lg-3 bg-light bg-opacity-10 py-1 px-2 rounded-2">
                            <Link className="nav-link " to="/notifications">
                                <div className='fa-layers fa-lg'>
                                    <i className="fa-regular fa-bell"></i>
                                    <i className="fa-solid fa-circle" data-fa-transform='shrink-10 up-4 right-4' color='red' ></i>
                                </div>
                            </Link>
                        </div> */}
                    </div>

                    :
                    <Link className='btn  rounded-3 px-2 py-1 bg-light bg-opacity-10 nav-link me-2 p-2 text-info' to="/login">
                        <i className="fa-regular fa-face-smile me-2"></i>
                        Login
                    </Link>
                }




                <button className="navbar-toggler ms-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>


            </div>

        </nav >
    )
}
export default Navbar;
