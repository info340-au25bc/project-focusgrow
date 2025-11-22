import { useState } from 'react';
import TaskSection from '../components/TaskSection';
import NoteSection from '../components/NoteSection';
import { INITIAL_TASKS, INITIAL_NOTES } from '../data/tasks';

export default function DailyTasks() {
  const [tasks, setTasks] = useState(
    INITIAL_TASKS.map((task, idx) => ({ ...task, id: Date.now() + idx }))
  );
  const [taskForm, setTaskForm] = useState({ text: '', deadline: '' });

  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [noteInput, setNoteInput] = useState('');

  const addTask = () => {
    if (!taskForm.text.trim()) return;
    setTasks(prev => [...prev, { ...taskForm, id: Date.now() }]);
    setTaskForm({ text: '', deadline: '' });
  };

  const removeTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.deadline && !b.deadline) return -1;
    if (!a.deadline && b.deadline) return 1;
    return a.deadline && b.deadline
      ? new Date(a.deadline) - new Date(b.deadline)
      : 0;
  });

  const addNote = () => {
    if (!noteInput.trim()) return;
    setNotes(prev => [...prev, noteInput]);
    setNoteInput('');
  };

  const removeNote = (index) => {
    setNotes(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <main className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-white to-bg-gradient py-6 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-nav-text text-center mb-8">Daily Tasks</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TaskSection
            tasks={sortedTasks}
            taskForm={taskForm}
            setTaskForm={setTaskForm}
            onAdd={addTask}
            onDelete={removeTask}
          />

          <NoteSection
            notes={notes}
            noteInput={noteInput}
            setNoteInput={setNoteInput}
            onAdd={addNote}
            onDelete={removeNote}
          />
        </div>
      </div>
    </main>
  );
}