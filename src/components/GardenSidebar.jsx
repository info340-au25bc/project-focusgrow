export default function GardenSidebar({ totalPlants, totalHealth, coins }) {
  return (
    <aside className="hidden lg:flex w-full lg:w-[260px] bg-muted flex-col p-4 rounded-lg shadow-card ml-20 mt-0 mb-10 sticky top-20 h-fit gap-6">
      <h2 className="text-xl font-bold text-nav-text text-center mb-4">Garden Stats</h2>
      
      <div className="space-y-3">
        <div className="bg-white p-3 rounded-lg">
          <p className="text-xs text-gray-600 mb-0.5">Total Plants</p>
          <p className="text-2xl font-bold text-nav-text">{totalPlants}</p>
        </div>

        <div className="bg-white p-3 rounded-lg">
          <p className="text-xs text-gray-600 mb-0.5">Avg Health</p>
          <p className="text-2xl font-bold text-accent">{totalHealth}%</p>
        </div>

        <div className="bg-white p-3 rounded-lg">
          <p className="text-xs text-gray-600 mb-0.5">Your Coins</p>
          <p className="text-2xl font-bold text-yellow-600">{coins}</p>
        </div>
      </div>

      <div className="mt-4 p-3 bg-accent/10 rounded-lg">
        <p className="text-xs text-nav-text">
          💡 Water plants daily by completing focus sessions!
        </p>
      </div>
    </aside>
  );
}