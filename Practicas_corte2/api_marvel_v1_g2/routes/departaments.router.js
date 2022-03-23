const express = require('express');
const router = express.Router();
const departamentsJSON = require('../json/departaments.json');

/* REQUEST HTTP API RESTFUL*/

/* Endpoint: http://localhost:4000/api/v1/departaments */
router.get('/', (req, res) => {
  res.json(departamentsJSON);
});

/* Dependiendo del código del departamento que el usuario ingrese como parametro de la URI, gargar todos
los municipios que le corresponden */
/* Endpoint: http://localhost:4000/api/v1/departaments/search/66 */
router.get('/search/:departamentId', (req, res) => {
  const { departamentId } = req.params;
  const departaments_municipalities = departamentsJSON.filter(
    (departament) =>
      departament['c_digo_dane_del_departamento'] == departamentId
  );
  res.json(departaments_municipalities);
});

/* Consultar los departamentros que tienen un nombre con más de 15 caracteres */
/* Endpoint: http://localhost:4000/api/v1/departaments/name */
router.get('/name', (req, res) => {
  const departaments_array = departamentsJSON.filter(
    (departament) => departament['departamento'].length > 15
  );
  res.json(departaments_array);
});

/* 1. Mostrar los departamentos cuyo código dane es mayor a 15 y menor a 20 */
/* Endpoint: http://localhost:4000/api/v1/departaments/dane_code */
router.get('/dane_code', (req, res) => {
  const departaments_array = departamentsJSON.filter(
    (departament) => departament['c_digo_dane_del_departamento'] > 15 && departament['c_digo_dane_del_departamento'] < 20
  );
  res.json(departaments_array);
});

/* 2. Como parámetro opcional el usuario ingresa el código del departamento y se cargan sus municipios, validar si el usuario no ingresa el
código traer todo el JSON
Endpoint con parametro: http://localhost:4000/api/v1/departaments/search?departamentId=66
Endpoint sin parametro: http://localhost:4000/api/v1/departaments/search
*/
router.get('/search', (req, res) => {
  const {departamentId} = req.query;
  if(departamentId){
    const departaments_array = departamentsJSON.filter(
      (departament) => departament['c_digo_dane_del_departamento'] == departamentId
    );
    res.json(departaments_array);

  }else{
    res.json(departamentsJSON);
  }
});

/* 3. El usuario ingresa como parámetro opcional el nombre del municipio que desea consultar de lo contrario por defecto se cargan los
municipios de Caldas
Endpoint con parametro: http://localhost:4000/api/v1/departaments/municipalities?municipality=Pereira
Endpoint sin parametro: http://localhost:4000/api/v1/departaments/municipalities
*/
router.get('/municipalities', (req, res) => {
  const {municipality} = req.query;
  if(municipality){
    const departaments_array = departamentsJSON.filter(
      (departament) => departament['municipio'] == municipality
    );
    res.json(departaments_array);

  }else{
    const departaments_array = departamentsJSON.filter(
      (departament) => departament['departamento'] == 'Caldas'
    );
    res.json(departaments_array);
  }
});

/* 4. Mostrar todos los departamentos cuyo nombre inicia por la letra "C" */
/* Endpoint: http://localhost:4000/api/v1/departaments/c */
router.get('/c', (req, res) => {
  const departaments_array = departamentsJSON.filter(
    (departament) => departament['departamento'][0] == 'C'
  );
  res.json(departaments_array);
});

module.exports = router;