import { createContext, useState } from 'react';
import { INITIAL_TASKS, INITIAL_NOTES } from '../data/tasks';

// eslint-disable-next-line react-refresh/only-export-components
export const TaskNotesContext = createContext();

export function TaskNotesProvider({ children }) {
    const [tasks, setTasks] = useState(
        INITIAL_TASKS.map((t, idx) => ({ ...t, id: Date.now() + idx }))
    );
    const [notes, setNotes] = useState(INITIAL_NOTES);

    const addTask = (taskData) => {
        setTasks(prev => [...prev, { ...taskData, id: Date.now() }]);
    };

    const deleteTask = (id) => {
        setTasks(prev => prev.filter(t => t.id !== id));
    };

    const addNote = (note) => {
        setNotes(prev => [...prev, note]);
    };

    const deleteNote = (idx) => {
        setNotes(prev => prev.filter((_, i) => i !== idx));
    };

    return (
        <TaskNotesContext.Provider value={{
            tasks,
            notes,
            addTask,
            deleteTask,
            addNote,
            deleteNote,
        }}>
            {children}
        </TaskNotesContext.Provider>
    );
}
