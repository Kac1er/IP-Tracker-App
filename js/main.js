import { getLocation } from "./api.js";

const formIpInput = document.querySelector(".header__input");
const formSubmitButton = document.querySelector(".header__button");
const errorText = document.querySelector(".header__error-text");
const informationFields = [
	...document.querySelectorAll(".header__information-description "),
];
const loaderBox = document.querySelector(".loader");

export const showErrorMessage = message => {
	errorText.classList += " header__error-text--active";
	errorText.textContent = message;
};
const clearErrorMessage = () => {
	errorText.classList.remove("header__error-text--active");
	errorText.textContent = "";
};

const checkInputValue = () => formIpInput.value.trim();

const fetchAddress = e => {
	e.preventDefault();
	if (!checkInputValue()) {
		return showErrorMessage("Fill in the appropriate fields.");
	}
	clearErrorMessage();
	getLocation(formIpInput.value);
};

export const displayAddressData = ({
	ip,
	location: { timezone, city },
	isp,
}) => {
	const informations = [ip, city, `UTC ${timezone}`, isp];

	informationFields.forEach(
		(field, i) => (field.textContent = informations[i])
	);
};

export const toggleLoader = () => {
	loaderBox.classList.toggle("loader--active");
	document.body.classList.toggle('sticky-body');
}

export const resetFields = () => {
	informationFields.forEach(field => (field.textContent = "-"));
};

document.addEventListener("DOMContentLoaded", () => {
	getLocation();
	formSubmitButton.addEventListener("click", fetchAddress);
});
