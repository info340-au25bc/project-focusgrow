import { useState } from "react";
import Timer from "../components/Timer";
import TimerSidePanel from "../components/TimerSidePanel";

export default function FocusTimer() {
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [autoCollapse, setAutoCollapse] = useState(true);

    return (
        <main className="flex bg-white">
            <TimerSidePanel
                isTimerRunning={isTimerRunning}
                autoCollapse={autoCollapse}
                onToggleAutoCollapse={() => setAutoCollapse((prev) => !prev)}
            />

            <section className="flex-1 flex items-center justify-center min-h-[calc(100vh-10rem)]">
                <Timer onRunningChange={setIsTimerRunning} />
            </section>
        </main>
    );
}