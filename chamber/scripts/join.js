const timestampField = document.querySelector("#timestamp");

const currentDateTime = new Date();

timestampField.value = currentDateTime.toISOString();


const modalButtons = document.querySelectorAll(".modal-button");
const closeButtons = document.querySelectorAll(".close-modal");

modalButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const modalId = button.dataset.modal;
        const modal = document.querySelector(`#${modalId}`);

        modal.showModal();
    });
});

closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const modal = button.closest("dialog");

        modal.close();
    });
});
