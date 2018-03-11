'use strict';
(function () {
  var buttonWriteUs = document.querySelector('.information__more--write-us');
  var popupWriteUs = document.querySelector('.pop-up--send-message');
  var buttonSubmitMessage = document.querySelector('.pop-up__submit');
  var name = document.querySelector('.pop-up__input--name');
  var email = document.querySelector('.pop-up__input--email');
  var message = document.querySelector('.pop-up__textarea');
  var buttonsClosePopup = document.querySelectorAll('.pop-up__close');
  var map = document.querySelector('.information__map');
  var popupMap = document.querySelector('.pop-up--map');
  var popups = document.querySelectorAll('.pop-up');
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

   function validateInput (input) {
    if (!input.validity.valid) {
      input.classList.add('pop-up__input--error');
    } else {
      input.classList.remove('pop-up__input--error');
    }
   }

   function onInputChange (evt) {
    validateInput (evt.target);
   }

  function onButtonSubmitMessageClick() {
    validateInput(name);
    validateInput(email);
    validateInput(message);
  }

  function onPopupPressEcs(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      popups.forEach(function (elem) {
        if (!elem.classList.contains('pop-up--hidden')) {
          elem.classList.add('pop-up--hidden');
        }
      });
    }
  }

  function onButtonWriteUsClick (evt) {
    popupWriteUs.classList.remove('pop-up--hidden');
    evt.preventDefault();
    document.addEventListener('keydown', onPopupPressEcs);
  }

  function onButtonsClosePopupClick(evt) {
    evt.target.parentNode.classList.add('pop-up--hidden');
    document.removeEventListener('keydown', onPopupPressEcs);
  }

  function mapOpen () {
    popupMap.classList.remove('pop-up--hidden');
    document.addEventListener('keydown', onPopupPressEcs);
  }

  function onMapClick (evt) {
    evt.preventDefault();
    mapOpen();
  }

  function onMapEnterPress (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      mapOpen();
    }
  }

  name.addEventListener('change', onInputChange);
  email.addEventListener('change', onInputChange);
  message.addEventListener('change', onInputChange);

  buttonSubmitMessage.addEventListener('click', onButtonSubmitMessageClick);

  buttonWriteUs.addEventListener('click', onButtonWriteUsClick);

  buttonsClosePopup.forEach(function(elem) {
    elem.addEventListener('click', onButtonsClosePopupClick);
  });

  map.addEventListener('click', onMapClick);
  map.addEventListener('keydown', onMapEnterPress);
})();
