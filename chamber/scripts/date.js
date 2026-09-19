// Select the elements in the footer
const currentYearSpan = document.querySelector("#currentyear");
const lastModifiedElement = document.querySelector("#lastModified");

// Set the current year
const today = new Date();
currentYearSpan.textContent = today.getFullYear();

// Set the last modified date of the document
lastModifiedElement.textContent = `Last Modification: ${document.lastModified}`;