import HomeCard from "../components/HomeCard";

export default function Dashboard() {
    return (
        <main className="flex flex-col items-center gap-8 py-5">
            <div className="flex justify-center w-full">
                <HomeCard
                href="/garden"
                src="../img/garden-preview.png"
                alt="Dashboard showing virtual plant garden with health bars"
                size="lg"
                />
            </div>

            <div className="flex gap-6 flex-wrap justify-center">
                <HomeCard
                href="/daily-tasks"
                src="img/daily-tasks-preview.png"
                alt="Daily tasks page with list and deadlines"
                size="sm"
                />
                <HomeCard
                href="/focus-timer"
                src="img/timer-preview.png"
                alt="Focus timer with pomodoro settings"
                size="sm"
                />
                <HomeCard
                href="/plant-store"
                src="img/plant-store-preview.png"
                alt="Plant store showing available plants"
                size="sm"
                />
            </div>
        </main>
    );
}