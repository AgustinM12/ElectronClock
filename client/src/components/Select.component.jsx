import { useState } from "react"

export const SelectComponent = ({ list, defaultOption, defaultValue, name }) => {

    const [selectedItem, setSelectedItem] = useState(localStorage.getItem("selectedItem") || "");

    const handleChange = (event) => {
        const newValue = event.target.value;
        setSelectedItem(newValue);
        localStorage.setItem(name, newValue);
    }

    return (
        <select name={name} onChange={handleChange} className="w-52 p-1 rounded mt-1 bg-blue-500 hover:bg-blue-700 text-white">
            <option key={"default"} defaultValue={defaultValue}>{defaultOption}</option>
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
