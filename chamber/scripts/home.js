
const apiKey = "0dbefcf1a9410ea3139468ae4acfb875";
const city = "Ota";
const country = "NG";


const spotlightContainer = document.querySelector("#spotlight-container");

async function getSpotlights() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Could not load member data.");
        }

        const members = await response.json();

        // Keep only Gold (3) and Silver (2) members
        const eligibleMembers = members.filter(
            (member) => member.membershipLevel === 2 || member.membershipLevel === 3
        );

        // Randomize the eligible members
        const shuffledMembers = [...eligibleMembers].sort(() => Math.random() - 0.5);

        // Select three members, or all available if fewer than three exist
        const selectedMembers = shuffledMembers.slice(0, 3);

        displaySpotlights(selectedMembers);

    } catch (error) {
        console.error(error);
        spotlightContainer.innerHTML =
            "<p>Unable to load member spotlights.</p>";
    }


}

function displaySpotlights(members) {
    spotlightContainer.innerHTML = "";

    members.forEach((member) => {
        const card = document.createElement("article");

        card.classList.add("spotlight-card");

        const membershipName =
            member.membershipLevel === 3 ? "Gold Member" : "Silver Member";

        const imagePath = `images/${member.image}`;

        card.innerHTML = `
            <img src="${imagePath}" 
                 alt="${member.name} logo" 
                 loading="lazy">

            <h3>${member.name}</h3>

            <p class="membership-level">${membershipName}</p>

            <p><strong>Phone:</strong> ${member.phone}</p>

            <p><strong>Address:</strong> ${member.address}</p>

            <p>
                <a href="${member.website}" target="_blank" rel="noopener">
                    Visit Website
                </a>
            </p>
        `;

        spotlightContainer.appendChild(card);
    });
}

async function getWeather() {
    try {
        const currentResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${apiKey}`
        );

        const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=metric&appid=${apiKey}`
        );

        if (!currentResponse.ok || !forecastResponse.ok) {
            throw new Error("Could not load weather data.");
        }

        const currentWeather = await currentResponse.json();
        const forecastWeather = await forecastResponse.json();

        displayCurrentWeather(currentWeather);
        displayForecast(forecastWeather);

    } catch (error) {
        console.error(error);
    }
}


function displayCurrentWeather(weather) {
    const weatherCurrent = document.querySelector("#weather-current");

    weatherCurrent.innerHTML = `
        <p class="weather-temperature">${Math.round(weather.main.temp)}°C</p>
        <p class="weather-description">${weather.weather[0].description}</p>
    `;
}

function displayForecast(forecast) {
    const forecastContainer = document.querySelector("#weather-forecast");

    forecastContainer.innerHTML = "";

    const dailyForecasts = {};

    forecast.list.forEach((item) => {
        const date = new Date(item.dt * 1000).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric"
        });

        if (!dailyForecasts[date]) {
            dailyForecasts[date] = {
                date: date,
                temperature: item.main.temp,
                description: item.weather[0].description
            };
        }
    });

    const nextThreeDays = Object.values(dailyForecasts).slice(1, 4);

    nextThreeDays.forEach((day) => {
        const card = document.createElement("article");

        card.classList.add("forecast-card");

        card.innerHTML = `
    <h4> ${day.date}</h4>
            <p>${Math.round(day.temperature)}°C</p>
            <p>${day.description}</p>
`;

        forecastContainer.appendChild(card);
    });
}

getSpotlights();
getWeather();
