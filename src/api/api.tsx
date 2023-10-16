// api.js
import axios from 'axios';

const API_KEY = 'e9f36369ca199e9e2be76ee66494e9a6';
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

function fetchDataBasedOnInput(
    inputValue: string = "Hanoi",
    coordCallback: (coordinates: any) => void,
    weatherDataCallback: (weatherData: any) => void
) {
    if (!inputValue) return;

    axios
        .get(`${API_BASE_URL}/weather`, {
            params: {
                q: inputValue,
                appid: API_KEY,
            },
        })
        .then((response) => {
            const apiCoord = response.data.coord;
            coordCallback(apiCoord);

            axios
                .get(`${API_BASE_URL}/onecall`, {
                    params: {
                        lat: apiCoord.lat,
                        lon: apiCoord.lon,
                        appid: API_KEY,
                    },
                })
                .then((response) => {
                    weatherDataCallback(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        })
        .catch((error) => {
            console.error(error);
        });
}

export { fetchDataBasedOnInput };
