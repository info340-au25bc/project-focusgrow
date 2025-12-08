import { useEffect, useState } from "react";
import TimerSidePanelToggle from "./TimerSidePanelToggle";
import TimerTaskWidget from "./TimerTaskWidget";
import TimerReflectionWidget from "./TimerReflectionWidget";

export default function TimerSidePanel({ isTimerRunning, autoCollapse, onToggleAutoCollapse, }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    // if autoCollapse is disabled, do not update the collapsed state
    useEffect(() => {
        if (!autoCollapse) return;
        setIsCollapsed(isTimerRunning);
    }, [isTimerRunning, autoCollapse]);

    const handleToggleCollapsed = () => {
        setIsCollapsed((prev) => !prev)
    };

    return (
        <aside
            className={`
                hidden md:flex
                fixed left-4 top-[calc(50%+0.5rem)] -translate-y-1/2 z-20
                overflow-hidden
                transition-[width,transform] duration-300 ease-out
                ${isCollapsed ? "w-12" : "w-96"}
            `}
            aria-label="Focus session side panel">

            <div
                className={`
                    bg-[#d6e9d3] rounded-2xl shadow-md
                    flex flex-col
                    transition-all duration-300 ease-out
                    ${isCollapsed ? "items-center justify-center px-2 py-3" : "px-6 py-5"}
                `}
            >
                <TimerSidePanelToggle
                    isCollapsed={isCollapsed}
                    onToggle={handleToggleCollapsed}
                />

                {!isCollapsed && (
                    <div className="mt-3 flex-1 flex flex-col gap-4 
                        max-h-[calc(100vh-15rem)] overflow-y-auto pr-1">
                        <div className="flex items-center gap-2">
                            <input
                                id="auto-collapse-toggle"
                                type="checkbox"
                                className="h-4 w-4 accent-[#1f7a30]"
                                checked={autoCollapse}
                                onChange={onToggleAutoCollapse}
                            />
                            <label
                                htmlFor="auto-collapse-toggle"
                                className="text-xs text-[#143a20]"
                            >
                                Auto-collapse while running
                            </label>
                        </div>

                        <TimerTaskWidget />
                        <TimerReflectionWidget />
                    </div>
                )}
            </div>
        </aside>
    );
}