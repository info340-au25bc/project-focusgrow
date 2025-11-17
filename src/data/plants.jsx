// Import images at the top
import plantOne from '../img/plant-one.png';
import plantTwo from '../img/plant-two.png';
import plantThree from '../img/plant-three.png';

// Plant data with all the info you'll need
export const PLANTS = [
  {
    id: 1,
    name: 'Seedling Sprout',
    image: plantOne,
    price: 50,
    growthStage: 'seedling',
    description: 'A fresh start for your productivity journey',
    health: 80,
    goal: 'Complete 5 focus sessions',
    isPurchased: false,
    purchaseDate: null,
  },
  {
    id: 2,
    name: 'Growing Greens',
    image: plantTwo,
    price: 100,
    growthStage: 'growing',
    description: 'Your efforts are taking root',
    health: 65,
    goal: 'Complete 15 focus sessions',
    isPurchased: false,
    purchaseDate: null,
  },
  {
    id: 3,
    name: 'Flourishing Flora',
    image: plantThree,
    price: 200,
    growthStage: 'mature',
    description: 'Full bloom of productivity',
    health: 90,
    goal: 'Complete 30 focus sessions',
    isPurchased: false,
    purchaseDate: null,
  },
  {
    id: 4,
    name: 'Victory Vine',
    image: plantThree,
    price: 150,
    growthStage: 'mature',
    description: 'A testament to your dedication',
    health: 75,
    goal: 'Maintain 7-day streak',
    isPurchased: false,
    purchaseDate: null,
  },
  {
    id: 5,
    name: 'Baby Bud',
    image: plantOne,
    price: 75,
    growthStage: 'seedling',
    description: 'Just starting to grow',
    health: 60,
    goal: 'Complete daily tasks for 3 days',
    isPurchased: false,
    purchaseDate: null,
  },
  {
    id: 6,
    name: 'Thriving Thicket',
    image: plantTwo,
    price: 125,
    growthStage: 'growing',
    description: 'Growing stronger each day',
    health: 70,
    goal: 'Complete 20 focus sessions',
    isPurchased: false,
    purchaseDate: null,
  },
  {
    id: 7,
    name: 'Champion Cherry',
    image: plantThree,
    price: 250,
    growthStage: 'mature',
    description: 'The ultimate achievement',
    health: 95,
    goal: 'Complete 50 focus sessions',
    isPurchased: false,
    purchaseDate: null,
  },
  {
    id: 8,
    name: 'Starter Stem',
    image: plantOne,
    price: 60,
    growthStage: 'seedling',
    description: 'Begin your green journey',
    health: 55,
    goal: 'Complete 3 focus sessions',
    isPurchased: false,
    purchaseDate: null,
  },
  {
    id: 9,
    name: 'Mighty Maple',
    image: plantTwo,
    price: 110,
    growthStage: 'growing',
    description: 'Steady growth ahead',
    health: 68,
    goal: 'Complete 12 focus sessions',
    isPurchased: false,
    purchaseDate: null,
  },
  {
    id: 10,
    name: 'Perfect Palm',
    image: plantThree,
    price: 180,
    growthStage: 'mature',
    description: 'Tropical productivity vibes',
    health: 85,
    goal: 'Complete 25 focus sessions',
    isPurchased: false,
    purchaseDate: null,
  },
  {
    id: 11,
    name: 'Tiny Tulip',
    image: plantOne,
    price: 45,
    growthStage: 'seedling',
    description: 'Small but mighty',
    health: 50,
    goal: 'Complete 2 focus sessions',
    isPurchased: false,
    purchaseDate: null,
  },
  {
    id: 12,
    name: 'Blooming Beauty',
    image: plantTwo,
    price: 135,
    growthStage: 'growing',
    description: 'Watch it flourish',
    health: 72,
    goal: 'Complete 18 focus sessions',
    isPurchased: false,
    purchaseDate: null,
  },
  {
    id: 13,
    name: 'Grand Garden',
    image: plantThree,
    price: 300,
    growthStage: 'mature',
    description: 'The crown jewel of your collection',
    health: 98,
    goal: 'Complete 60 focus sessions',
    isPurchased: false,
    purchaseDate: null,
  },
  {
    id: 14,
    name: 'Fresh Fern',
    image: plantOne,
    price: 65,
    growthStage: 'seedling',
    description: 'Delicate and determined',
    health: 58,
    goal: 'Complete 4 focus sessions',
    isPurchased: false,
    purchaseDate: null,
  },
];

// Helper functions for future use
export const getPlantById = (id) => {
  return PLANTS.find(plant => plant.id === id);
};

export const getPlantsByStage = (stage) => {
  return PLANTS.filter(plant => plant.growthStage === stage);
};

export const getPurchasedPlants = () => {
  return PLANTS.filter(plant => plant.isPurchased);
};

export const getAvailablePlants = () => {
  return PLANTS.filter(plant => !plant.isPurchased);
};