import TaskItem from './TaskItem';

export default function TaskSection({ tasks, taskForm, setTaskForm, onAdd, onDelete }) {
  return (
    <div className="bg-card-bg p-4 sm:p-6 rounded-xl shadow-card">
      <h2 className="text-xl sm:text-2xl font-bold text-nav-text mb-4">Tasks</h2>

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
            onClick={onAdd}
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

      <ul className="space-y-2">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onDelete={onDelete} />
        ))}
      </ul>

      {tasks.length === 0 && (
        <p className="text-gray-500 text-sm text-center py-4">No tasks yet. Add one above!</p>
      )}
    </div>
  );
}
