import { useContext } from "react"
import { ClockStyleContext } from "../context/ClockStyle.context"

export const SelectComponent = ({ list, text, defaultValue, name }) => {

    const { handleChangeColor, handleChangeSize } = useContext(ClockStyleContext);

    const handleChange = (event) => {
        const newValue = event.target.value;
        if (name === "hourColor") {
            handleChangeColor(newValue);
        } else if (name === "hourSize") {
            handleChangeSize(newValue);
        }
        localStorage.setItem(name, newValue);
    }

    return (
        <select name={name} onChange={handleChange} className="w-52 p-1 rounded mt-1 bg-purple-700 hover:bg-blue-700 text-white  transition-colors shadow-xl cursor-pointer">
            <option key={0} defaultValue={defaultValue}>{text}</option>
            {
                list.map((items, index) => {
                    return (
                        <>
                            <option className={`${items} bg-gray-300`} key={index+1} value={items}>{items.slice(5)}</option>
                        </>
                    )
                })
            }
        </select>
    )
}
