import Pet from '../../images/icons/pet.svg';
import LowSun from '../../images/icons/low-sun.svg';
import NoSun from '../../images/icons/no-sun.svg';
import HighSun from '../../images/icons/high-sun.svg';
import Toxic from '../../images/icons/toxic.svg';
import OneDrop from '../../images/icons/1-drop.svg';
import TwoDrop from '../../images/icons/2-drops.svg';
import ThreeDrop from '../../images/icons/3-drops.svg';

const gridPlants = document.querySelector('#grid-plants');
const params = {
  sun: '',
  water: '',
  chew: ''
}

export const filter = {
  formatParams: function(element) {
    if(element.getAttribute('data-value') === 'chew') {
      params[element.getAttribute('data-value')] = element.textContent == 'Yes' ? true : false;
    } else {
      params[element.getAttribute('data-value')] = element.textContent.toLowerCase();
    }
  },
  
  hasAllParams: function() {
    const { sun, water, chew } = params;
  
    if (sun.length > 0 && water.length > 0 && typeof chew != 'string') {
      return true;
    }
  
    return false;
  },
  
  mountHtml: function(plants) {
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
  },
  
  renderPlants: function(plants) {
    const emptyState = document.querySelector('#empty-state');
    const listPlants = document.querySelector('#list-plants');
  
    if (plants.length > 0) {  
      emptyState.style.display = 'none';
      listPlants.style.display = 'block';
  
      this.mountHtml(plants);
    } else {
      emptyState.style.display = 'block';
      listPlants.style.display = 'none';
    }
  },
  
  getPlants: function() {
    const { sun, water, chew } = params;
    const URL = 'https://front-br-challenges.web.app/api/v2/green-thumb/'
  
    fetch(`${URL}?sun=${sun}&water=${water}&pets=${chew}`)
      .then(response => response.json())
      .then(data => this.renderPlants(data))
      .catch(error => console.log(error));
  },

  init: function() {
    const dataValues = document.querySelectorAll('[data-value]');
    
    dataValues.forEach(element => {
      element.addEventListener('click', function(el) {

        this.formatParams(el.target);
        
        if (this.hasAllParams()) {
          this.getPlants();
        }
      }.bind(this));
    });
  }
}