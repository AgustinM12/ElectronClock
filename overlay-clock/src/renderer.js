const CLOSE_BTN = document.getElementById("close");
const OPTION_BTN = document.getElementById("options");

CLOSE_BTN.addEventListener("click", () => {
    api.close();
});

OPTION_BTN.addEventListener("click", () => {
    api.resizeWindow(width, height); // Cambiado de 'resize' a 'resizeWindow'
});

OPTION_BTN.addEventListener("click", () => {
    api.showOptions(isOpen); // Abrir y cerrar menu de opciones
});
