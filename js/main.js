// Variáveis e seleção de elementos

const apiKey = "c3bb0c131fce8e6d9332d5a143c90868";
const apiCountryurl = 'https://restcountries.com/v3.1/all';

const cityInput = document.querySelector('#city-input');
const searchBtn = document.querySelector('#search');

const cityElement = document.querySelector("#city")
const tempElement = document.querySelector("#temperature span")
const descElement = document.querySelector("#description")
const weatherIconElement = document.querySelector("#weather-icon")
//const countryElement = document.querySelector("#country")
const humidityElement = document.querySelector("#humidity span")
const windElement = document.querySelector("#wind span")

const weatherContainer = document.querySelector("#weather-data")

// Funções
const getWeatherData = async(city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    return data;
};

const showWeatherData = async (city) => {
    const data = await getWeatherData(city);

    cityElement.innerHTML = data.name;
    tempElement.innerHTML = parseInt(data.main.temp)
    descElement.innerHTML = data.weather[0].description;
    weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    //countryElement.setAttribute("src", `https://restcountries.com/v3.1/name/` + data.sys.country);
    humidityElement.innerHTML = `${data.main.humidity}%`;
    windElement.innerHTML = `${data.wind.speed}km/h`;
    
    weatherContainer.classList.remove("hide");
}

// Eventos

searchBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const city = cityInput.value;
    
    if (city.trim() === "") {
        // Campo vazio, exibir uma mensagem de erro
        alert("Por favor, insira o nome de uma cidade.");
        return;
    }
    
    try {
        await showWeatherData(city);
    } catch (error) {
        // Nome da cidade inexistente, exibir uma mensagem de erro
        alert("Não foi possível encontrar informações para a cidade especificada.");
    }
});

cityInput.addEventListener("keyup", (e) => {
    if(e.code === "Enter") {
        const city = e.target.value;
        showWeatherData(city);
    }
});