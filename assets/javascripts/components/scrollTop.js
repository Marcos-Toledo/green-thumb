const btnScrollTop = document.querySelector('#gt-scroll-top');

function scrollTop() {
  window.scrollTo(0, 0);
}

btnScrollTop.addEventListener('click', scrollTop);