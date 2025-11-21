import React, { useState, useEffect, useMemo } from "react";
import TimerVisual from "./TimerVisual";
import TimerModeToggle from "./TimerModeToggle";
import TimerControls from "./TimerControls";

const MODES = {
    pomodoro: 25 * 60,
    short: 5 * 60,
    long: 15 * 60,
};

export default function Timer() {
    const [mode, setMode] = useState("pomodoro");
    const [secondsLeft, setSecondsLeft] = useState(MODES.pomodoro);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        setSecondsLeft(MODES[mode]);
        setIsRunning(false);
    }, [mode]);

    useEffect(() => {
        if (!isRunning) return;
        const id = setInterval(() => {
            setSecondsLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(id);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(id);
    }, [isRunning]);

    const formatted = useMemo(() => {
        const m = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
        const s = String(secondsLeft % 60).padStart(2, "0");
        return `${m}:${s}`;
    }, [secondsLeft]);

    return (
        <div className="flex flex-col items-center gap-6 md:gap-8">
            <TimerVisual />

            <div>
                {formatted}
            </div>

            <TimerModeToggle mode={mode} onModeChange={setMode} />

            <TimerControls
                isRunning={isRunning}
                onStart={() => setIsRunning(true)}
                onStop={() => setIsRunning(false)}
                onReset={() => {
                    setIsRunning(false);
                    setSecondsLeft(MODES[mode]);
                }}
            />
        </div>
    );
}