'use strict';
(function () {
  var MIN_COORDS_X_LEFT_CONTROL = 0;
  var MAX_COORDS_X_RIGHT_CONTROL = 100;
  var MAX_PRICE = 8620;
  var MAX_PERCENT = 100;
  var priceRange = document.querySelector('.price__range');
  var priceControlsMin = priceRange.querySelector('.price__controls--min');
  var priceControlsMax = priceRange.querySelector('.price__controls--max');
  var priceScale = priceRange.querySelector('.price__scale');
  var priceScaleCurrent = priceRange.querySelector('.price__scale-current');
  var priceOutputMin = priceRange.querySelector('.price__output--min');
  var priceOutputMax = priceRange.querySelector('.price__output--max');
  var priceScaleRatio = MAX_PERCENT / priceScale.offsetWidth; // для расчета процентов от ширины шкалы
  var maxCoordsXLeftControl;
  var minCoordsXRightControl;

  //  ограничение по оси Х
  function setLimitsX(Xcoord, XMin, XMax) {
    if (Xcoord < XMin) {
      Xcoord = XMin;
    }
    if (Xcoord > XMax) {
      Xcoord = XMax;
    }
    return Xcoord;
  }

  // зеленая полоска в зависимости от процента
  function setPriceScaleCurrentWidth(isMoveMinPriceControl, xCoord) {
    var scaleLeftCoordinate = priceScaleCurrent.offsetLeft * priceScaleRatio;
    var scaleRightCoordinate = priceControlsMax.offsetLeft * priceScaleRatio;

    if (isMoveMinPriceControl) {
      priceScaleCurrent.style.left = xCoord + '%';
      priceScaleCurrent.style.width = (Math.round(scaleRightCoordinate - xCoord)) + '%';
    } else {
      priceScaleCurrent.style.width = (Math.round(xCoord - scaleLeftCoordinate)) + '%';
    }
  }

  // цена минимум и максисмум
  function setPrice(isMoveMinPriceControl, xCoord) {
    var price = Math.round(MAX_PRICE * xCoord / MAX_PERCENT);
    if (isMoveMinPriceControl) {
      priceOutputMin.textContent = 'от ' + price;
    } else {
      priceOutputMax.textContent = 'до ' + price;
    }
  }

  function onControlsMouseDown(evt) {
    evt.preventDefault();
    var control = evt.target;
    var sartCoordsX = evt.clientX; // значение Х мыши в момент начала движения
    var isMoveMinPriceControl = control.classList.contains('price__controls--min') ? true : false;

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      var shiftX = sartCoordsX - moveEvt.clientX; // сдвиг в пикселях
      var newX = Math.round((control.offsetLeft - shiftX) * priceScaleRatio); // новое значение отступа слева в процентах

      sartCoordsX = moveEvt.clientX; // новое значение Х мыши

      if (isMoveMinPriceControl) {
        maxCoordsXLeftControl = priceControlsMax.offsetLeft * priceScaleRatio; // максимальное значение левого контрола в %
        newX = setLimitsX(newX, MIN_COORDS_X_LEFT_CONTROL, maxCoordsXLeftControl);
      } else {
        minCoordsXRightControl = priceControlsMin.offsetLeft * priceScaleRatio;
        newX = setLimitsX(newX, minCoordsXRightControl, MAX_COORDS_X_RIGHT_CONTROL);
      }

      control.style.left = newX + '%'; // проверка по ограничению Х

      setPriceScaleCurrentWidth(isMoveMinPriceControl, newX);
      setPrice(isMoveMinPriceControl, newX);
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  priceControlsMin.addEventListener('mousedown', onControlsMouseDown);
  priceControlsMax.addEventListener('mousedown', onControlsMouseDown);

})();
