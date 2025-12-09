import GardenCard from "../components/GardenCard";
import { PLANTS } from "../data/plants";

export default function HomePlantStorePreview({ ownedPlants, coins }) {
    const availablePlants = PLANTS.filter(
        plant => !ownedPlants.some(owned => owned.id === plant.id)
    );

    const previewPlants = availablePlants.slice(0, 2);
    return (
        <div className="flex flex-col w-full h-full bg-white rounded-lg p-4 gap-1.5">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-nav-text">Plant Store</h2>
                <div className="flex items-center">
                    <div className="bg-yellow-100 px-2 py-1 rounded-lg">
                        <span className="text-yellow-700 font-bold text-lg md:text-xs">{coins} coins</span>
                    </div>
                </div>
            </div>

            <p className="text-center text-md md:text-xs text-gray-700 md:mt-1">
                New plants are waiting for you!
            </p>

            <div className="flex justify-center md:h-20 md:scale-50 gap-4 mt-2 md:mt-0 md:mb-2 md:gap-8">
                {previewPlants.length > 0 ? (
                    previewPlants.map((plant) => (
                        <div key={plant.id} className="w-full h-full">
                            <GardenCard plant={plant} onClick={() => { }} className="cursor-pointer" />
                        </div>))) : (
                    <p className="text-gray-500">No new plants available</p>
                )}
            </div>
        </div>
    );
}
