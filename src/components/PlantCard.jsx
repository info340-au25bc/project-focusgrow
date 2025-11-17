export default function PlantCard({ plant, onClick }) {
  return (
    <div 
      onClick={() => onClick && onClick(plant)}
      className={`flex flex-col items-center gap-2 sm:gap-2.5 bg-card-bg p-3 sm:p-4 md:p-5 rounded-xl shadow-card min-w-[120px] sm:min-w-[140px] max-w-[160px] ${onClick ? 'cursor-pointer hover:shadow-lg hover:scale-105 transition-all' : ''}`}
    >
      <img 
        src={plant.image} 
        alt={plant.name}
        className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-nav-bg rounded-full shadow-inset-plant object-cover"
      />
      <div className="text-center w-full">
        <h3 className="font-semibold text-nav-text text-xs sm:text-sm truncate">{plant.name}</h3>
        <p className="text-[10px] sm:text-xs text-gray-600">{plant.price} coins</p>
      </div>
      <div className="w-full h-2 sm:h-2.5 md:h-3 bg-nav-text rounded-lg overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-accent to-light-green rounded-l-lg transition-all duration-300"
          style={{ width: `${plant.health}%` }}
        />
      </div>
    </div>
  );
}