export default function TimerControls({ isRunning, onStart, onStop, onReset }) {
    return (
        <div className="flex flex-wrap justify-center gap-3 mt-2">
            <button
                type="button"
                onClick={onStart}
                disabled={isRunning}
                className={`px-5 py-2 rounded-lg text-white text-sm font-medium shadow-sm ${isRunning
                    ? "bg-[#288734]/60 cursor-not-allowed"
                    : "bg-[#288734] hover:brightness-95"
                    }`}
            >
                Start
            </button>

            <button
                type="button"
                onClick={onStop}
                disabled={!isRunning}
                className={`px-5 py-2 rounded-lg text-white text-sm font-medium shadow-sm ${!isRunning
                    ? "bg-[#bf5454]/60 cursor-not-allowed"
                    : "bg-[#bf5454] hover:brightness-95"
                    }`}
            >
                Stop
            </button>

            <button
                type="button"
                onClick={onReset}
                className="px-5 py-2 rounded-lg text-white text-sm font-medium shadow-sm bg-[#996f0e] hover:brightness-95"
            >
                Reset
            </button>
        </div>
    );
}