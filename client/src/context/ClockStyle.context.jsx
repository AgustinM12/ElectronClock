import { createContext, useState } from "react"
import { useToggle } from "../hooks/usetoggle";

export const ClockStyleContext = createContext()

export const ClockStyleProvider = ({ children }) => {

    const formatStorage = localStorage.getItem("hourFormat");

    if (JSON.parse(formatStorage) !== true || false) {
        localStorage.setItem("hourFormat", false);
    }

    const [selectedColor, setSelectedColor] = useState(localStorage.getItem("hourColor") || "text-white");

    const [selectedSize, setSelectedSize] = useState(localStorage.getItem("hourSize") || "text-md");

    const [is24hs, toggleFormat] = useToggle(JSON.parse(formatStorage) || false);

    const handleChangeColor = (value) => {
        setSelectedColor(value);
    }

    const handleChangeSize = (value) => {
        setSelectedSize(value);
    }

    const changeFormat = () => {
        toggleFormat();
        localStorage.setItem("hourFormat", !is24hs);
    }

    return (
        <>
            <ClockStyleContext.Provider value={{ is24hs, changeFormat, selectedColor, handleChangeColor, selectedSize, handleChangeSize }}>
                {children}
            </ClockStyleContext.Provider>
        </>
    )

}