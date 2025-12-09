import HomeCard from "../components/HomeCard";
import { usePlants } from "../hooks/usePlants";
import TimerTaskWidget from "../components/TimerTaskWidget";
import HomeGardenPreview from "../components/HomeGardenPreview";
import HomePlantStorePreview from "../components/HomePlantStorePreview";

export default function Dashboard() {
    const { ownedPlants, water, coins } = usePlants();
    const previewPlants = [...ownedPlants]
        .sort((a, b) => a.health - b.health)
        .slice(0, 2);
    const averageHealth = ownedPlants.length > 0 ? Math.round(ownedPlants.reduce((sum, plant) => sum + plant.health, 0) / ownedPlants.length) : 0;

    return (
        <main className="flex flex-col items-center gap-8 p-5">

            {/* Large top card - Garden preview */}
            <div className="flex justify-center">
                <HomeCard to="/garden" size="lg">
                    <HomeGardenPreview previewPlants={previewPlants} totalPlants={ownedPlants.length} averageHealth={averageHealth} water={water} />
                </HomeCard>
            </div>

            {/* Row of 3 smaller cards */}
            <div className="flex gap-6 flex-wrap justify-center">
                <HomeCard to="/daily-tasks" size="sm">
                    <div className="w-full max-h-64 overflow-auto">
                        <TimerTaskWidget />
                    </div>
                </HomeCard>
                <HomeCard to="/focus-timer" size="sm">
                    <img src="./img/timer-preview.png" alt="A plant with a pomodoro timer below it." className="rounded-lg"></img>
                </HomeCard>
                <HomeCard to="/plant-store" size="sm">
                    <HomePlantStorePreview coins={coins} ownedPlants={ownedPlants} />
                </HomeCard>
            </div>
        </main>
    );
}
