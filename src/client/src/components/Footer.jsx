import React from "react";
import { BRAND } from "../context/Const"
import Logo from "./Utils/Logo";

function Footer() {

    return (
        <footer className="d-flex py-3 bg-light justify-content-center align-items-center"
            style={{
                height: '5vh',
            }}
        >
            <Logo textStyle='muted' />
            <div className='d-none d-md-inline-flex text-muted'>
                |<a href="https://github.com/jhu-oose-f22/jobstation" className='ms-2 text-muted text-decoration-none' target="Github">
                    <i className="fa-brands fa-github text-dark fa-xl"></i>
                    <span className='ms-2'>Team {BRAND}, OOSE, CS@JHU</span>
                </a>
                <div className="ms-2" >
                    | Built with
                    <a href="https://reactjs.org/" className="text-muted  text-decoration-none" target="React">
                        <i className="fa-brands fa-react ms-1"></i>React
                    </a>
                    <a href="https://getbootstrap.com/" className="text-muted  text-decoration-none" target="React">
                        <i className="fa-brands fa-bootstrap ms-1"></i>Bootstrap
                    </a>
                </div>
            </div>

        </footer>
    );
}

export default Footer;
