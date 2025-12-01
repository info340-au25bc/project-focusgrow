export default function TimerTaskWidget() {
    return (
        <section aria-labelledby="timer-tasks-heading"
            className="bg-[#c9dfc4] rounded-xl p-5 flex flex-col gap-3">
            <h2 className="text-base font-semibold text-[#143a20]" id="timer-tasks-heading">
                Tasks
            </h2>
            <ul className="list-disc pl-5 text-sm text-[#143a20] space-y-1.5">
                <li>Finish INFO 340 Problem Set 05</li>
                <li>Go to the gym</li>
            </ul>
        </section>
    );
}