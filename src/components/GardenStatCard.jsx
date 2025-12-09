import { Sprout } from "lucide-react";

export default function GardenStatCard({ totalPlants, totalHealth }) {
    return (
        <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-2 mb-3">
                <div className="bg-green-100 p-1.5 rounded-full">
                    <Sprout className="text-accent" size={18} />
                </div>
                <h3 className="text-lg font-bold text-nav-text">Garden Stats</h3>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-gray-100 rounded-lg">
                    <span className="text-gray-900 text-sm font-medium">Total Plants</span>
                    <span className="font-bold text-nav-text text-xl">{totalPlants}</span>
                </div>

                <div className="flex justify-between items-center p-2 bg-gray-100 rounded-lg">
                    <span className="text-gray-900 text-sm font-medium">Avg Health</span>
                    <span className="font-bold text-nav-text text-xl">{totalHealth}%</span>
                </div>
            </div>
        </div>
    );
}
