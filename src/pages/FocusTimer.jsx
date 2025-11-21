import Timer from "../components/Timer";

export default function FocusTimer() {
    return (
        <main className="min-h-screen bg-white pt-16 flex flex-col md:flex-row">
            {/* sidepanel */}

            <section className="flex-1 flex items-center justify-center px-4 py-8">
                <Timer />
            </section>
        </main>
    );
}