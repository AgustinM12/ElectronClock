import { colors } from "./data/tailwindColors.data"
import { useClock } from "./hooks/useClock"
import { useToggle } from "./hooks/usetoggle";
import { useState } from "react";

export const Clock = () => {

    const [is24hs, toggleFormat] = useToggle(false);

    const [showOptions, toggleOptions] = useToggle(false);

    const time = useClock();

    const hours = is24hs ? time.getHours().toString().padStart(2, '0') : ((time.getHours() + 11) % 12 + 1).toString().padStart(2, '0');

    const minutes = time.getMinutes().toString().padStart(2, '0');

    const seconds = time.getSeconds().toString().padStart(2, '0');

    const period = is24hs ? "" : time.getHours() >= 12 ? "PM" : "AM";

    const [selectedColor, setSelectedColor] = useState("text-white");

    const handleChangeColor = (event) => {
        setSelectedColor(event.target.value);
    };

    return (
        <>
            <article className="font-bold text-center">
                <div className="flex items-center justify-center space-x-2">
                    <h1
                        style={{ textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}
                        className={`${selectedColor}`}>{`${hours}:${minutes}:${seconds} ${period}`}</h1>

                    {/*Settings */}
                    <button onClick={toggleOptions} className={showOptions ? "text-red-500" : "text-green-500"}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.867 19.125h.008v.008h-.008v-.008Z" />
                        </svg>
                    </button>

                    {/*Close */}
                    <button id="close" className={showOptions ? "visible hover:text-red-500" : "invisible"}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                    </button>

                </div>

                <section className={showOptions ? "visible flex flex-col justify-center items-center" : "invisible"}>

                    <button onClick={toggleFormat}
                        className="bg-blue-500 hover:bg-blue-700 text-white p-1 rounded mt-1 w-fit"
                    >Cambiar formato horario</button>

                    <select name="colorsHour" onChange={handleChangeColor} className="w-min p-1 rounded mt-1 bg-blue-500 hover:bg-blue-700 text-white">
                        <option key={"default"} defaultValue={"white"}>Color de la hora</option>
                        {
                            colors.map((color, index) => {
                                return (
                                    <>
                                        <option className={`${color} bg-gray-300`} key={index} value={color}>{color.slice(5)}</option>
                                    </>
                                )
                            })
                        }
                    </select>
                </section>
            </article>
        </>
    )
}
