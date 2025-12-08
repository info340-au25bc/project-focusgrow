import { useContext, useState } from 'react';
import TaskItem from './TaskItem';
import { TaskNotesContext } from '../context/TaskNotesContext';
import WaterPlantModal from './WaterPlantModal';
import { usePlants } from '../hooks/usePlants';

export default function TaskSection({ tasks: tasksProp }) {
  const { tasks: ctxTasks, addTask, deleteTask, completeTask } = useContext(TaskNotesContext);
  const tasks = tasksProp ?? ctxTasks;
  const [taskForm, setTaskForm] = useState({ text: '', deadline: '' });
  const [showWaterModal, setShowWaterModal] = useState(false);
  const { addWater } = usePlants();

  const handleCompleteTask = (taskId) => {
    // Find the task to check its current state
    const task = tasks.find(t => t.id === taskId);
    const wasIncomplete = !task?.completed; // Check if task is currently incomplete

    // Mark task as complete/incomplete (toggle)
    completeTask(taskId);

    if (wasIncomplete) {
      // Task was incomplete, now being marked complete
      // Award 10 water points for completing the task
      addWater(10);

      // Show modal (they'll now have at least 10 water)
      setShowWaterModal(true);
    } else {
      // Task was complete, now being marked incomplete (Undo)
      // Deduct 10 water points
      addWater(-10);
    }
  };
  return (
    <>
      <div className="bg-card-bg p-4 sm:p-6 rounded-xl shadow-card">
        <h2 className="text-xl sm:text-2xl font-bold text-nav-text mb-4">Tasks</h2>

        {/* input form */}
        <div className="space-y-2 mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={taskForm.text}
              onChange={(e) => setTaskForm(f => ({ ...f, text: e.target.value }))}
              placeholder="Add a task..."
              className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent"
            />
            <button
              onClick={() => {
                if (taskForm.text.trim()) {
                  addTask(taskForm);
                  setTaskForm({ text: '', deadline: '' });
                }
              }}
              className="bg-accent text-white px-6 py-2 rounded-lg hover:opacity-90"
            >
              Add
            </button>
          </div>

          <input
            type="date"
            value={taskForm.deadline}
            onChange={(e) => setTaskForm(f => ({ ...f, deadline: e.target.value }))}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent text-sm"
          />
        </div>

        {/* task list */}
        <ul className="space-y-2">
          {tasks.map((t) => (
            <TaskItem key={t.id} task={t} onDelete={deleteTask} onComplete={handleCompleteTask} />
          ))}
        </ul>

        {tasks.length === 0 && (
          <p className="text-gray-500 text-sm text-center py-4">No tasks yet. Add one above!</p>
        )}
      </div>

      {showWaterModal && <WaterPlantModal onClose={() => setShowWaterModal(false)} />}
    </>
  );
}
