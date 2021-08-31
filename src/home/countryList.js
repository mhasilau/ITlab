import { countries } from '../api/api-config';
import { LocalStorageClass } from '../shared/local-storage/ls-config';

const countryInp = document.getElementById('country');
const countryLS = document.createElement('option');

export const lists = () => {
  LocalStorageClass.getCountry() ?
  countryLS.textContent = LocalStorageClass.getCountry() :
  countryLS.textContent = LocalStorageClass.getUserData().country;
  console.log(countryLS.textContent);
  fetch(countries)
  .then( response => response.json())
  .then( json => {
      countryInp.append(countryLS);
      json.forEach( element => {
        const country = document.createElement('option');
        country.textContent = element.name;
        countryInp.append(country);
      })
    });
  countryInp.innerHTML = null;
}
