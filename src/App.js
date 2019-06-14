import React, {useState, useEffect} from 'react';
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import Error from "./components/Error";
import Clima from "./components/Clima";

function App() {
  // state principal
  const [ciudad, guardarCiudad] = useState('');
  const [pais, guardarPais] = useState('');
  const [error, guardarError] = useState(false);
  const [resultado, guardarResultado] = useState({});

  // el effect toma el lugar de componentDidMount y de componentDidUpdate
  useEffect(() => {
    // ejecuta cuando existe un cambio en una de las dependencias
    // estara al pendiente del cambio del state y ejecutara
    const consultarAPI = async () => {
      const appID = 'ceb5e5ccab9b76adad130b4b778ddbae';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;
      // consultar la url
      const respuesta = await fetch(url);
      const resultadoAPI = await  respuesta.json();
      guardarResultado(resultadoAPI);
      console.log(resultadoAPI);
    };
    // prevenit primara ejecuacion
    if (ciudad === '') return;
    // llamado a la api
    consultarAPI();
  }, [ciudad, pais]);




  const datosConsulta = datos => {
    // validar que ambos campos esten
    if (datos.ciudad === '' || datos.pais === '') {
      // error
      guardarError(true);
      return;
    }
    // Agregar los datos al state
    guardarCiudad(datos.ciudad);
    guardarPais(datos.pais);
    guardarError(false);
  };





  // Cargar un componente condicionalmente
  let componente;
  if (error) {
    // hay un error, mostrarlos
    componente = <Error mensaje="Ambos campos son obligatorios"/>
  } else if (resultado.cod === "404") {
    componente = <Error mensaje="La ciudad no existe en nuestro registro"/>
  }
  else {
    // mostrar el clima
    componente = <Clima
                    resultado = {resultado}
                  />;
  }

  return (
    <div className="App">
      <Header
        titulo='Clima React App'
      />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col s12 m6">
              <Formulario
                datosConsulta={datosConsulta}
              />
            </div>
            <div className="col s12 m6">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
