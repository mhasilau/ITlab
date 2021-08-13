import { countries } from '../api/api-config';

const countryInp = document.getElementById('country');
const list = new XMLHttpRequest();

list.open('GET', countries);
list.responseType = 'json';
list.send();

export const lists = () => {
  console.log(list.response[0].name);

  list.forEach( country => {
    console.log(country); 
  });
  countryInp.onclick = () => {
  }



  // fetch(countries)
  //  .then(response => response.json())
  //  .then(json => {
  //      console.log(json);
       
  //  })
  // list.onload = () => {
  //   const country = request.responseType;
  //   console.log(country);
  // }
}