import React, { useState } from 'react';


import { OnlineIcon } from './icons';
import { Link } from 'react-router-dom';

import './InfoBar.css';

const InfoBar = ({ room }) => {
  const [isUserSelected, setisUserSelected] = useState(false);

  const handleOutline = () => {
    setisUserSelected(!isUserSelected);
  };

  return (
    <div className="w-100 d-flex flex-row align-items-center bg-dark bg-opacity-75 text-white p-2">
      <div className="w-100  h-100 d-flex flex-row align-items-center justify-content-between ">
        <Link className='button btn me-auto ms-2 ' to="../">
          <i className='fa-solid fa-arrow-left' color='white'></i>
        </Link>
        <i className="fa-solid fa-circle fa-sm" color='lightgreen'></i>
        <h3 className='ms-3 my-auto '
          style={{
            overflowX: "auto",
            overflowY: "clip"
          }}
        >{room}</h3>

        {/* tools */}
        <div className='ms-auto'>

          {/*  */}
          <button className='btn btn-dark p-0'
            type='button'
          >
            <i className="fa-solid fa-thumbtack"></i>
          </button>

          {/* users */}
          <button className='btn btn-dark ms-1 p-0'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#sidebar' aria-expanded="true"
          >
            <i className='fa-solid fa-user-group' color='white'></i>
          </button>
        </div>
      </div>
    </div>
  )
};

export default InfoBar;