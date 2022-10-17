import React from "react";
import { Brand } from "../context/const"
import Logo from "./Logo";

function Footer() {

    return (
        <footer className="d-flex border-top py-3 bg-light justify-content-center">
            <Logo textStyle='muted' />
            <div className='d-none d-lg-inline-flex text-muted'>
                |<a href="https://github.com/jhu-oose-f22/jobstation" className='ms-2 text-muted text-decoration-none' target="Github">
                    <i className="fa-brands fa-github text-dark fa-xl"></i>
                    <span className='ms-2'>Team {Brand}, OOSE, CS@JHU</span>
                </a>
                <div className="ms-2" >
                    | Built with
                    <a href="https://reactjs.org/" className="text-muted  text-decoration-none" target="React">
                        <i class="fa-brands fa-react ms-1"></i>React
                    </a>
                </div>
            </div>

        </footer>
    );
}

export default Footer;