const params = new URLSearchParams(window.location.search);

const submittedData = document.querySelector("#submitted-data");

const firstName = params.get("firstName");
const lastName = params.get("lastName");
const email = params.get("email");
const phone = params.get("phone");
const organization = params.get("organization");
const organizationTitle = params.get("organizationTitle");
const membershipLevel = params.get("membershipLevel");
const membershipNames = {
    np: "NP Membership",
    bronze: "Bronze Membership",
    silver: "Silver Membership",
    gold: "Gold Membership"
};
const description = params.get("description");
const timestamp = params.get("timestamp");

submittedData.innerHTML = `
    <h2>Application Details</h2>
    <p><strong>Name:</strong> ${firstName} ${lastName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Organization:</strong> ${organization}</p>
    <p><strong>Organizational Title:</strong> ${organizationTitle}</p>
    <p><strong>Membership Level:</strong> ${membershipNames[membershipLevel]}</p>
    <p><strong>Description:</strong> ${description}</p>
    <p><strong>Application Date:</strong> ${timestamp}</p>
`;