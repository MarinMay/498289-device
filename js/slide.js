'use strict';
(function () {
  var slideSwithes = document.querySelectorAll('input[name="slider-control"]');

  function togglesSlider() {
    slideSwithes[0].checked = true;

    setTimeout(function () {
      slideSwithes[1].checked = true;
    }, 3000);

    setTimeout(function () {
      slideSwithes[2].checked = true;
    }, 6000);
  }

  togglesSlider();

  setInterval(function () {
    togglesSlider();
  }, 9000);
})();
