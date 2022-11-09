import axios from 'axios';
import React, { useContext, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../../context/Const';
import { UserContext } from '../../../context/User';

import './InfoBar.css';

const InfoBar = ({ group }) => {
  const { user } = useContext(UserContext);
  const [isUserSelected, setisUserSelected] = useState(false);
  const navigate = useNavigate();

  const handleOutline = () => {
    setisUserSelected(!isUserSelected);
  };

  return (
    <div className="w-100 d-flex flex-row align-items-center bg-dark bg-opacity-75 text-white py-1">
      <div className="w-100  h-100 d-flex flex-row align-items-center justify-content-between ">
        {/* Left Sidebar */}
        <button className='btn btn-dark me-auto ms-3 p-0 info-bar'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#sidebarLeft' aria-expanded="false"
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
        >{group.groupName}</h3>

        {/* dropdown */}
        <div className='dropdown dropdown-menu-start'>
          <button className='btn p-0 info-bar ms-2'
            type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
          >
            <i className="fa-solid fa-caret-down text-white"></i>
          </button>


          {/* Menu */}
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">

            {/* Settings */}
            <button className="btn dropdown-item" type="button"
              data-bs-toggle="modal" data-bs-target="#settingModal"
            ><i className='fa-solid fa-gear'></i> Settings</button>

            <div className='dropdown-divider'></div>

            {/* Quit */}
            <div className="btn dropdown-item text-danger" onClick={() => {
              const quit = window.confirm('Are you sure you want to leave this group?')
              if (quit) {
                axios.post(API_URL + '/group/quit',
                  {
                    groupId: group._id,
                    username: user.username,
                  }).then(() => {
                    window.alert('You have left the group');
                    navigate('../');
                  }
                  )
              }
            }}><i className="fa-solid fa-right-from-bracket me-2"></i><span>Quit group</span></div>
          </div>
        </div>


        {/* buttons */}
        <div className='ms-auto me-2'>
          {/* TODO: Add more */}
          {/* users */}
          <button className='btn btn-dark ms-1 p-0 info-bar'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#sidebarUser' aria-expanded="true"
          >
            <i className='fa-solid fa-user-group' color='white'></i>
          </button>
          <button className='btn m-2 px-0 py-1 info-bar'>
            <Link to="../">
              <i className='fa-solid fa-xmark fa-lg' color='white'></i>
            </Link>
          </button>
        </div>
      </div>
    </div >
  )
};

export default InfoBar;