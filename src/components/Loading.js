import React from 'react';

import "../css/Loading.css";

function Loading({ mensaje }) {
  return (
    <div className='content_loading'>
      <span className='mensaje'>
        {mensaje ? mensaje : '......Cargando'}
      </span>
    </div>
  )
}

export default Loading;