console.log("Thug Mane Beat Store is running!");

const playButtons = document.querySelectorAll(".beat-card button:first-of-type");

playButtons.forEach((button) => {
    button.addEventListener("click", () => {
        alert("Audio player coming soon!");
    });
});
