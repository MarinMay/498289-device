'use strict';
(function () {
  var cards = document.querySelector('.cards');

  function isElementChildOverlay(element) {
    return element.classList.contains('product-card__add-to-cart') || element.classList.contains('product-card__add-to-compared');
  }

  cards.addEventListener('focus', function (evt) {
    if (isElementChildOverlay(evt.target)) {
      evt.target.parentNode.style.zIndex = '100';
    }
  }, true);

  cards.addEventListener('blur', function (evt) {
    if (isElementChildOverlay(evt.target)) {
      evt.target.parentNode.style.zIndex = '-100';
    }
  }, true);
})();
