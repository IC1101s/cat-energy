var mapIframe = document.querySelector(".map__google");
var mapImage = document.querySelector(".map__img");
var mapWrapper = document.querySelector(".map__map-wrapper");

if (mapIframe) {
	mapImage.remove();
	mapWrapper.classList.remove("map__map-wrapper--pin");
}