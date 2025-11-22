export default function NoteItem({ note, onDelete, idx }) {
  return (
    <li className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
      <div className="flex-1 mr-2">
        <span className="text-sm sm:text-base text-nav-text">{note}</span>
      </div>
      <button
        onClick={() => onDelete(idx)}
        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:opacity-90 text-sm font-medium"
      >
        Delete
      </button>
    </li>
  );
}
