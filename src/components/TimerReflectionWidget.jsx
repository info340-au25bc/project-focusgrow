import { useContext, useState } from 'react';
import { TaskNotesContext } from '../context/TaskNotesContext';

export default function TimerReflectionWidget() {
    const { addNote } = useContext(TaskNotesContext);
    const [reflectionText, setReflectionText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (reflectionText.trim()) {
            addNote(reflectionText);
            setReflectionText('');
        }
    };

    return (
        <section aria-labelledby="timer-reflection-heading"
            className="bg-[#c9dfc4] rounded-xl p-5 flex flex-col gap-3">
            <h2 id="timer-reflection-heading" className="text-sm font-semibold">
                Reflection
            </h2>

            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                <label htmlFor="reflection-field" className="sr-only">
                    Session notes
                </label>
                <textarea name="reflection"
                    id="reflection-field"
                    value={reflectionText}
                    onChange={(e) => setReflectionText(e.target.value)}
                    placeholder="What did you learn or notice about your productivity?"
                    className="w-full min-h-[140px] rounded-lg border border-[#b4c7ad] 
                     bg-white px-4 py-3 text-sm text-[#143a20] shadow-inner resize-none" />
                <button type="submit"
                    className="self-end bg-[#4d840c] text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-[#3f6e0a] transition-colors">
                    Save Note
                </button>
            </form>
        </section>
    );
}