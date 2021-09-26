import apiCall from './lib/apiCall.js';
import { filteringAnArray } from './lib/filterAnArray.js';
import renderCards from './components/renderCards.js';

const api = await apiCall('https://fakestoreapi.com/products');
const loading = document.querySelector('.loading');

let prodCards = '';

function cardHtml(params) {
  loading.innerHTML = ``;
  params.forEach((element) => {
    prodCards += `
          <div class="col-4">
              <div class="prodCard">
                <img src="${element.image}" alt="Image of ${element.title}" class="prodCard__img"/>
                  <h1>${element.title}</h1>
                  <p>${element.price}</p>
              </div>
          </div>
          `;
  });
}

cardHtml(api);
renderCards(prodCards, '.prodContainer');

console.log(api);

let search = document.querySelector('.search');
let searchResults = document.querySelector('.prodContainer');

search.onkeyup = function () {
  searchResults.innerHTML = '';

  let filteredArray = filteringAnArray(api, search.value);

  filteredArray.forEach((element) => {
    document.querySelector('.prodContainer').innerHTML += `
    <div class="col-4">
    <div class="prodCard">
      <img src="${element.image}" alt="Image of ${element.title}" class="prodCard__img"/>
        <h1>${element.title}</h1>
        <p>${element.price}</p>
    </div>
</div>
          `;
  });

  // if (filteredArray === []) {
  //   console.log('hello');
  // }
};
