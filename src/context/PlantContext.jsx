import { createContext, useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const PlantContext = createContext();

export function PlantProvider({ children }) {
  const [ownedPlants, setOwnedPlants] = useState([]);
  const [coins, setCoins] = useState(500);

  const purchasePlant = (plant) => {
    if (coins >= plant.price) {
      const newPlant = {
        ...plant,
        isPurchased: true,
        purchaseDate: new Date().toISOString(),
        daysOwned: 0,
        progress: 0,
      };
      setOwnedPlants([...ownedPlants, newPlant]);
      setCoins(coins - plant.price);
      return true;
    }
    return false;
  };

  const waterPlant = (plantId) => {
    setOwnedPlants(ownedPlants.map(plant => 
      plant.id === plantId 
        ? { ...plant, health: Math.min(100, plant.health + 10) }
        : plant
    ));
  };

  return (
    <PlantContext.Provider value={{ ownedPlants, coins, purchasePlant, waterPlant }}>
      {children}
    </PlantContext.Provider>
  );
}