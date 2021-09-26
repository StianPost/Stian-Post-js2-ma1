import apiCall from './lib/apiCall.js';
import { filteringAnArray } from './lib/filterAnArray.js';
import renderCards from './components/renderCards.js';
import { saveToStorage, getStorageItem } from './lib/localStorageHelpers.js';

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
                  <a data-id="${element.id}" 
                    data-price="${element.price}" 
                    data-title="${element.title}"
                    data-image="${element.image}"
                    data-description="${element.description}" 
                    href="#" class="btn btn-primary prodCard__btn favBtn">Favorite
                  </a>
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
  searchResults.innerHTML = '';
  cardFiller(api);
  renderCards(prodCards, '.prodContainer');
  results.innerHTML = '';
};

let favoriteArray = document.querySelectorAll('.favBtn');

favoriteArray.forEach((element) => {
  element.onclick = (e) => {
    e.preventDefault();
    element.classList.toggle('faved');
    let localStorageObject = {
      id: element.dataset.id,
      price: element.dataset.price,
      title: element.dataset.title,
      image: element.dataset.image,
      description: element.dataset.description,
    };

    let favourites = getStorageItem('favourites');

    let isInStorage = favourites.find(
      (productObject) => productObject.id === localStorageObject.id
    );
    if (isInStorage === undefined) {
      favourites.push(localStorageObject);
      saveToStorage('favourites', favourites);
    } else {
      let removedElementArray = favourites.filter(
        (productObject) => productObject.id !== localStorageObject.id
      );
      saveToStorage('favourites', removedElementArray);
    }
  };
});
