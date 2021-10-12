import {useEffect, useState} from "react";

export const useStopwatch = (initialSecond: number) => {
    const [timeInSeconds, setTimeInSeconds] = useState(initialSecond);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        if (!isRunning) return;
        const interval = window.setInterval(() => {
            setTimeInSeconds((time) => time + 1);
        }, 1000)
        return () => clearInterval(interval);
    }, [isRunning]);

    function stopStopwatch() {
        setIsRunning(false);
    }

    function startStopwatch() {
        setIsRunning(true);
    }

    return {timeInSeconds, stopStopwatch, startStopwatch, setTimeInSeconds};
};