import { useEffect, useRef, useState } from 'react';
import ProductForm from './components/Products/ProductForm';
import ProductList from './components/Products/ProductList';
import FoodList from './components/Foods/FoodList';
import FoodForm from './components/Foods/FoodForm';
import Sidebar from './components/sidebar/Sidebar';
import Layout from './components/layout/Layout';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import './App.css';

function App() {
  return (
    <div className="App mt-5">
      {/* 
      <div id="kamera">
        <button onClick={openCam}>Kamerayı Aç</button>
        <div>
          <video ref={video} autoPlay muted hidden />
          <canvas ref={canvas} />
          {barcode && (
            <div>
              Bulunan barkod: {barcode}
            </div>
          )}

        </div>
      </div> */}

      <Router>
        <div className="App">
          <Sidebar />
          <div id="bodyId">
            <Layout />
          </div>
        </div>
        
      </Router>




      <div style={{ width: '100%', color: 'red', height: '150px' }}>

      </div>


    </div>
  );
}

export default App;
