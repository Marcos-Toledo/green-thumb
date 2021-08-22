export const backToTop = {
  scrollTop: function() {
    window.scrollTo(0, 0);
  },
  init: function() {
    const btnScrollTop = document.querySelector('#gt-scroll-top');
    btnScrollTop.addEventListener('click', this.scrollTop);
  }
}