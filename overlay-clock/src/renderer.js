const CLOSE_BTN = document.getElementById("close");
const OPTION_BTN = document.getElementById("options");

CLOSE_BTN.addEventListener("click", () => {
    api.close();
});

OPTION_BTN.addEventListener("click", () => {
    api.resize(width, height);
});

