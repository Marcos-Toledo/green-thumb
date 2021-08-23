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
            ${plant.sun == 'no' ? `<li class="plant-icon-no-sun"></li>`: ''}
            ${plant.sun == 'low' ? `<li class="plant-icon-low-sun"></li>` : ''}
            ${plant.sun == 'high' ? `<li class="plant-icon-high-sun"></li>` : ''}
            ${plant.toxicity == true ? `<li class="plant-icon-toxic"></li>` : `<li class="plant-icon-pet"></li>`}
            ${plant.water == 'rarely' ? `<li class="plant-icon-one-drop"></li>` : ''}
            ${plant.water == 'regularly' ? `<li class="plant-icon-two-drops"></li>` : ''}
            ${plant.water == 'daily' ? `<li class="plant-icon-three-drops"></li>` : ''}
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
