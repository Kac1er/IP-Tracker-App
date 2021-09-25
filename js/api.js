import { displayAddressData, resetFields, showErrorMessage } from "./main.js";
const API_LINK = "https://geo.ipify.org/api/v1?";
const API_KEY = "apiKey=at_OGsNfruwfq3N0kebkikSJFA1hxfWV";

export const getLocation = (address = "") => {
	const URL = `${API_LINK + API_KEY}&ipAddress=${address}&domain=${address}`;
	fetch(URL)
		.then(response => response.json())
		.then(data => {
			setMap(data);
			displayAddressData(data);
		})
		.catch(() => {
			showErrorMessage("Dane nie zostały znalezione.");
			resetFields();
		});
};

const setMap = ({location: {lat, lng}}) => {
	//todo
};
