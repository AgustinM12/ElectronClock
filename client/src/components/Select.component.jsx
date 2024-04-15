import { useState } from "react"

export const SelectComponent = ({ list, defaultOption, defaultValue, onSelect }) => {

    const [selectedColor, setSelectedColor] = useState(localStorage.getItem("selectedColor") || "");
    const [selectedSize, setSelectedSize] = useState(localStorage.getItem("selectedSize") || "");

    const handleChange = (event) => {
        const newValue = event.target.value;
        setSelectedColor(newValue);
        onSelect(newValue);
        localStorage.setItem("selectedItem", newValue);
    }

    return (
        <select name="colorsHour" onChange={handleChange} className="w-min p-1 rounded mt-1 bg-blue-500 hover:bg-blue-700 text-white">
            <option key={"default"} defaultValue={selectedItem}>{defaultOption}</option>
            {
                list.map((items, index) => {
                    return (
                        <>
                            <option className={`${items} bg-gray-300`} key={index} value={items}>{items.slice(5)}</option>
                        </>
                    )
                })
            }
        </select>
    )
}
