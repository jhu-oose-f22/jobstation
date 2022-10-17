import React from "react";
import { Brand } from "../context/const";


export default function Logo(props) {
    const textStyle = 'text-' + (props.textStyle || 'white');

    return (<a href="/" className='navbar-brand d-inline-flex flex-row align-items-center me-2 text-decoration-none'
        aria-label={Brand + ', OOSE'}>
        <img src="favicon.ico"
            className=''
            height="20"
            width="20"
            alt="" />
        <span className={"ms-2 " + textStyle}>{Brand}</span>
    </a>);
}