import { useEffect, useMemo, useState } from "react";
import TimerVisual from "./TimerVisual";
import TimerModeToggle from "./TimerModeToggle";
import TimerControls from "./TimerControls";

const DURATIONS = {
    pomodoro: 25 * 60,
    short: 5 * 60,
    long: 10 * 60,
};

export default function Timer() {
    const [mode, setMode] = useState("pomodoro"); // "pomodoro" | "short" | "long"
    const [secondsLeft, setSecondsLeft] = useState(DURATIONS.pomodoro);
    const [isRunning, setIsRunning] = useState(false);

    // reset timer
    useEffect(() => {
        setSecondsLeft(DURATIONS[mode]);
        setIsRunning(false);
    }, [mode]);

    // countdown effect
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

    const formattedTime = useMemo(() => {
        const m = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
        const s = String(secondsLeft % 60).padStart(2, "0");
        return `${m}:${s}`;
    }, [secondsLeft]);

    const progress = useMemo(
        () => secondsLeft / DURATIONS[mode],
        [secondsLeft, mode]
    );

    const handleStart = () => setIsRunning(true);
    const handleStop = () => setIsRunning(false);
    const handleReset = () => {
        setIsRunning(false);
        setSecondsLeft(DURATIONS[mode]);
    };

    return (
        <div className="flex flex-col items-center gap-6 md:gap-7">
            {/* plant circle with progress ring */}
            <TimerVisual progress={progress} />

            {/* big time */}
            <div className="text-4xl md:text-6xl font-extrabold text-[#08361b] tabular-nums">
                {formattedTime}
            </div>

            {/* mode toggle */}
            <TimerModeToggle mode={mode} onModeChange={setMode} />

            {/* start / stop / reset */}
            <TimerControls
                isRunning={isRunning}
                onStart={handleStart}
                onStop={handleStop}
                onReset={handleReset}
            />
        </div>
    );
}
