import { useState } from 'react';
import TodoSection from '../components/TodoSection';

export default function DailyTasks() {
  const [tasks, setTasks] = useState(['Finish INFO 340 Problem Set 05', 'Go to the Gym']);
  const [taskInput, setTaskInput] = useState('');

  const [deadlines, setDeadlines] = useState(['INFO 340 PS05 Due Tonight']);
  const [deadlineInput, setDeadlineInput] = useState('');

  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState('');

  function handleAddTask() {
    if (taskInput.trim() !== '') {
      setTasks([...tasks, taskInput]);
      setTaskInput('');
    }
  }

  function handleDeleteTask(index) {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  }

  function handleAddDeadline() {
    if (deadlineInput.trim() !== '') {
      setDeadlines([...deadlines, deadlineInput]);
      setDeadlineInput('');
    }
  }

  function handleDeleteDeadline(index) {
    const newDeadlines = deadlines.filter((_, i) => i !== index);
    setDeadlines(newDeadlines);
  }

  function handleAddNote() {
    if (noteInput.trim() !== '') {
      setNotes([...notes, noteInput]);
      setNoteInput('');
    }
  }

  function handleDeleteNote(index) {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
  }

  return (
    <main className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-white to-bg-gradient py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-nav-text text-center mb-8">
          Daily Tasks
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TodoSection
            title="Tasks"
            items={tasks}
            input={taskInput}
            onInputChange={setTaskInput}
            onAdd={handleAddTask}
            onDelete={handleDeleteTask}
            placeholder="Add a task..."
          />

          <TodoSection
            title="Deadlines"
            items={deadlines}
            input={deadlineInput}
            onInputChange={setDeadlineInput}
            onAdd={handleAddDeadline}
            onDelete={handleDeleteDeadline}
            placeholder="Add a deadline..."
          />

          <TodoSection
            title="Notes"
            items={notes}
            input={noteInput}
            onInputChange={setNoteInput}
            onAdd={handleAddNote}
            onDelete={handleDeleteNote}
            placeholder="Add a note..."
          />
        </div>
      </div>
    </main>
  );
}
