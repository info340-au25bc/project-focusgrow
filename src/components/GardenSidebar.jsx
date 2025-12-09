import { Heart, Coins } from "lucide-react";
import GardenStatCard from "./GardenStatCard.jsx";
import GardenWaterCard from "./GardenWaterCard.jsx";

export default function GardenSidebar({ totalPlants, totalHealth, coins, water }) {
    return (
        <div className="min-h-[calc(100vh-14rem)] flex justify-center items-center">
            <aside className="w-72 lg:h-auto bg-card-bg p-4 flex flex-col gap-3 shadow-lg overflow-y-auto rounded-lg">
                <GardenStatCard totalPlants={totalPlants} totalHealth={totalHealth} />
                    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-2 mb-2">
                        <div className="bg-yellow-200 p-1.5 rounded-full">
                            <Coins className="text-yellow-600" size={18} />
                        </div>
                        <h3 className="text-lg font-bold text-nav-text">Coins</h3>
                    </div>
                    <p className="text-3xl font-bold text-yellow-600">{coins}</p>
                </div>
                <GardenWaterCard water={water} />

                {/* Care Tips Card */}
                <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="bg-red-100 p-1.5 rounded-full">
                        <Heart className="text-red-500" size={18} />
                        </div>
                        <h3 className="text-lg font-bold text-nav-text">Care Tips</h3>
                    </div>

                    <ul className="space-y-2 text-xs text-gray-700">
                        <li className="flex items-start gap-1.5">
                            <span className="text-green-500 font-bold">•</span>
                            <span>Water plants regularly</span>
                        </li>

                        <li className="flex items-start gap-1.5">
                            <span className="text-green-500 font-bold">•</span>
                            <span>Complete tasks for water</span>
                        </li>

                        <li className="flex items-start gap-1.5">
                            <span className="text-green-500 font-bold">•</span>
                            <span>Visit store for plants</span>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    );
}
