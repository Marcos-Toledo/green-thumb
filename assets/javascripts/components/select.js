const itens = document.querySelectorAll('.gt-select li');
const labels = document.querySelectorAll('.open-select');

export const select = {
  openSelect: function() {
    this.closest('.gt-select').classList.add('open');
  },

  deselect: function(parentNode) {
    const li = parentNode.querySelectorAll('li');
    
    li.forEach(item => item.classList.remove('selected'));
  },

  closeAllSelect: function(element) {
    const selects = document.querySelectorAll('.gt-select')
      
    selects.forEach(item => {
      if (!element.target.classList.contains('open-select')) {
        item.classList.remove('open')
      }
    })
  },

  init: function() {labels.forEach(item => {
      item.addEventListener('click', this.openSelect);
    });
    
    itens.forEach(item => {
      item.addEventListener('click', function(el) {
        let span = el.target.closest('.gt-select').firstElementChild
        let ul = el.target.parentNode;
        
        span.innerText = el.target.textContent;
    
        this.deselect(ul);
        el.target.classList.add('selected');
      }.bind(this));
    });
    
    document.addEventListener('click', this.closeAllSelect);
  }
}