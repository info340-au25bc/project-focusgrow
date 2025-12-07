export default function GardenCard({ plant, onClick }) {
  const getHealthColor = (health) => {
    if (health >= 70) return 'from-accent to-light-green';
    if (health >= 40) return 'from-yellow-400 to-yellow-600';
    return 'from-red-400 to-red-600';
  };

  return (
    <div 
      onClick={() => onClick && onClick(plant)}
      className="flex flex-col items-center gap-2.5 bg-card-bg p-5 rounded-xl shadow-card w-[140px] sm:w-[160px] cursor-pointer hover:shadow-lg hover:scale-105 transition-all"
    >
      <img 
        src={plant.image} 
        alt={plant.customGoal}
        className="w-24 h-24 sm:w-28 sm:h-28 bg-nav-bg rounded-full shadow-inset-plant object-cover"
      />
      <div className="text-center w-full">
        <h3 className="font-semibold text-nav-text text-sm">{plant.customGoal}</h3>
        <p className="text-xs text-gray-600">
          {plant.daysOwned} {plant.daysOwned === 1 ? 'day' : 'days'} old
        </p>
      </div>
      <div className="w-full">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>Health</span>
          <span>{plant.health}%</span>
        </div>
        <div className="w-full h-2.5 bg-nav-text rounded-lg overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r ${getHealthColor(plant.health)} rounded-l-lg transition-all duration-300`}
            style={{ width: `${plant.health}%` }}
          />
        </div>
      </div>
    </div>
  );
}