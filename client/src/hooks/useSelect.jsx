import { useState } from "react";

export const useSelect = (text, initalState) => {

    const [selectedColor, setSelectedColor] = useState("text-white");

    const handleChangeColor = (event) => {
        setSelectedColor(event.target.value);
    };


    return [selectedColor, handleChangeColor];
}