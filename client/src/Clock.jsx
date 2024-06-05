import { SelectComponent } from "./components/Select.component";
import { colors } from "./data/tailwindColors.data"
import { size } from "./data/tailwindSize.data"
import { useClock } from "./hooks/useClock"
import { useToggle } from "./hooks/usetoggle";
import { useContext, useEffect } from "react";
import { ClockStyleContext } from "./context/ClockStyle.context";
import { useComponentSize } from "./hooks/useComponentSize";

export const Clock = () => {

    const { ref, windowSize } = useComponentSize();

    const handleResizeWindow = () => {
        setToggleOptions()
    }

    useEffect(() => {
        if (selectedSize == "text-xl" || selectedSize == "text-2xl" || selectedSize == "text-3xl") {
            window.api.resizeWindow(windowSize.width, windowSize.height + 8)
        } else {
            window.api.resizeWindow(windowSize.width, windowSize.height)
        }
    }, [windowSize]);


    const handleCloseApp = () => {
        window.api.close()
    };

    useEffect(() => {
        window.api.showOptions(handleResizeWindow);
    }, []);

    //* TOGGLES
    const { is24hs, changeFormat, selectedColor, selectedSize } = useContext(ClockStyleContext);

    const [toggleOptions, setToggleOptions] = useToggle(false);

    //* TIME
    const time = useClock();
    const hours = is24hs ? time.getHours().toString().padStart(2, '0') : ((time.getHours() + 11) % 12 + 1).toString().padStart(2, '0');

    const minutes = time.getMinutes().toString().padStart(2, '0');

    const seconds = time.getSeconds().toString().padStart(2, '0');

    const period = is24hs ? "" : time.getHours() >= 12 ? "PM" : "AM";

    return (
        <>
            <article ref={ref} className={`flex flex-col font-bold text-center w-fit h-fit items-center justify-center  ${toggleOptions ? "bg-slate-800 p-5 rounded-md border-2 border-white shadow-lg " : "pt-1.5 m-0"} `}>

                {/*Hour */}
                <section className="flex items-center space-x-2">
                    <h1 style={{ textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}
                        className={`${toggleOptions && "draggable"} ${selectedColor} ${selectedSize}`}>{`${hours}:${minutes}:${seconds} ${period}`}</h1>

                    {/* Settings BTN*/}
                    <button id="options" onClick={handleResizeWindow} className={`p-0 m-0 rounded-full border transition-colors ${toggleOptions ? "text-white border-white hover:text-red-600 hover:border-red-500" : "hidden"}`}>

                        {!toggleOptions ?
                            (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.867 19.125h.008v.008h-.008v-.008Z" />
                            </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            )

                        }

                    </button>

                </section>

                {/* Settings Section */}
                <div className={toggleOptions ? "visible space-y-2 flex flex-col" : "hidden"}>

                    <button onClick={changeFormat}
                        className="bg-purple-700 hover:bg-blue-700 text-white p-1 rounded mt-1 w-52 transition-colors shadow-xl"
                    >Cambiar formato horario</button>

                    <SelectComponent list={colors} text={"Color de la hora"} defaultValue={selectedColor} name={"hourColor"} />

                    <SelectComponent list={size} text={"Tamaño de la hora"} defaultValue={selectedColor} name={"hourSize"} />

                    <button id="close" onClick={handleCloseApp} className="p-1 w-52 rounded bg-red-700 hover:bg-red-500 text-white transition-colors">Cerrar app</button>

                </div>
            </article>
        </>
    )
}
