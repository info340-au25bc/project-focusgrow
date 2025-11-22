import NoteItem from './NoteItem';

export default function NoteSection({ notes, noteInput, setNoteInput, onAdd, onDelete }) {
  return (
    <div className="bg-card-bg p-4 sm:p-6 rounded-xl shadow-card">
      <h2 className="text-xl sm:text-2xl font-bold text-nav-text mb-4">Notes</h2>

      {/* input form */}
      <div className="space-y-2 mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={noteInput}
            onChange={(e) => setNoteInput(e.target.value)}
            placeholder="Add a note..."
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent"
          />
          <button
            onClick={onAdd}
            className="bg-accent text-white px-6 py-2 rounded-lg hover:opacity-90"
          >
            Add
          </button>
        </div>
      </div>

      {/* note list */}
      <ul className="space-y-2">
        {notes.map((n, i) => (
          <NoteItem key={i} note={n} onDelete={onDelete} idx={i} />
        ))}
      </ul>

      {notes.length === 0 && (
        <p className="text-gray-500 text-sm text-center py-4">No notes yet. Add one above!</p>
      )}
    </div>
  );
}
