import { useContext } from 'react';
import TaskSection from '../components/TaskSection';
import NoteSection from '../components/NoteSection';
import { TaskNotesContext } from '../context/TaskNotesContext';

export default function DailyTasks() {
  const { tasks } = useContext(TaskNotesContext);

  // sort tasks by deadline
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.deadline && !b.deadline) return -1;
    if (!a.deadline && b.deadline) return 1;
    return a.deadline && b.deadline
      ? new Date(a.deadline) - new Date(b.deadline)
      : 0;
  });

  return (
    <main className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-white to-bg-gradient py-6 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-nav-text text-center mb-8">Daily Tasks</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* tasks section */}
          <TaskSection tasks={sortedTasks} />

          {/* notes section */}
          <NoteSection />
        </div>
      </div>
    </main>
  );
}