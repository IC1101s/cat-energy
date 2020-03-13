var buttonBefore = document.querySelector(".result__button-before");
var buttonAfter = document.querySelector(".result__button-after");
var buttonBeforeAfter = document.querySelector(".result__button-before-after");
var buttonSwitch = document.querySelector(".result__button-switch");
var imgBefore = document.querySelector(".result__img-before");
var imgAfter = document.querySelector(".result__img-after");

buttonBefore.addEventListener("click", function () {
	if (imgAfter.classList.contains("result__img-after--block")) {
		imgAfter.classList.remove("result__img-after--block");
		imgBefore.classList.add("result__img-before--block");
		buttonSwitch.classList.remove("result__button-switch--right");
		buttonSwitch.classList.add("result__button-switch--left");
	}
});

buttonAfter.addEventListener("click", function () {
	if (imgBefore.classList.contains("result__img-before--block")) {
		imgBefore.classList.remove("result__img-before--block");
		imgAfter.classList.add("result__img-after--block");
		buttonSwitch.classList.add("result__button-switch--right");
		buttonSwitch.classList.remove("result__button-switch--left");
	}
});

buttonBeforeAfter.addEventListener("click", function () {
	imgBefore.classList.toggle("result__img-before--block");
	imgAfter.classList.toggle("result__img-after--block");
	buttonSwitch.classList.toggle("result__button-switch--right");
	buttonSwitch.classList.toggle("result__button-switch--left");
});