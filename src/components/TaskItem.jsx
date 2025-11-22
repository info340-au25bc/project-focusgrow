export default function TaskItem({ task, onDelete }) {
  const formattedDate = task.deadline
    ? new Date(task.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    : null;

  return (
    <li className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
      <div className="flex-1 mr-2">
        <span className="text-sm sm:text-base text-nav-text">{task.text}</span>
        {formattedDate && (
          <span className="ml-2 text-xs sm:text-sm text-accent font-medium">
            ({formattedDate})
          </span>
        )}
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:opacity-90 text-sm font-medium"
      >
        Delete
      </button>
    </li>
  );
}
