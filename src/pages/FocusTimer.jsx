import Timer from "../components/Timer";

export default function FocusTimer() {
    return (
        <main className="min-h-[calc(100vh-64px)] bg-white flex flex-col items-center justify-center pt-10">
            {/* sidepanel */}

            <section className="min-h-screen bg-white flex items-center justify-center">
                <Timer />
            </section>
        </main>
    );
}