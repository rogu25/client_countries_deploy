import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import "../css/FormActivity.css";
import { NavLink, useParams } from 'react-router-dom';

import { validation_form } from "./Validador";

import { create_activities } from "../redux/action/index";

// import { FaSearch } from "react-icons/fa";

function CardFormActivity({ paises }) {

  const { idPais } = useParams();

  const dispatch = useDispatch();
  const avisos = useSelector((state) => state.avisos);

  const [pais, setPais] = useState([]);
  const [listaPaises, setListaPaises] = useState([]);
  const [error, setError] = useState({});
  const [inputs, setInputs] = useState({
    name: "",
    dificultad: "5",
    duracion: 1,
    temporada: "",
    countries: []
  })

  const [activar, setActivar] = useState(true);

  const onChangeInput = (e) => {

    setError(validation_form({...inputs, [e.target.name]: e.target.value }));

    if (!e.target.value.length) return setPais([])

    const result = paises.filter((p) => {
      if (p.name.toLowerCase().includes(e.target.value)) {
        return {
          id: p.id,
          name: p.name
        }
      }
      return null
    });
    setPais(result);

  };

  const onClickListaPaises = (e) => {
    
    const repetido = listaPaises.find((f) => f.name === e.target.value);

    const agregarPais = paises.filter((p) => p.name === e.target.value);

    const codigoCountries = agregarPais.map((c) => c.id);

    if (repetido) return

    setListaPaises([...listaPaises, ...agregarPais]);
    
    setInputs((prev) => ({ ...prev, countries: [...prev.countries, ...codigoCountries] }));
    
    setError(validation_form({ ...inputs, countries: [...inputs.countries, ...codigoCountries] }));

    setActivar(false);

  };

  const onchangeInputs = (ev) => {

    setInputs((prev) => ({ ...prev, [ev.target.name]: ev.target.value }));
    
    setError(validation_form({ ...inputs, [ev.target.name]: ev.target.value }));
    setActivar(false);

  };

  const onchangeSelect = (ev) => {

    setInputs((prev) => ({ ...prev, [ev.target.options[ev.target.selectedIndex].id]: ev.target.value }));

    setError(validation_form({ ...inputs, [ev.target.name]: ev.target.value }));

  };

  const onclickEliminarLista = (ev) => {

    const eliminar = listaPaises.filter((e) => e.id !== ev.target.id);
    setListaPaises(eliminar);
    setInputs((prev) => ({ ...prev, countries: eliminar.map((a) => a.id) }));
    setError((prev) => ({ ...prev, countries: eliminar.map((a) => a.id) }));
    
  };

  const onclik_new_activity = (ev) => {

    ev.preventDefault();

    if (Object.keys(error).length === 0 ) {
      dispatch(create_activities(inputs));
    }

  }

  const onclikLimpiar = () => {
    window.location.reload();
  }

  useEffect(() => {
    
    if (idPais !== 'false') {
      const agregarPais = paises.filter((p) => p.id === idPais);
      setListaPaises(agregarPais);
      setInputs((prev) => ({ ...prev, countries: [idPais] }));
    }

  }, [idPais, paises]);

  useEffect(() => {

    if(avisos.mensaje){
      alert(`${avisos.mensaje}`)
      window.location.reload();
    }

    if(avisos.error)alert(`${avisos.error}`)

    //eslint-disable-next-line react-hooks/exhaustive-deps

  }, [avisos.mensaje, avisos.error]);

  return (
    <div className='content_form'>
      <h2>Formulario de creación de Actividades</h2>
      <div className='formulario'>
        <div className='descripcion'>
          <form className='form_description' id='form_activity' method='POST' onSubmit={onclik_new_activity}>
            <div className='div_inputs'>
              <p>Nombre: </p>
              <input name='name' type='text' id='name' onChange={onchangeInputs} autoComplete='of' />
              <span className='errors'>{error.name && error.name}</span>
              <span className='errors'>{avisos.error && avisos.error}</span>
              <span className='mensaje'>{avisos.mensaje && avisos.mensaje}</span>
            </div>
            <div className='div_inputs'>
              <p>Dificultad: <span>{inputs.dificultad}</span></p>
              <input name='dificultad' id='dificultad' type='range' min={1} max={5} step={1} onChange={onchangeInputs} />
            </div>
            <div className='div_inputs'>
              <p>Duracion: </p>
              <input name='duracion' min={1} defaultValue={1} id='duracion' type='number' className='numero' onChange={onchangeInputs}/>
            </div>
            <div className='div_inputs'>
              <p>Temporada: </p>
              <select onChange={onchangeSelect} id='temporada' name='temporada'>
                <option value={""}>Elija una estación del año</option>
                <option id='temporada' value={'primavera'}>Primavera</option>
                <option id='temporada' value={'verano'}>Verano</option>
                <option id='temporada' value={'otono'}>Otoño</option>
                <option id='temporada' value={'invierno'}>Invierno</option>
              </select>
              <span className='errors'>{error.temporada && error.temporada}</span>
            </div>
            <div className='content_btn_formulario'>
              <NavLink to={"/home"}>
                <button type='button'>Regresar</button>
              </NavLink>
              <button type='submit' id='grabar' disabled={activar}>Grabar</button>
              <button type='button' onClick={onclikLimpiar}>Limpiar</button>
            </div>
          </form>

        </div>
        <div className='content_lista_paises'>
          <div className='content_buscar'>
            <input type='text' id='name_pais' name='name_pais' onChange={onChangeInput} autoComplete='of' placeholder='filtrar paises' />
            <div>
              <span>{error.name_pais && error.name_pais}</span>
            </div>
          </div>
          <div className='content_select'>

            <select className='select_pais' id='select_pais' onChange={onClickListaPaises}>
              <option>seleccionar paises</option>
              {
                pais.length ? pais.map((p) => {
                  return (
                    <option key={p.id}>{p.name}</option>
                  )
                }) : paises.map((p) => {
                  return (
                    <option key={p.id}>{p.name}</option>
                  )
                })
              }
            </select>

          </div>
          <div className={listaPaises.length ? 'list_pais' : 'visible'}>
            <ul>
              {
                listaPaises.length && listaPaises.map((l, i) => {
                  return (
                    <li key={i}>{l.name} <button id={l.id} onClick={onclickEliminarLista}>x</button></li>
                  )
                }) 
              }
            </ul>
          </div>
            <span>{!inputs.countries.length && error.countries}</span>
        </div>
      </div>

    </div>
  )
}

export default CardFormActivity;