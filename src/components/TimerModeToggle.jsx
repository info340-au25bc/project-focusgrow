const MODES = [
    { id: "pomodoro", label: "Pomodoro" },
    { id: "short", label: "Short Break" },
    { id: "long", label: "Long Break" },
];

export default function TimerModeToggle({ mode, onModeChange }) {
    const index = mode === "pomodoro" ? 0 : mode === "short" ? 1 : 2;

    return (
        <div className="w-full flex justify-center">
            <div className="relative flex items-center bg-[#e9efe6] rounded-full p-1 w-80 h-12 shadow-sm">
                <div
                    className="absolute top-1 bottom-1 w-1/3 rounded-full bg-[#288734] transition-transform"
                    style={{ transform: `translateX(${index * 100}%)` }}
                />
                {MODES.map((m) => {
                    <button
                        key={m.id}
                        type="button"
                        onClick={() => onModeChange(m.id)}
                        className={`relative flex-1 text-center text-sm font-semibold transition ${mode === m.id ? "text-white" : "text-[#143a20]"
                            }`}>
                        {m.label}
                    </button>
                })}
            </div>
        </div>
    );
}
