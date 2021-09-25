import { getLocation } from "./api.js";

const formIpInput = document.querySelector(".header__input");
const formSubmitButton = document.querySelector(".header__button");
const errorText = document.querySelector(".header__error-text");
const informationFields = [
	...document.querySelectorAll(".header__information-description "),
];

export const showErrorMessage = message => {
	errorText.classList += " header__error-text--active";
	errorText.textContent = message;
};
const clearErrorMessage = () => {
	errorText.classList.remove("header__error-text--active");
	errorText.textContent = "";
};

const checkInputValue = () => (formIpInput.value.trim() ? true : false);

const fetchAddress = e => {
	e.preventDefault();
	if (!checkInputValue()) {
		return showErrorMessage("Wypełnij odpowiednie pola");
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

export const resetFields = () => {
	informationFields.forEach(field => (field.textContent = "-"));
};

document.addEventListener("DOMContentLoaded", () => {
	getLocation();
	formSubmitButton.addEventListener("click", fetchAddress);
});
