import { createContext, useState } from "react"
import { useToggle } from "../hooks/usetoggle";

export const ClockStyleContext = createContext()

export const ClockStyleProvider = ({ children }) => {

    const [selectedColor, setSelectedColor] = useState(localStorage.getItem("hourColor") || "text-white");

    const [selectedSize, setSelectedSize] = useState(localStorage.getItem("hourSize") || "text-md");

    const [is24hs, toggleFormat] = useToggle(localStorage.getItem("hourFormat") || false);

    const handleChangeColor = (value) => {
        setSelectedColor(value);
    }

    const handleChangeSize = (value) => {
        setSelectedSize(value);
    }

    return (
        <>
            <ClockStyleContext.Provider value={{ is24hs, toggleFormat, selectedColor, handleChangeColor, selectedSize, handleChangeSize }}>
                {children}
            </ClockStyleContext.Provider>
        </>
    )

}