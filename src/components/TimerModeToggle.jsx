const MODES = [
    { id: "pomodoro", label: "Pomodoro" },
    { id: "short", label: "Short Break" },
    { id: "long", label: "Long Break" },
];

export default function TimerModeToggle({ mode, onModeChange }) {
    const index = mode === "pomodoro" ? 0 : mode === "short" ? 1 : 2;
    const leftPercent = index * (100 / 3);

    return (
        <div className="w-full flex justify-center">
            <div className="relative inline-flex bg-[#e9efe6] rounded-full p-1 shadow-sm overflow-hidden w-[340px] h-12">
                {/* sliding highlight */}
                <div
                    className="absolute top-1 bottom-1 rounded-full bg-[#1f7a30] transition-[left] duration-200"
                    style={{
                        width: "33.3333%",
                        left: `${leftPercent}%`,
                    }}
                    aria-hidden="true"
                />

                {/* labels */}
                {MODES.map((m) => {
                    const isActive = mode === m.id;
                    return (
                        <button
                            key={m.id}
                            type="button"
                            onClick={() => onModeChange(m.id)}
                            className={`relative flex-1 flex items-center justify-center text-sm md:text-base font-semibold
                ${isActive ? "text-white" : "text-[#08361b]"}
              `}
                        >
                            {m.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
