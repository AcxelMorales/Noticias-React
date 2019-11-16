import React, { useState, useEffect } from 'react';

import Header from './components/Header'
import Formulario from './components/Formulario';
import Error from "./components/Error";
import Resultado from './components/Resultado';

function App() {
  // State principal (separado)
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [err, setErr] = useState(false);
  const [result, setResult] = useState({});

  useEffect(() => {
    // Prevenir la peticion de inicio
    if (city === '') return; // Ocupamos city, ya que pais es el mismo resultado

    const getDataAPI = async () => {
      let apiId = '7b53a249f3f179c9a4fd947524ea30bd';
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiId}`;
  
      const resp = await fetch(url);
      const resultado = await resp.json();
      
      setResult(resultado);
    }

    getDataAPI(); 
  }, [city, country]);

  const getData = datos => {
    // Validar campos
    if (datos.ciudad === '' || datos.pais === '') {
      setErr(true);
      return;
    }

    setCity(datos.ciudad);
    setCountry(datos.pais);
    setErr(false);
  }

  // Cargar un componente condicionalmente
  let componente;
  if (err) {
    componente = <Error mensaje='Ambos campos son obligatorios' />    
  } else if (result.cod === '404') {
    componente = <Error mensaje='Los valores no coinciden' />
  } else {
    componente = <Resultado result={result} />
  }

  return (
    <div className="App">
      <Header
        titulo='Clima React'
      />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col s12 m6">
              <Formulario
                getData={getData}
              />
            </div>
            <div className="col s12 m6">{componente}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
