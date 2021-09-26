import apiCall from './lib/apiCall.js';
import { filteringAnArray } from './lib/filterAnArray.js';
import renderCards from './components/renderCards.js';

const api = await apiCall('https://fakestoreapi.com/products');
const loading = document.querySelector('.loading');

let prodCards = '';

function cardFiller(param) {
  param.forEach((element) => {
    loading.innerHTML = ``;
    prodCards += `
            <div class="col-3">
              <div class="card prodCard">
                <div class="prodCard__imgDiv">
                  <img src="${element.image}" class="card-img-top prodCard__img" alt="image of ${element.title}">
                </div>
                <div class="card-body prodCard__body">
                  <h5 class="card-title">${element.title}</h5>
                  <p class="card-text">Price: ${element.price}</p>
                  <a href="#" class="btn btn-primary">Favorite</a>
                </div>
              </div>
            </div>
            `;
  });
}
cardFiller(api);
renderCards(prodCards, '.prodContainer');

let search = document.querySelector('.search');
let searchResults = document.querySelector('.prodContainer');
let results = document.querySelector('.results');

search.onkeyup = function () {
  searchResults.innerHTML = '';
  prodCards = '';

  let filteredArray = filteringAnArray(api, search.value);

  cardFiller(filteredArray);
  renderCards(prodCards, '.prodContainer');

  if (filteredArray.length === 0) {
    results.innerHTML = `Sorry no products matching that price`;
  } else {
    results.innerHTML = '';
  }
};

let refresh = document.querySelector('.refresh');

refresh.onclick = () => {
  cardFiller(api);
  renderCards(prodCards, '.prodContainer');
  results.innerHTML = '';
};
