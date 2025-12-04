import { createContext, useState, useEffect, useContext } from 'react';
import { INITIAL_TASKS, INITIAL_NOTES } from '../data/tasks';
import { PlantContext } from './PlantContext';
import { getDatabase, ref, onValue, update } from 'firebase/database';

// eslint-disable-next-line react-refresh/only-export-components
export const TaskNotesContext = createContext();

export function TaskNotesProvider({ children }) {
    const { user } = useContext(PlantContext);
    const db = getDatabase();

    const [tasks, setTasks] = useState(
        INITIAL_TASKS.map((t, idx) => ({ ...t, id: Date.now() + idx }))
    );
    const [notes, setNotes] = useState(INITIAL_NOTES);

    // sync from Firebase when user changes / logs in
    useEffect(() => {
        if (!user) {
            // not logged in: keep local state (or you could clear)
            return;
        }

        const userRef = ref(db, `users/${user.uid}`);

        const unsubscribe = onValue(userRef, (snapshot) => {
            const data = snapshot.val();

            if (data) {
                // Use DB values if present, otherwise keep current defaults
                if (Array.isArray(data.tasks) && data.tasks.length > 0) {
                    setTasks(data.tasks);
                } else {
                    // initialize tasks in DB if missing
                    update(userRef, { tasks });
                }

                if (Array.isArray(data.notes)) {
                    setNotes(data.notes);
                } else {
                    update(userRef, { notes });
                }
            } else {
                // No user record yet — initialize tasks/notes (won't overwrite other fields)
                update(userRef, { tasks, notes }).catch((err) => {
                    console.error('Failed to initialize user tasks/notes:', err);
                });
            }
        });

        return () => unsubscribe();
    }, [user]);

    const syncTasks = async (nextTasks) => {
        if (!user) return;
        try {
            await update(ref(db, `users/${user.uid}`), { tasks: nextTasks });
        } catch (err) {
            console.error('Error syncing tasks to DB:', err);
        }
    };

    const syncNotes = async (nextNotes) => {
        if (!user) return;
        try {
            await update(ref(db, `users/${user.uid}`), { notes: nextNotes });
        } catch (err) {
            console.error('Error syncing notes to DB:', err);
        }
    };

    const addTask = (taskData) => {
        const newTask = { ...taskData, id: Date.now() };
        setTasks((prev) => {
            const next = [...prev, newTask];
            syncTasks(next);
            return next;
        });
    };

    const deleteTask = (id) => {
        setTasks((prev) => {
            const next = prev.filter((t) => t.id !== id);
            syncTasks(next);
            return next;
        });
    };

    const addNote = (note) => {
        setNotes((prev) => {
            const next = [...prev, note];
            syncNotes(next);
            return next;
        });
    };

    const deleteNote = (idx) => {
        setNotes((prev) => {
            const next = prev.filter((_, i) => i !== idx);
            syncNotes(next);
            return next;
        });
    };

    return (
        <TaskNotesContext.Provider
            value={{
                tasks,
                notes,
                addTask,
                deleteTask,
                addNote,
                deleteNote,
            }}
        >
            {children}
        </TaskNotesContext.Provider>
    );
}
