import { useEffect, useMemo, useState } from "react";
import TimerVisual from "./TimerVisual";
import TimerModeToggle from "./TimerModeToggle";
import TimerControls from "./TimerControls";
import WaterPlantModal from "./WaterPlantModal";
import { usePlants } from "../hooks/usePlants";

// durations in seconds
const DURATIONS = {
    pomodoro: 25 * 60,
    short: 5 * 60,
    long: 10 * 60,
};

export default function Timer({ onRunningChange }) {
    // "pomodoro" | "short" | "long"
    const [mode, setMode] = useState("pomodoro");
    const [secondsLeft, setSecondsLeft] = useState(DURATIONS.pomodoro);
    const [isRunning, setIsRunning] = useState(false);
    const [showWaterModal, setShowWaterModal] = useState(false);

    const { water, addWater } = usePlants();

    const notifyRunning = (running) => {
        if (typeof onRunningChange === "function") {
            onRunningChange(running);
        }
    };

    // reset timer
    useEffect(() => {
        setSecondsLeft(DURATIONS[mode]);
        setIsRunning(false);
        notifyRunning(false);
    }, [mode]);

    // countdown
    useEffect(() => {
        if (!isRunning) return;

        const id = setInterval(() => {
            setSecondsLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(id);
                    setIsRunning(false);
                    notifyRunning(false);

                    if (mode === "pomodoro") {
                        addWater(10);
                        if (water + 10 >= 10) {
                            setShowWaterModal(true);
                        }
                    }

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

    const handleStart = () => {
        setIsRunning(true);
        notifyRunning(true);
    };

    const handleStop = () => {
        setIsRunning(false);
        notifyRunning(false);
    };

    const handleReset = () => {
        setIsRunning(false);
        setSecondsLeft(DURATIONS[mode]);
        notifyRunning(false);
    };

    return (
        <div className="flex flex-col items-center gap-6 md:gap-7">
            {/* plant visual with circular progress */}
            <TimerVisual progress={progress} />

            {/* big time */}
            <div className="text-4xl md:text-6xl font-extrabold text-[#08361b] tabular-nums">
                {formattedTime}
            </div>

            {/* mode toggle */}
            <TimerModeToggle mode={mode} onModeChange={setMode} />

            {/* controls */}
            <TimerControls
                isRunning={isRunning}
                onStart={handleStart}
                onStop={handleStop}
                onReset={handleReset}
            />

            {/* water plant modal */}
            {showWaterModal && <WaterPlantModal onClose={() => setShowWaterModal(false)} />}
        </div>
    );
}
