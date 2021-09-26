import {
	displayAddressData,
	resetFields,
	showErrorMessage,
	toggleLoader,
} from "./main.js";
const API_LINK = "https://geo.ipify.org/api/v1?";
const API_KEY = "apiKey=at_OGsNfruwfq3N0kebkikSJFA1hxfWV";
const MAP = L.map("location-map");

const MAP_ICON = new L.Icon({
	iconUrl: './assets/icons/icon-location.svg',
	iconSize: [35, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

export const getLocation = (address = "") => {
	const URL = `${API_LINK + API_KEY}&ipAddress=${address}&domain=${address}`;
	toggleLoader();
	fetch(URL)
		.then(response => {
			if (!response.ok) {
				throw new Error("Given ip address is invalid");
			}
			return response.json();
		})
		.then(data => {
			setMap(data);
			displayAddressData(data);
		})
		.catch(err => {
			showErrorMessage(err);
			resetFields();
		})
		.finally(() => toggleLoader());
};

const setMap = async ({ location: { lat, lng } }) => {
	await MAP.setView([lat, lng], 13);

	L.marker([lat, lng], {
		icon: MAP_ICON,
	}).addTo(MAP);
};

L.tileLayer(
	"https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2FjcGVyMTExMiIsImEiOiJja3UwOWxudmkydjZ0MzJxZWZianpkcXZjIn0.XEvTO1xHghSP90qk9zqw5A",
	{
		maxZoom: 18,
		attribution:
			'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: "mapbox/streets-v11",
		tileSize: 512,
		zoomOffset: -1,
	}
).addTo(MAP);
