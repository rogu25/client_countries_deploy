import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import CardFormActivity from '../components/CardFormActivity';

import { get_all_countries } from "../redux/action/index";

function FormActividad() {

  const dispatch = useDispatch();

  const paises = useSelector((state) => state.countries);

  useEffect(() => {
    if(!paises.length){
      dispatch(get_all_countries());
    }
  },[dispatch, paises]);

  return (
    <div className='contenedor_form_activity'>
      {
        <CardFormActivity paises={ paises.countries }/>
      }
    </div>
  )
}

export default FormActividad;