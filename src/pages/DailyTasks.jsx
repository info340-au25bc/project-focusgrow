import { useState } from 'react';
import TaskSection from '../components/TaskSection';
import NoteSection from '../components/NoteSection';
import { INITIAL_TASKS, INITIAL_NOTES } from '../data/tasks';

export default function DailyTasks() {
  const [tasks, setTasks] = useState(
    INITIAL_TASKS.map((t, idx) => ({ ...t, id: Date.now() + idx }))
  );
  const [taskForm, setTaskForm] = useState({ text: '', deadline: '' });

  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [noteInput, setNoteInput] = useState('');

  const handleAddTask = () => {
    if (!taskForm.text.trim()) return;
    setTasks(prev => [...prev, { ...taskForm, id: Date.now() }]);
    setTaskForm({ text: '', deadline: '' });
  };

  const handleDeleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  // sort tasks by deadline
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.deadline && !b.deadline) return -1;
    if (!a.deadline && b.deadline) return 1;
    return a.deadline && b.deadline
      ? new Date(a.deadline) - new Date(b.deadline)
      : 0;
  });

  const handleAddNote = () => {
    if (noteInput.trim().length === 0) return;

    setNotes(prev => [...prev, noteInput]);
    setNoteInput('');
  };

  const handleDeleteNote = (idx) => {
    setNotes(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <main className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-white to-bg-gradient py-6 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-nav-text text-center mb-8">Daily Tasks</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* tasks section */}
          <TaskSection
            tasks={sortedTasks}
            taskForm={taskForm}
            setTaskForm={setTaskForm}
            onAdd={handleAddTask}
            onDelete={handleDeleteTask}
          />

          {/* notes section */}
          <NoteSection
            notes={notes}
            noteInput={noteInput}
            setNoteInput={setNoteInput}
            onAdd={handleAddNote}
            onDelete={handleDeleteNote}
          />
        </div>
      </div>
    </main>
  );
}