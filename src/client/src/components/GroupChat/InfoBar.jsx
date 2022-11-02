import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import './InfoBar.css';

const InfoBar = ({ room }) => {
  const [isUserSelected, setisUserSelected] = useState(false);

  const handleOutline = () => {
    setisUserSelected(!isUserSelected);
  };

  return (
    <div className="w-100 d-flex flex-row align-items-center bg-dark bg-opacity-75 text-white py-1">
      <div className="w-100  h-100 d-flex flex-row align-items-center justify-content-between ">
        {/* Left Sidebar */}
        <button className='btn btn-dark me-auto ms-3 p-0'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#sidebar' aria-expanded="true"
        >
          <i className='fa-solid fa-list' color='white'></i>
        </button>


        {/* Room Title */}
        <i className="fa-solid fa-circle fa-sm" color='lightgreen'></i>
        <h3 className='ms-3 my-auto '
          style={{
            overflowX: "auto",
            overflowY: "clip"
          }}
        >{room}</h3>

        {/* buttons */}
        <div className='ms-auto me-2'>

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
          <button className='btn m-2 px-0 py-1'>
            <Link to="../">
              <i className='fa-solid fa-xmark fa-lg' color='white'></i>
            </Link>
          </button>
        </div>
      </div>
    </div>
  )
};

export default InfoBar;