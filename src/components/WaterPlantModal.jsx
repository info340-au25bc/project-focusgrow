import { useState } from 'react';
import { usePlants } from '../hooks/usePlants';
import { Droplet, Coins, X } from 'lucide-react';

export default function WaterPlantModal({ onClose }) {
  const { ownedPlants, water, waterPlant, convertWaterToCoins } = usePlants();
  const [selectedPlantId, setSelectedPlantId] = useState(null);

  const availablePlants = ownedPlants.filter(p => p.health < 100);

  const handleWater = async () => {
    if (selectedPlantId) {
      const success = await waterPlant(selectedPlantId);
      if (success) {
        onClose();
      }
    }
  };

  const handleConvert = async () => {
    const success = await convertWaterToCoins();
    if (success) {
      onClose();
    }
  };

  if (water < 10) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-nav-text">You have {water} water points!</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        {availablePlants.length > 0 ? (
          <>
            <p className="text-gray-600 mb-4">Choose a plant to water (10 water points):</p>
            <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
              {availablePlants.map(plant => (
                <button
                  key={plant.id}
                  onClick={() => setSelectedPlantId(plant.id)}
                  className={`w-full p-3 rounded-lg border-2 text-left transition-colors ${
                    selectedPlantId === plant.id 
                      ? 'border-accent bg-green-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img src={plant.image} alt={plant.customGoal || plant.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <div className="font-semibold text-nav-text">{plant.customGoal || plant.name}</div>
                      <div className="text-sm text-gray-600">Health: {plant.health}%</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={handleWater}
              disabled={!selectedPlantId}
              className="w-full bg-accent text-white py-3 rounded-lg hover:opacity-90 disabled:bg-gray-300 disabled:cursor-not-allowed mb-2 flex items-center justify-center gap-2"
            >
              <Droplet size={20} /> Water Selected Plant
            </button>
          </>
        ) : (
          <p className="text-gray-600 mb-4">All your plants are at 100% health!</p>
        )}
        
        <button
            onClick={onClose}
            className="w-full bg-gray-400 text-white py-3 rounded-lg hover:bg-gray-500 flex items-center justify-center gap-2 mb-2"
            >
                Complete Later
        </button>

        <button
          onClick={handleConvert}
          className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 flex items-center justify-center gap-2"
        >
          <Coins size={20} /> Convert 10 Water to 10 Coins
        </button>
      </div>
    </div>
  );
}