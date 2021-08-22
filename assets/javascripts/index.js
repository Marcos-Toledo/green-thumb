import Pet from '../images/icons/pet.svg';
import LowSun from '../images/icons/low-sun.svg';
import NoSun from '../images/icons/no-sun.svg';
import HighSun from '../images/icons/high-sun.svg';
import Toxic from '../images/icons/toxic.svg';
import OneDrop from '../images/icons/1-drop.svg';
import TwoDrop from '../images/icons/2-drops.svg';
import ThreeDrop from '../images/icons/3-drops.svg';

const dataValues = document.querySelectorAll('[data-value]');
const gridPlants = document.querySelector('#grid-plants');
const params = {
  sun: '',
  water: '',
  chew: ''
}

function formatPrams(element) {
  if(element.getAttribute('data-value') === 'chew') {
    params[element.getAttribute('data-value')] = element.textContent == 'Yes' ? true : false;
  } else {
    params[element.getAttribute('data-value')] = element.textContent.toLowerCase();
  }
}

function hasAllParams() {
  const { sun, water, chew } = params;

  if (sun.length > 0 && water.length > 0 && typeof chew != 'string') {
    return true;
  }

  return false;
}

function mountHtml(plants) {
  let htmlPlants = plants.map(plant => (`
    <div class="gt-grid-plant ${plant.staff_favorite === true ? 'gt-grid-plant-favorite' : ''}">
      <span class="gt-grid-plant-flag-favorite"></span>
      <div class="gt-grid-plant-wrap-image">
        <img src="${plant.url}" alt="${plant.name}" class="gt-grid-plant-image">
      </div>
      <p class="gt-grid-plant-name">${plant.name}</p>
      <div class="gt-grid-plant-info">
        <span class="gt-grid-plant-price">$${plant.price}</span>
        <ul class="gt-grid-plant-characteristics">
          ${plant.sun == 'no' ? `<li><img src="${NoSun}" alt=""></li>`: ''}
          ${plant.sun == 'low' ? `<li><img src="${LowSun}" alt=""></li>` : ''}
          ${plant.sun == 'high' ? `<li><img src="${HighSun}" alt=""></li>` : ''}
          ${plant.toxicity == true ? `<li><img src="${Toxic}" alt=""></li>` : `<li><img src="${Pet}" alt=""></li>`}
          ${plant.water == 'rarely' ? `<li><img src="${OneDrop}" alt=""></li>` : ''}
          ${plant.water == 'regularly' ? `<li><img src="${TwoDrop}" alt=""></li>` : ''}
          ${plant.water == 'daily' ? `<li><img src="${ThreeDrop}" alt=""></li>` : ''}
        </ul>
      </div>
    </div>
  `));

  gridPlants.innerHTML = htmlPlants.join('');
}

function renderPlants(plants) {
  const emptyState = document.querySelector('#empty-state');
  const listPlants = document.querySelector('#list-plants');

  if (plants.length > 0) {  
    emptyState.style.display = 'none';
    listPlants.style.display = 'block';

    mountHtml(plants);
  } else {
    emptyState.style.display = 'block';
    listPlants.style.display = 'none';
  }
}

function getPlants() {
  const { sun, water, chew } = params;
  const URL = 'https://front-br-challenges.web.app/api/v2/green-thumb/'

  fetch(`${URL}?sun=${sun}&water=${water}&pets=${chew}`)
    .then(response => response.json())
    .then(data => renderPlants(data))
    .catch(error => console.log(error));
}

dataValues.forEach(element => {
  element.addEventListener('click', function() {

    formatPrams(this);
    
    if (hasAllParams()) {
      getPlants();
    }
  });
});