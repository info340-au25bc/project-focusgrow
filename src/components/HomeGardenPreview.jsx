import GardenCard from "../components/GardenCard";
import GardenStatCard from "../components/GardenStatCard";
import GardenWaterCard from "./GardenWaterCard";

export default function HomeGardenPreview({ previewPlants, totalPlants, averageHealth, water }) {
    return (
        <div className="flex flex-col w-full h-full bg-white rounded-lg p-2 overflow-hidden">
            {previewPlants.length > 0 && (
                <div className="flex flex-col items-center">
                    <h2 className="text-lg font-bold text-nav-text text-center">My Garden</h2>
                    <p className="text-red-600 text-sm font-semibold text-center">
                        These plants need water!
                    </p>
                </div>
            )}

            <div className="flex w-full h-10 justify-center">
                <div className="flex flex-col gap-3 scale-75 flex-none">
                    <GardenStatCard totalPlants={totalPlants} totalHealth={averageHealth} />
                    <GardenWaterCard water={water} />
                </div>

                <div className="flex justify-center pr-4 md:gap-2">
                    {previewPlants[0] && (
                        <div className="h-60 scale-75">
                            <GardenCard plant={previewPlants[0]} onClick={() => { }} className="cursor-default" />
                        </div>
                    )}

                    {previewPlants[1] && (
                        <div className="h-60 scale-75 hidden md:block">
                            <GardenCard plant={previewPlants[1]} onClick={() => { }} className="cursor-default" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
