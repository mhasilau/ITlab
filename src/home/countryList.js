import { countries } from '../api/api-config';

const countryInp = document.getElementById('country');

export const lists = () => {
  fetch(countries)
    .then( response => response.json())
    .then( json => {
      json.forEach( element => {
        const country = document.createElement('option');
        country.textContent = element.name;
        countryInp.appendChild(country);
      })
    });
  countryInp.innerHTML = null;
}
