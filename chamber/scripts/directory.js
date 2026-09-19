const memberDirectory = document.querySelector("#member-directory");
const gridButton = document.querySelector("#grid-button");
const listButton = document.querySelector("#list-button");

async function getMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Could not load member data.");
        }

        const members = await response.json();

        displayMembers(members);
    } catch (error) {
        console.error(error);
        memberDirectory.innerHTML = "<p>Unable to load the member directory.</p>";
    }
}

function displayMembers(members) {
    memberDirectory.innerHTML = "";

    members.forEach((member) => {
        const card = document.createElement("article");

        card.classList.add("member-card");

        card.innerHTML = `
            <h2>${member.name}</h2>
            <p class="tagline">${member.otherInfo}</p>
            <hr>
            <div class="member-details">
                <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
                <div>
                    <p><strong>EMAIL:</strong> ${member.email}</p>
                    <p><strong>PHONE:</strong> ${member.phone}</p>
                    <p><strong>URL:</strong> <a href="${member.website}" target="_blank">Visit Website</a></p>
                    <p><strong>ADDRESS:</strong> ${member.address}</p>
                    <p><strong>MEMBERSHIP:</strong> Level ${member.membershipLevel}</p>
                    </div>
            </div>
        `;

        memberDirectory.appendChild(card);
    });
}

gridButton.addEventListener("click", () => {
    memberDirectory.classList.remove("list-view");
    memberDirectory.classList.add("grid-view");
});

listButton.addEventListener("click", () => {
    memberDirectory.classList.remove("grid-view");
    memberDirectory.classList.add("list-view");
});

getMembers();