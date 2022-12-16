import React from "react";
import { Link } from "react-router-dom";
import { BRAND } from "../../context/Const";
import img from '../../favicon.ico'


export default function Logo(props) {
    const textStyle = 'text-' + (props.textStyle || 'white');

    return (<Link to="." className='navbar-brand d-inline-flex flex-row align-items-center me-2 text-decoration-none'
        aria-label={BRAND + ', OOSE'}>
        <img src={img}
            height={props.height || "20"}
            width={props.width || "20"}
            alt="logo" />
        <span className={"ms-2 " + textStyle}>{BRAND}</span>
    </Link>);
}