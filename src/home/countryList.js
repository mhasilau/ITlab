import { countries } from '../api/api-config';
import { LocalStorageClass } from '../shared/local-storage/ls-config';

const countryInp = document.getElementById('country');
const countryLS = document.createElement('option');


export const lists = () => {
  countryInp.append(countryLS);
  LocalStorageClass.getCountry() ?
  countryLS.textContent = LocalStorageClass.getCountry() :
  countryLS.textContent = LocalStorageClass.getUserData().country;
  fetch(countries)
    .then( response => response.json())
    .then( json => {
      json.forEach( element => {
        const country = document.createElement('option');
        country.textContent = element.name;
        countryInp.append(country);
      })
    });
  countryInp.innerHTML = null;
}
