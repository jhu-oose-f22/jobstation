import React from 'react';


import { CloseIcon, OnlineIcon } from './icons';
import { Link } from 'react-router-dom';

const InfoBar = ({ room }) => {
  return (
    <div className="w-100 d-flex flex-row align-items-center bg-dark bg-opacity-75 text-white border border-light border-opacity-50 " style={
      {
        borderRadius: '18px 0 0 0',
        overflow: 'clip'
      }
    }>
      <div className="col-10 d-flex align-items-center justify-content-center p-3">
        <div className='me-auto'></div>
        <div className='m-auto d-flex align-items-center'>
          <OnlineIcon />
          <h3 className='my-auto ms-3'>{room}</h3>
        </div>
      </div>
      <Link className='btn btn-outline-light  ms-auto me-2' to="../"><CloseIcon /></Link>
    </div>
  )
};

export default InfoBar;