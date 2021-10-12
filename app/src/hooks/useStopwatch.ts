import {useEffect, useState} from "react";

export const useStopwatch = (initialSecond: number) => {
    const [timeInSeconds, setTimeInSeconds] = useState(initialSecond);

    useEffect(() => {
        const interval = window.setInterval(() => {
            setTimeInSeconds((time) => time + 1);
        }, 1000)
        return () => clearInterval(interval);
    }, []);

    return timeInSeconds;
};