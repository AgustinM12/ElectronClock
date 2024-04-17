document.addEventListener("DOMContentLoaded", () => {
    const CLOSE_BTN = document.getElementById("close");

    CLOSE_BTN.addEventListener("click", () => {
        // Llama a la función close() de tu API para cerrar la aplicación de Electron
        api.close();
    });
});
