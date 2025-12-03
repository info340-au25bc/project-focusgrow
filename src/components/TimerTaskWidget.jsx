import { useContext } from 'react';
import { TaskNotesContext } from '../context/TaskNotesContext';

export default function TimerTaskWidget() {
    const { tasks } = useContext(TaskNotesContext);

    return (
        <section aria-labelledby="timer-tasks-heading"
            className="bg-[#c9dfc4] rounded-xl p-5 flex flex-col gap-3">
            <h2 className="text-base font-semibold text-[#143a20]" id="timer-tasks-heading">
                Tasks
            </h2>
            {tasks.length > 0 ? (
                <ul className="list-disc pl-5 text-sm text-[#143a20] space-y-1.5">
                    {tasks.map((task) => (
                        <li key={task.id}>{task.text}</li>
                    ))}
                </ul>
            ) : (
                <p className="text-sm text-[#143a20] italic">No tasks yet. Add one in Daily Tasks!</p>
            )}
        </section>
    );
}