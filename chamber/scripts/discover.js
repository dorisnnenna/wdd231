import { discoverItems } from "../data/discover.mjs";

const discoverCards = document.querySelector("#discover-cards");
const visitorMessage = document.querySelector("#visitor-message");

// Display discover cards
discoverItems.forEach((item) => {
    const card = document.createElement("article");
    card.classList.add("discover-card");

    card.innerHTML = `
        <h2>${item.name}</h2>
        <figure>
            <img src="${item.image}" alt="${item.name}" loading="lazy" width="300" height="200">
        </figure>
        <address>${item.address}</address>
        <p>${item.description}</p>
        <button type="button">Learn More</button>
    `;

    discoverCards.appendChild(card);
});

// Display visitor message
const lastVisit = localStorage.getItem("lastVisit");
const currentVisit = Date.now();

if (!lastVisit) {
    visitorMessage.textContent =
        "Welcome! Let us know if you have any questions.";
} else {
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const daysSinceVisit = Math.floor(
        (currentVisit - Number(lastVisit)) / millisecondsPerDay
    );

    if (daysSinceVisit < 1) {
        visitorMessage.textContent = "Back so soon! Awesome!";
    } else {
        const dayText = daysSinceVisit === 1 ? "day" : "days";
        visitorMessage.textContent =
            `You last visited ${daysSinceVisit} ${dayText} ago.`;
    }
}

localStorage.setItem("lastVisit", currentVisit);