import { useState } from 'react';
import GardenCard from '../components/GardenCard';
import GardenSidebar from '../components/GardenSidebar';
import { usePlants } from '../hooks/usePlants';
import { Droplet, Menu, X } from 'lucide-react';

export default function Garden() {
  const { ownedPlants, coins, water, waterPlant } = usePlants();
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handlePlantClick = (plant) => {
    setSelectedPlant(plant);
  };

  const handleWaterPlant = async () => {
    const success = await waterPlant(selectedPlant.id);
    if (success) {
      setSelectedPlant(null);
    }
  };

  const averageHealth = ownedPlants.length > 0 
    ? Math.round(ownedPlants.reduce((sum, plant) => sum + plant.health, 0) / ownedPlants.length)
    : 0;

  const topRow = ownedPlants.slice(0, 3);
  const bottomRow = ownedPlants.slice(3, 5);

  return (
    <main className="flex bg-gradient-to-b from-white to-bg-gradient flex-col lg:flex-row items-center min-h-[calc(100vh-10rem)]">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed bottom-10 left-4 z-50 bg-accent text-white p-3 rounded-full shadow-lg hover:opacity-90"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

        <div className={`
        fixed lg:static top-16 bottom-0 left-0 lg:inset-y-0 z-40 
        transform transition-transform duration-300 ease-in-out
        flex items-center justify-center

        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
        <GardenSidebar 
            totalPlants={ownedPlants.length} 
            totalHealth={averageHealth}
            coins={coins}
            water={water}
        />
        </div>


      <section className="flex-1 bg-gradient-to-b from-white to-bg-gradient flex flex-col items-center py-6 md:py-10 px-4 md:px-7 w-full">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-nav-text mb-2">My Garden</h2>
        <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8">Take care of your plants by staying productive!</p>

        {ownedPlants.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 mb-4">Your garden is empty!</p>
            <a href="/plant-store" className="bg-accent text-white px-6 py-3 rounded-lg hover:opacity-90 inline-block">
              Visit Plant Store
            </a>
          </div>
        ) : (
          <>
            <div className="flex justify-center gap-4 sm:gap-6 md:gap-9 lg:gap-12 xl:gap-20 mb-8 md:mb-12 flex-wrap px-4 md:px-8 lg:px-16">
              {topRow.map((plant) => (
                <GardenCard key={plant.id} plant={plant} onClick={handlePlantClick} />
              ))}
            </div>

            <div className="flex justify-center gap-4 sm:gap-6 md:gap-9 lg:gap-12 xl:gap-20 mb-8 md:mb-12 flex-wrap px-4 md:px-8 lg:px-16">
              {bottomRow.map((plant) => (
                <GardenCard key={plant.id} plant={plant} onClick={handlePlantClick} />
              ))}
            </div>
          </>
        )}

        <div className="w-[88%] h-3 md:h-4 bg-nav-bg rounded-xl mt-auto" />
      </section>

      {selectedPlant && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" 
          onClick={() => setSelectedPlant(null)}
        >
          <div 
            className="bg-white rounded-xl p-4 sm:p-6 md:p-8 max-w-sm sm:max-w-md w-full" 
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedPlant.image} 
              alt={selectedPlant.customGoal || selectedPlant.name} 
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto mb-4 object-cover rounded-full shadow-lg" 
            />
            <h3 className="text-xl sm:text-2xl font-bold text-nav-text mb-2 text-center">{selectedPlant.customGoal || selectedPlant.name}</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 text-center">
              Owned for {selectedPlant.daysOwned} {selectedPlant.daysOwned === 1 ? 'day' : 'days'}
            </p>

            <div className="space-y-3 mb-4 md:mb-6 text-sm sm:text-base">
              <div className="bg-muted p-3 rounded-lg">
                <p className="font-semibold text-nav-text mb-1">Health: {selectedPlant.health}%</p>
                <div className="w-full h-3 bg-nav-text rounded-lg overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-accent to-light-green"
                    style={{ width: `${selectedPlant.health}%` }}
                  />
                </div>
              </div>

              <div className="bg-muted p-3 rounded-lg">
                <p className="font-semibold text-nav-text mb-1">Goal Progress</p>
                <p className="text-sm text-gray-600 mb-2">{selectedPlant.customGoal || selectedPlant.goal}</p>
                <div className="w-full h-3 bg-nav-text rounded-lg overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
                    style={{ width: `${(selectedPlant.progress / selectedPlant.goalTarget) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {selectedPlant.progress} / {selectedPlant.goalTarget} complete
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button 
                onClick={handleWaterPlant} 
                disabled={water < 10}
                className={`flex items-center justify-center gap-2 flex-1 py-2 sm:py-2.5 px-4 rounded-lg font-medium text-sm sm:text-base ${
                  water >= 10 
                    ? 'bg-accent text-white hover:opacity-90' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Droplet size={35}/> Water Plant (+10 health)
              </button>
              <button 
                onClick={() => setSelectedPlant(null)} 
                className="flex-1 bg-gray-300 text-gray-700 py-2 sm:py-2.5 px-4 rounded-lg hover:opacity-90 font-medium text-sm sm:text-base"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}