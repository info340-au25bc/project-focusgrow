import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlantCarousel from '../components/PlantCarousel';
import { PLANTS } from '../data/plants';
import { usePlants } from '../hooks/usePlants';

export default function PlantStore() {
  const [selectedPlant, setSelectedPlant] = useState(null);
  const { coins, purchasePlant, ownedPlants } = usePlants();
  const navigate = useNavigate();

  const handlePlantClick = (plant) => {
    setSelectedPlant(plant);
  };

  const handlePurchase = () => {
    const success = purchasePlant(selectedPlant);
    if (success) {
      alert(`Successfully purchased ${selectedPlant.name}!`); //TODO: fix alert to look nicer (popup component maybe)
      setSelectedPlant(null);
      navigate('/garden'); //using navigate to immediately redirect user to garden post purchase
    } else {
      alert('Not enough coins!'); //TODO: fix alert to look nicer (popup component maybe)
    }
  };

  // Filter out already owned plants
  const availablePlants = PLANTS.filter(
    plant => !ownedPlants.some(owned => owned.id === plant.id)
  );

  return (
    <main className="flex min-h-[calc(100vh-64px)] bg-white">
      <section className="flex-1 bg-gradient-to-b from-white to-bg-gradient flex flex-col items-center justify-center relative py-6 md:py-10 px-4 md:px-7">
        <div className="flex items-center gap-4 mb-4 md:mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-nav-text">Plant Store</h2>
          <div className="bg-yellow-100 px-4 py-2 rounded-lg">
            <span className="text-yellow-700 font-bold text-lg">{coins} coins</span>
          </div>
        </div>
        
        {availablePlants.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 mb-4">You own all available plants!</p>
            <a href="/garden" className="bg-accent text-white px-6 py-3 rounded-lg hover:opacity-90 inline-block">
              Go to Garden
            </a>
          </div>
        ) : (
          <PlantCarousel plants={availablePlants} onPlantClick={handlePlantClick} />
        )}
        
        <div className="w-[88%] h-3 md:h-4 bg-nav-bg rounded-xl mt-4 md:mt-6" />
      </section>

      {selectedPlant && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedPlant(null)}>
          <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 max-w-sm sm:max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <img src={selectedPlant.image} alt={selectedPlant.name} className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto mb-4 object-cover rounded-full shadow-lg" />
            <h3 className="text-xl sm:text-2xl font-bold text-nav-text mb-2 text-center">{selectedPlant.name}</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 text-center">{selectedPlant.description}</p>
            <div className="space-y-2 mb-4 md:mb-6 text-sm sm:text-base">
              <p><span className="font-semibold">Price:</span> {selectedPlant.price} coins</p>
              <p><span className="font-semibold">Growth Stage:</span> {selectedPlant.growthStage}</p>
              <p><span className="font-semibold">Goal:</span> {selectedPlant.goal}</p>
              <p><span className="font-semibold">Health:</span> {selectedPlant.health}%</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button 
                onClick={handlePurchase} 
                disabled={coins < selectedPlant.price}
                className={`flex-1 py-2 sm:py-2.5 px-4 rounded-lg font-medium text-sm sm:text-base ${
                  coins >= selectedPlant.price 
                    ? 'bg-accent text-white hover:opacity-90' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Purchase ({selectedPlant.price} coins)
              </button>
              <button onClick={() => setSelectedPlant(null)} className="flex-1 bg-gray-300 text-gray-700 py-2 sm:py-2.5 px-4 rounded-lg hover:opacity-90 font-medium text-sm sm:text-base">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}