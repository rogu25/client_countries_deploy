import React from 'react';
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import "../css/Principal.css";

import { get_all_countries } from "../redux/action";

function Principal() {

  const dispatch = useDispatch();

  const onClickEntrar = () => {
    dispatch(get_all_countries());
  };

  return (
    <React.Fragment>
      <div className='content_principal'>
        <NavLink to={"/home"} className={"navlink_entrar"} onClick={onClickEntrar}>
          <div className='boton_entrar'>
            <span className='span_entrar'>ENTRAR</span>
          </div>
        </NavLink>
      </div>
    </React.Fragment>
  )
}

export default Principal;