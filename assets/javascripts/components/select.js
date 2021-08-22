const itens = document.querySelectorAll('.gt-select li');
const labels = document.querySelectorAll('.open-select');

function openSelect() {
  this.closest('.gt-select').classList.add('open');
}

labels.forEach(item => {
  item.addEventListener('click', openSelect);
});

function deselect(parentNode) {
  const li = parentNode.querySelectorAll('li');

  li.forEach(item => item.classList.remove('selected'));
}

itens.forEach(item => {
  item.addEventListener('click', function() {
    let span = this.closest('.gt-select').firstElementChild
    let ul = this.parentNode;
    
    span.innerText = this.textContent;

    deselect(ul);
    this.classList.add('selected');
  });
});

function closeAllSelect(element) {
  const selects = document.querySelectorAll('.gt-select')
  
  selects.forEach(item => {
    if (!element.target.classList.contains('open-select')) {
      item.classList.remove('open')
    }
  })
}

document.addEventListener('click', closeAllSelect);