import React from 'react';


function Clima({resultado}) {
  console.log(resultado);

  //extraer los valores
  const {name, main} = resultado;
  if (!name) return null;

  // restar grados kelvin
  const kelvin = 273.15;

  return (
    <div className="card-panel white col s12">
      <div className="black-text">
        <h>El clima de {name} es :</h>
        <p className="temperatura">
          { parseInt(main.temp - kelvin, 10)} <span>&#x2103;</span>
        </p>
        <p>
          Temperatura Máxima : { parseInt(main.temp_max - kelvin, 10)} &#x2103;
        </p>
        <p>
          Temperatura Minima : { parseInt(main.temp_min - kelvin, 10)} &#x2103;
        </p>

      </div>
    </div>
  );
}

export default Clima;
