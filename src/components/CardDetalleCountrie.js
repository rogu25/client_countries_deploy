import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";

import { get_all_activity, create_activities, get_id_countries } from "../redux/action/index";

function CardDetalleCountrie({ country }) {
    
    
    const [active, setActive] = useState(false);
    const [actividades, setActividades] = useState([]);
    
    const dispatch = useDispatch();
    
    const lista_actividades = useSelector((state) => state.activities);
    const avisos = useSelector((state) => state.avisos);
    const detalle_country = useSelector((state) => state.detalle_country);
    
    const { id, name, continente, capital, subregion, area, poblacion, imagen, Activities } = detalle_country;

    const onclickActivarListaActividad = (e) => {
        if (active) {
            setActive(false)
            e.target.textContent = "Mostrar Lista Actividades";
            dispatch(get_id_countries(id));
        } else {
            setActive(true)
            e.target.textContent = "Ocultar Lista Actividades";
            if (!lista_actividades.length) dispatch(get_all_activity());
        }
    };

    const onclickSelectActivity = (e) => {

        const repetido = actividades.find((f) => f.id === Number(e.target.value));

        if (repetido) return

        const filtros = lista_actividades.filter((f) => f.id === Number(e.target.value))

        setActividades([...actividades, ...filtros])

    };

    const onclickSubmitActividades = () => {

        const idActivities = actividades.map((a) => a.id);

        const obj = {
            idPais: id,
            name: "",
            dificultad: "",
            duracion: "",
            temporada: "",
            countries: [],
            activities: idActivities
        }
        dispatch(create_activities(obj));
        setActividades([]);
    };

    const onclickEliminarSeleccionado = (ev) => {

        const eliminar = actividades.filter((f) => f.id !== Number(ev.target.id));

        setActividades(eliminar);
    };
    
    return country && (
        <React.Fragment>
            <div className='detalle_countrie'>
                <div className='card_detalle_countrie'>
                    <div className='content_encabezado'>
                        <div className='contenedor_imagen'>
                            <div className='content_img'>
                                <img src={imagen} alt='Imagen not found' className='img_pais' />
                            </div>
                        </div>
                        <h2>{name}</h2>
                        <h4>Código: {id}</h4>
                        <h4>Continente: {continente && continente.replace(/[^a-zA-Z0-9 ]/g, '')}</h4>
                        <h4>Capital: {capital && capital.replace(/[^a-zA-Z0-9 ]/g, '')}</h4>
                        <h4>Sub-Región: {subregion}</h4>
                        <h4>Área: {new Intl.NumberFormat('es-PE').format(area)} Km2</h4>
                        <h4>Población: {new Intl.NumberFormat('es-PE').format(poblacion)} Habitantes</h4>
                    </div>

                    <div className={active ? 'activar_lista':'content_activities'} id='top'>
                        <h3 className='t_activities'>Actividades</h3>
                        {
                            Activities && Activities.map((a) => {
                                return <React.Fragment key={a.id}>
                                    <div className='description_activities'>
                                        <h4>{a.name}</h4>
                                        <h5>Dificultad: {a.dificultad}</h5>
                                        <div className='rango'>
                                            <span>1</span><input type='range' min={1} max={5} value={a.dificultad} disabled={true} step={1} /><span>max 5</span>
                                        </div>
                                        <h5>Duracion: {a.duracion} h</h5>
                                        <h5>Temporada: {a.temporada}</h5>
                                    </div>
                                </React.Fragment>
                            })
                        }

                    </div>
                    <div className={active ? 'content_activities' : 'activar_lista'}>
                        <h3 className='t_activities'>Lista de Actividades</h3>
                        <select className='lista_activity'
                            onChange={onclickSelectActivity}
                            id='lista_activity'
                        >
                            <option>actividades...</option>
                            {
                                lista_actividades.length && lista_actividades.map((l) => {
                                    return (
                                        <option key={l.id}
                                            value={l.id}
                                        >{l.name}</option>
                                    )
                                })
                            }
                        </select>
                        <div className='content_seleccionados'>
                            {
                                actividades.length ? actividades.map((a, i) => {
                                    return (<span key={i}>{a.name}<button
                                        id={a.id}
                                        onClick={onclickEliminarSeleccionado}
                                    > X</button></span>)
                                }) : <p>Seleccione activiades</p>
                            }
                        </div>
                        {avisos.mensaje && !actividades.length && <span>{avisos.mensaje}</span>}
                        {avisos.error && !actividades.length && <span>{avisos.error}</span>}
                        <div className='content_botones_lista'>
                            <button
                                className='btn_detalle'
                                onClick={onclickSubmitActividades}
                                disabled={actividades.length ? false : true}
                            >Agregar</button>
                        </div>
                    </div>
                </div>
                <div className='content_botones'>
                    <NavLink to={"/home"}>
                        <button className='btn_detalle'>Regresar</button>
                    </NavLink>
                    <NavLink to={`/formulario/${id}`}>
                        <button className='btn_detalle'>Agregar Actividad</button>
                    </NavLink>
                    <button
                        className='btn_detalle'
                        onClick={onclickActivarListaActividad}
                    >Mostrar Lista Actividades</button>
                </div>
            </div>
        </React.Fragment>
    )

}

export default CardDetalleCountrie;