import { useState, useEffect } from "react";

export const useClock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const intervalID = setInterval(() => {
            setTime(new Date());
        }, 1000)

        return () => clearInterval(intervalID)
    }, []);
    return time;
}