export default function TodoSection({ title, items, onDelete, children }) {
  return (
    <div className="bg-card-bg p-4 sm:p-6 rounded-xl shadow-card">
      <h2 className="text-xl sm:text-2xl font-bold text-nav-text mb-4">{title}</h2>

      <div className="space-y-2 mb-4">
        {children}
      </div>

      <ul className="space-y-2">
        {items.map((item, index) => {
          const isObject = typeof item === 'object';
          const text = isObject ? item.text : item;
          const deadline = isObject ? item.deadline : null;

          return (
            <li
              key={index}
              className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm"
            >
              <div className="flex-1 mr-2">
                <span className="text-sm sm:text-base text-nav-text">{text}</span>
                {deadline && (
                  <span className="ml-2 text-xs sm:text-sm text-accent font-medium">
                    ({new Date(deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})
                  </span>
                )}
              </div>
              <button
                onClick={() => onDelete(index)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:opacity-90 text-sm font-medium"
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>

      {items.length === 0 && (
        <p className="text-gray-500 text-sm text-center py-4">No items yet. Add one above!</p>
      )}
    </div>
  );
}
