import { useContext, useState } from 'react';
import { TaskNotesContext } from '../context/TaskNotesContext';
import WaterPlantModal from './WaterPlantModal';
import { usePlants } from '../hooks/usePlants';

export default function TimerTaskWidget() {
    const { tasks, completeTask } = useContext(TaskNotesContext);
    const [showWaterModal, setShowWaterModal] = useState(false);
    const { addWater } = usePlants();

    // sort by deadline like on DailyTasks page
    const sortedTasks = [...tasks].sort((a, b) => {
        if (a.deadline && !b.deadline) return -1;
        if (!a.deadline && b.deadline) return 1;
        return a.deadline && b.deadline
            ? new Date(a.deadline) - new Date(b.deadline)
            : 0;
    });

    // complete button interaction handling
    const handleComplete = (taskId) => {
        const task = tasks.find(t => t.id === taskId);
        const wasIncomplete = !task?.completed;

        // toggle complete in shared context
        completeTask(taskId);

        if (wasIncomplete) {
            // award water for completing
            addWater(10);
            setShowWaterModal(true);
        } else {
            // undo - remove awarded water
            addWater(-10);
        }
    };

    return (
        <div>
            <section aria-labelledby="timer-tasks-heading"
                className="bg-[#c9dfc4] rounded-xl p-5 flex flex-col gap-3">
                <h2 className="text-base font-semibold text-[#143a20]" id="timer-tasks-heading">
                    Tasks
                </h2>
                {sortedTasks.length > 0
                    ? (<ul className="list-none pl-0 text-sm text-[#143a20] space-y-2">
                        {sortedTasks.slice(0, 3).map((task) => (
                            <li key={task.id} className="flex items-center justify-between bg-white p-2 rounded-md">
                                <div className="flex-1 mr-3 text-sm text-[#143a20]">
                                    <span className={`${task.completed ? 'line-through opacity-60' : ''}`}>
                                        {task.text}
                                    </span>
                                    {task.deadline && (
                                        <span className="ml-2 text-xs text-accent font-medium">
                                            ({new Date(task.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})
                                        </span>
                                    )}
                                </div>

                                <button
                                    onClick={() => handleComplete(task.id)}
                                    className={`${task.completed
                                        ? 'bg-gray-500'
                                        : 'bg-green-500'} 
                                        text-white px-3 py-1 rounded-lg hover:opacity-90 text-sm font-medium`}
                                >
                                    {task.completed ? "Undo" : "Complete"}
                                </button>
                            </li>
                        ))}
                    </ul>)
                    : (<p className="text-sm text-[#143a20] italic">No tasks yet. Add one in Daily Tasks!</p>)
                }
            </section>

            {showWaterModal && <WaterPlantModal onClose={() => setShowWaterModal(false)} />}
        </div>
    );
}