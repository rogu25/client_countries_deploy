import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { get_all_countries, get_id_countries } from "../redux/action";

import CardCountry from './CardCountry';
import Loading from "../components/Loading.js";

import "../css/Countries.css";
import Pagination from './Pagination';
import CardFilter from './CardFilter.js';

function Countries() {

  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const mensaje = useSelector((state) => state.mensaje);

  const [backcountries, setBackCountries] = useState(0);
  const [nextcountries, setNextCountries] = useState(9);
  const [backpage, setBackPage] = useState(0);
  const [nextpage, setNextPage] = useState(5);

  const [id, setId] = useState(1);

  // const [activo, setActivo] = useState(false);

  let contadorCountries = countries.countries.length;
  let contadorPage = Math.ceil(countries.countries.length / 9.9);
  const items = 10;
  const page = 5;

  const elementos = Array.from({ length: contadorPage }, (_, index) => index + 1);

  const onclickSelectPage = (id) => {

    if (id === 1) {
      setBackCountries((items * id) - items);
      setNextCountries((items * id) - 1);
      setId(id);
      return
    }

    setBackCountries(((items * id) - items) - 1);
    setNextCountries((items * id) - 1);
    setId(id);

  }

  const onclickBackPage = () => {

    if (id <= (backpage + 1)) return

    if (id <= 1) return

    if (backcountries <= 9) {
      setBackCountries((backcountries - items) + 1);
      setNextCountries(nextcountries - items);
      setId(id - 1)
      return
    }

    setId(id - 1);
    setBackCountries(backcountries - items);
    setNextCountries(nextcountries - items);

  }

  const onclickNextPage = () => {

    if (id >= nextpage) return

    if (backcountries < 9) {
      setBackCountries((backcountries + items) - 1);
      setNextCountries(nextcountries + items);
      setId(id + 1)
      return
    }

    if (nextcountries >= contadorCountries) return

    setBackCountries(backcountries + items);
    setNextCountries(nextcountries + items);
    setId(id + 1)

  }

  const onclickChangeBackPage = () => {
    
    if (backpage < 1) return
    
    if ((id % page) === 1) {
      setId(id - page);
      
    }else if((id % page) === 0){
      setId(((id - page) - page) + 1);
    }else{
      setId(((id - page) - (id % page)) + 1);
    }
    setBackPage(backpage - page);
    setNextPage(nextpage - page);
  };

  const onclickChangeNextPage = () => {
    if (nextpage >= contadorPage) return

    if (id > contadorPage) return

    if (id === (contadorPage - 1)) {
      setBackPage(backpage + page);
      setNextPage(nextpage + 1);
      setId(id + 1);
      return
    }

    if ((id % page) === 1) {
      setId(id + page);
      
    }else if((id % page) === 0) {
      setId(id + 1);
    }else{
      setId(((id + page) - (id % page)) + 1);
    }
    setBackPage(backpage + page);
    setNextPage(nextpage + page);
    setBackCountries(((items * id) - items) - 1);
    setNextCountries((items * id) - 1);
  };

  const onclickCallBack = useCallback(() => {
    if (id === 1) {
      setBackCountries((items * id) - items);
      setNextCountries((items * id) - 1);
      setId(id);
      return
    }
    setBackCountries(((items * id) - items) - 1);
    setNextCountries((items * id) - 1);
    setId(id);
  }, [id]);

  const onclickSelectCardCountrie = (idCountrie) => {
    dispatch(get_id_countries(idCountrie));
  };

  useEffect(() => {
    !countries.countries.length && dispatch(get_all_countries());
  }, [countries.countries, dispatch]);


  return (
    <React.Fragment>
      <CardFilter countries = {countries.countries}/>
      <Pagination elementos={elementos} inicio={backpage} final={nextpage} id={id} onclickSelectPage={onclickSelectPage} onclickNextPage={onclickNextPage} onclickBackPage={onclickBackPage} onclickChangeNextPage={onclickChangeNextPage} onclickChangeBackPage={onclickChangeBackPage} onclickCallBack={onclickCallBack} />

      <div className='content_countries'>
        {
          countries.countries.length ? countries.countries.map((c) => {
            return (
              <CardCountry key={c.id} id={c.id} imagen={c.imagen} nombre={c.name} continente={c.continente} poblacion={c.poblacion} onclickSelectCardCountrie={onclickSelectCardCountrie}/>
            )
          }).slice(backcountries, nextcountries) :
          <Loading mensaje={mensaje}/>
        }
      </div>

    </React.Fragment>
  )
}

export default Countries;