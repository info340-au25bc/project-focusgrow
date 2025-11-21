import { useState } from 'react';
import TodoSection from '../components/TodoSection';

export default function DailyTasks() {
  const [tasks, setTasks] = useState([
    { text: 'Finish INFO 340 Problem Set 05', deadline: '2025-11-20' },
    { text: 'Go to the Gym', deadline: '' }
  ]);

  const [taskForm, setTaskForm] = useState({ text: '', deadline: '' });

  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState('');

  const addTask = () => {
    if (!taskForm.text.trim()) return;

    setTasks(prev => [...prev, { ...taskForm }]);
    setTaskForm({ text: '', deadline: '' });
  };

  const removeTask = (index) => {
    setTasks(prev => prev.filter((_, i) => i !== index));
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
          
          <TodoSection
            title="Tasks"
            items={sortedTasks}
            onAdd={addTask}
            onDelete={removeTask}
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={taskForm.text}
                onChange={(e) =>
                  setTaskForm(f => ({ ...f, text: e.target.value }))
                }
                placeholder="Add a task..."
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent"
              />
              <button
                onClick={addTask}
                className="bg-accent text-white px-6 py-2 rounded-lg hover:opacity-90"
              >
                Add
              </button>
            </div>

            <input
              type="date"
              value={taskForm.deadline}
              onChange={(e) =>
                setTaskForm(f => ({ ...f, deadline: e.target.value }))
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent text-sm mt-2"
            />
          </TodoSection>

          <TodoSection
            title="Notes"
            items={notes}
            onAdd={addNote}
            onDelete={removeNote}
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                placeholder="Add a note..."
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent"
              />
              <button
                onClick={addNote}
                className="bg-accent text-white px-6 py-2 rounded-lg hover:opacity-90"
              >
                Add
              </button>
            </div>
          </TodoSection>

        </div>
      </div>
    </main>
  );
}