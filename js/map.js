/* Карта */

let screenWidth = window.screen.width;
let mapWrapper = document.querySelector('.map__wrapper');
let mapImage = document.querySelector('.map__image');
let center = [34.866849964021355,-111.76106949186402];
let pinSize = [27, 27];
let pinOffset = [-10, -20];
let zoom = 7;

mapWrapper.classList.remove('map__wrapper--no-js');
mapImage.classList.remove('map__image--no-js');

function init() {
  let map = new ymaps.Map('map', {
    center: center,
    zoom: zoom
  });

  let placemark = new ymaps.Placemark(center, {}, {
    iconLayout: 'default#image',
    iconImageHref: 'img/stack.svg#map-pin',
    iconImageSize: pinSize,
    iconImageOffset: pinOffset
  });

  map.controls.remove("geolocationControl");
  map.controls.remove("searchControl");
  map.controls.remove("trafficControl");
  map.controls.remove("typeSelector");
  map.controls.remove("fullscreenControl");
  map.controls.remove("zoomControl");
  map.controls.remove("rulerControl");
  map.geoObjects.add(placemark);
}

ymaps.ready(init);
