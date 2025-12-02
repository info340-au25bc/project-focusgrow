import { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set, onValue, update } from 'firebase/database';

//Was causing unnecessary error visual but no errors due to strict eslint rules - disabled on next line
// eslint-disable-next-line react-refresh/only-export-components
export const PlantContext = createContext();

export function PlantProvider({ children }) {
  const [ownedPlants, setOwnedPlants] = useState([]);
  const [coins, setCoins] = useState(500);
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
        } else {
          // Initialize new user data
          set(userRef, {
            ownedPlants: [],
            coins: 500,
            createdAt: new Date().toISOString()
          });
        }
      });

      return unsubscribe;
    } else {
      setOwnedPlants([]);
      setCoins(500);
    }
  }, [user, db]);

  const purchasePlant = async (plant) => {
    if (!user) {
      alert('Please log in to purchase plants!');
      return false;
    }

    if (coins >= plant.price) {
      const newPlant = {
        ...plant,
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
      return;
    }

    const updatedPlants = ownedPlants.map(plant => 
      plant.id === plantId 
        ? { ...plant, health: Math.min(100, plant.health + 10) }
        : plant
    );

    try {
      await update(ref(db, `users/${user.uid}`), {
        ownedPlants: updatedPlants
      });
    } catch (error) {
      console.error('Error watering plant:', error);
      alert('Failed to water plant. Please try again.');
    }
  };

  return (
    <PlantContext.Provider value={{ 
      ownedPlants, 
      coins, 
      user, 
      loading,
      purchasePlant, 
      waterPlant 
    }}>
      {children}
    </PlantContext.Provider>
  );
}