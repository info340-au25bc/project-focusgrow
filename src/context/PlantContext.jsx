import { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set, onValue, update } from 'firebase/database';

// eslint-disable-next-line react-refresh/only-export-components
export const PlantContext = createContext();

export function PlantProvider({ children }) {
  const [ownedPlants, setOwnedPlants] = useState([]);
  const [coins, setCoins] = useState(500);
  const [water, setWater] = useState(0);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const db = getDatabase();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, [auth]);

  useEffect(() => {
    if (user) {
      const userRef = ref(db, `users/${user.uid}`);
      
      const unsubscribe = onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setOwnedPlants(data.ownedPlants || []);
          setCoins(data.coins || 500);
          setWater(data.waterDrops || 0);
        } else {
          set(userRef, {
            ownedPlants: [],
            coins: 500,
            waterDrops: 0,
            createdAt: new Date().toISOString()
          });
        }
      });

      return unsubscribe;
    } else {
      setOwnedPlants([]);
      setCoins(500);
      setWater(0);
    }
  }, [user, db]);

  const purchasePlant = async (plant, customGoal) => {
    if (!user) {
      alert('Please log in to purchase plants!');
      return false;
    }

    if (customGoal && ownedPlants.some(p => p.customGoal === customGoal.trim())) {
      alert('You already have a plant with this goal!');
      return false;
    }

    if (coins >= plant.price) {
      const newPlant = {
        ...plant,
        customGoal: customGoal ? customGoal.trim() : plant.goal,
        isPurchased: true,
        purchaseDate: new Date().toISOString(),
        daysOwned: 0,
        progress: 0,
      };

      const updatedPlants = [...ownedPlants, newPlant];
      const updatedCoins = coins - plant.price;

      try {
        await update(ref(db, `users/${user.uid}`), {
          ownedPlants: updatedPlants,
          coins: updatedCoins
        });
        return true;
      } catch (error) {
        console.error('Error purchasing plant:', error);
        alert('Failed to purchase plant. Please try again.');
        return false;
      }
    }
    return false;
  };

  const waterPlant = async (plantId) => {
    if (!user) {
      alert('Please log in to water plants!');
      return false;
    }

    if (water < 10) {
      alert('Not enough water points!');
      return false;
    }

    const updatedPlants = ownedPlants.map(plant => 
      plant.id === plantId 
        ? { ...plant, health: Math.min(100, plant.health + 10) }
        : plant
    );

    try {
      await update(ref(db, `users/${user.uid}`), {
        ownedPlants: updatedPlants,
        waterDrops: water - 10
      });
      return true;
    } catch (error) {
      console.error('Error watering plant:', error);
      alert('Failed to water plant. Please try again.');
      return false;
    }
  };

  const convertWaterToCoins = async () => {
    if (!user) {
      alert('Please log in!');
      return false;
    }

    if (water < 10) {
      alert('Not enough water points!');
      return false;
    }

    try {
      await update(ref(db, `users/${user.uid}`), {
        coins: coins + 10,
        waterDrops: water - 10
      });
      return true;
    } catch (error) {
      console.error('Error converting water:', error);
      alert('Failed to convert water. Please try again.');
      return false;
    }
  };

  const addWater = async (amount) => {
    if (!user) return;

    try {
      await update(ref(db, `users/${user.uid}`), {
        waterDrops: water + amount
      });
    } catch (error) {
      console.error('Error adding water:', error);
    }
  };

  return (
    <PlantContext.Provider value={{ 
      ownedPlants, 
      coins,
      water,
      user, 
      loading,
      purchasePlant, 
      waterPlant,
      convertWaterToCoins,
      addWater
    }}>
      {children}
    </PlantContext.Provider>
  );
}