import React from 'react';

import "../css/Home.css";

import Countries from '../components/Countries';
import Navbar from '../components/Navbar';
// import CardFilter from '../components/CardFilter';

function Home() {
  return (
    <div className='content_home'>
      <Navbar/>
      <Countries/>
    </div>
  )
}

export default Home;