import React from 'react';
import { useDispatch } from "react-redux";


import "../css/CardFilter.css";
import { filtradoCountries, get_all_countries } from '../redux/action';

function CardFilter({ countries }) {

    const dispatch = useDispatch();

    const onchangeSelectFilter = (ev) => {
        if(ev.target.value === "asc"){
            const ascender = countries.sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0));
            dispatch(filtradoCountries({filtro:ev.target.value, countries:ascender}));
        }
        if(ev.target.value === "desc"){
            const descender = countries.sort((b, a) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0));
            dispatch(filtradoCountries({filtro:ev.target.value, countries:descender}));
            
        }
        if(ev.target.value === "all"){
            dispatch(get_all_countries());
        }
        if(ev.target.value === "mas"){
            const masPoblacion = countries.sort((b, a) => (Number(a.poblacion) > Number(b.poblacion) ? 1 : Number(a.poblacion) < Number(b.poblacion) ? -1 : 0));
            dispatch(filtradoCountries({filtro:ev.target.value, countries:masPoblacion}));
            
        }
        if(ev.target.value === "menos"){
            const menosPoblacion = countries.sort((a, b) => (Number(a.poblacion) > Number(b.poblacion) ? 1 : Number(a.poblacion) < Number(b.poblacion) ? -1 : 0));
            dispatch(filtradoCountries({filtro:ev.target.value, countries:menosPoblacion}));
        }
    };

    return (
        <div className='contenedor_filter'>
            <div className='content_select'>
                <h5>Order Alfabetico</h5>
                <select onChange={onchangeSelectFilter}>
                    <option>seleccionar</option>
                    <option value='all'>Todos</option>
                    <option value={'asc'}>Aa-Zz</option>
                    <option value={'desc'}>Zz-Aa</option>
                </select>
            </div>
            <div className='content_select'>
                <h5>Cant. Habitantes</h5>
                <select onChange={onchangeSelectFilter}>
                    <option>seleccionar</option>
                    <option value='all'>Todos</option>
                    <option value={'mas'}>Más</option>
                    <option value={'menos'}>Menos</option>
                </select>
            </div>
        </div>
    )
}

export default CardFilter;