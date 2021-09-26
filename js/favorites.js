import { getStorageItem } from './lib/localStorageHelpers.js';

let favourites = getStorageItem('favourites');
let favContainer = document.querySelector('.favContainer');
let favResult = document.querySelector('.fav');

favourites.forEach((element) => {
  favContainer.innerHTML += `
  <div class="col">
              <div class="card favCardCard">
                <div class="favCard__imgDiv">
                  <img src="${element.image}" class="card-img-top prodCard__img" alt="image of ${element.title}">
                </div>
                <div class="card-body favCardCard__body">
                  <h5 class="card-title">${element.title}</h5>
                  <p class="card-text">Price: ${element.price}</p>
                  <p class="card-text">${element.description}</p>
                </div>
              </div>
            </div>
  `;
});

if (favourites.length === 0) {
  favResult.innerHTML = `You have no favourites`;
} else {
  favResult.innerHTML = '';
}
