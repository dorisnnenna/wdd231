const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
    // Optional: Switch icon between hamburger (☰) and close (✕)
    menuButton.textContent = navigation.classList.contains("open") ? "✕" : "☰";
});