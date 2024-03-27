import React from 'react';
import { useSelector } from "react-redux";

import CardDetalleCountrie from '../components/CardDetalleCountrie';

import "../css/DetalleCountrie.css";

function DetalleCountrie() {

    const detalleCountry = useSelector((state) => state.detalle_country);

    return (
        <div className='contenedor_card_detalle_countrie'>
            <CardDetalleCountrie country={detalleCountry}/>
        </div>
    )
}

export default DetalleCountrie;