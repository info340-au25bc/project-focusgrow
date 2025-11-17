import { useState } from 'react';

function DailyTasks() {
  const [tasks, setTasks] = useState(['Finish INFO 340 Problem Set 05', 'Go to the Gym']);
  const [taskInput, setTaskInput] = useState('');

  const [deadlines, setDeadlines] = useState(['INFO 340 PS05 Due Tonight']);
  const [deadlineInput, setDeadlineInput] = useState('');

  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState('');

  function handleAddTask() {
    if (taskInput !== '') {
      setTasks([...tasks, taskInput]);
      setTaskInput('');
    }
  }

  function handleDeleteTask(index) {
    const newTasks = tasks.filter((task, i) => i !== index);
    setTasks(newTasks);
  }

  function handleAddDeadline() {
    if (deadlineInput !== '') {
      setDeadlines([...deadlines, deadlineInput]);
      setDeadlineInput('');
    }
  }

  function handleDeleteDeadline(index) {
    const newDeadlines = deadlines.filter((deadline, i) => i !== index);
    setDeadlines(newDeadlines);
  }

  function handleAddNote() {
    if (noteInput !== '') {
      setNotes([...notes, noteInput]);
      setNoteInput('');
    }
  }

  function handleDeleteNote(index) {
    const newNotes = notes.filter((note, i) => i !== index);
    setNotes(newNotes);
  }

  return (
    <div>
      <h1>Daily Tasks</h1>

      <div>
        <h2>Tasks</h2>
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Add a task..."
        />
        <button onClick={handleAddTask}>Add Task</button>

        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              {task}
              <button onClick={() => handleDeleteTask(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Deadlines</h2>
        <input
          type="text"
          value={deadlineInput}
          onChange={(e) => setDeadlineInput(e.target.value)}
          placeholder="Add a deadline..."
        />
        <button onClick={handleAddDeadline}>Add Deadline</button>

        <ul>
          {deadlines.map((deadline, index) => (
            <li key={index}>
              {deadline}
              <button onClick={() => handleDeleteDeadline(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Notes</h2>
        <input
          type="text"
          value={noteInput}
          onChange={(e) => setNoteInput(e.target.value)}
          placeholder="Add a note..."
        />
        <button onClick={handleAddNote}>Add Note</button>

        <ul>
          {notes.map((note, index) => (
            <li key={index}>
              {note}
              <button onClick={() => handleDeleteNote(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DailyTasks;

