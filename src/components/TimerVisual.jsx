import { useEffect, useRef, useState } from "react";

export default function TimerVisual({ progress }) {
    const [debouncedProgress, setDebouncedProgress] = useState(progress);
    const timeoutRef = useRef();

    useEffect(() => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setDebouncedProgress(progress);
        }, 50);
        return () => clearTimeout(timeoutRef.current);
    }, [progress]);

    const clamped = Math.max(0, Math.min(debouncedProgress, 1));

    const size = 260;
    const strokeWidth = 8;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference * (1 - clamped);

    return (
        <div className="relative w-64 h-64 flex items-center justify-center">
            <svg
                className="w-full h-full rotate-[-90deg]"
                viewBox={`0 0 ${size} ${size}`}
            >
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="#e9efe6"
                    stroke="#cde4c8"
                    strokeWidth={strokeWidth}
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="#54a937"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    className="timer-progress"
                    style={{
                        transition: "stroke-dashoffset 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
                    }}
                />
            </svg>

            <div className="absolute w-48 h-48 rounded-full flex items-center justify-center">
                <img
                    src="/img/roots.png"
                    alt="A small plant sprouting from the soil"
                    className="w-40 h-40 object-contain"
                />
            </div>
        </div>
    );
}