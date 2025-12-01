export default function TimerControls({ isRunning, onStart, onStop, onReset }) {
    return (
        <div className="flex gap-4 mt-2">
            <button
                type="button"
                onClick={onStart}
                disabled={isRunning}
                className={`px-6 py-2 rounded-lg text-white text-sm md:text-base font-medium shadow-sm ${isRunning
                    ? "bg-green-700/60 cursor-not-allowed"
                    : "bg-green-700 hover:bg-green-800"
                    }`}
            >
                Start
            </button>

            <button
                type="button"
                onClick={onStop}
                disabled={!isRunning}
                className={`px-6 py-2 rounded-lg text-sm md:text-base font-medium shadow-sm ${!isRunning
                    ? "bg-[#e7a2aa]/60 text-[#6f3137] cursor-not-allowed"
                    : "bg-[#d9534f] text-white hover:brightness-105"
                    }`}
            >
                Stop
            </button>

            <button
                type="button"
                onClick={onReset}
                className="px-6 py-2 rounded-lg text-white text-sm md:text-base font-medium shadow-sm bg-yellow-700 hover:bg-yellow-800">
                Reset
            </button>
        </div>
    );
}