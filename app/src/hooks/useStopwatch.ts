import {useEffect, useState} from "react";

export const useStopwatch = (initialSecond: number) => {
    const [timeInSeconds, setTimeInSeconds] = useState(initialSecond);

    useEffect(() => {
        window.setInterval(() => {
            setTimeInSeconds((time) => time + 1);
        }, 1000)
    }, []);

    return timeInSeconds;
};