import { useState } from 'react';
import PlantCard from './PlantCard';
import { ArrowLeft, ArrowRight } from 'lucide-react';


export default function PlantCarousel({ plants, onPlantClick }) {
  const [currentPage, setCurrentPage] = useState(0);
  const plantsPerPage = 7;
  const totalPages = Math.ceil(plants.length / plantsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const startIndex = currentPage * plantsPerPage;
  const currentPlants = plants.slice(startIndex, startIndex + plantsPerPage);
  const topRow = currentPlants.slice(0, 4);
  const bottomRow = currentPlants.slice(4, 7);

  if (plants.length === 0) {
    return <p className="text-nav-text text-lg">No plants available</p>;
  }

  return (
    <div className="relative w-full px-4 md:px-8 lg:px-16">
      <div className="flex justify-center gap-4 sm:gap-6 md:gap-9 lg:gap-12 xl:gap-20 mb-8 md:mb-12 flex-wrap">
        {topRow.map((plant) => (
          <PlantCard key={plant.id} plant={plant} onClick={onPlantClick} />
        ))}
      </div>

      <div className="flex justify-center gap-4 sm:gap-6 md:gap-9 lg:gap-12 xl:gap-20 mb-8 md:mb-12 flex-wrap">
        {bottomRow.map((plant) => (
          <PlantCard key={plant.id} plant={plant} onClick={onPlantClick} />
        ))}
      </div>

      {totalPages > 1 && (
        <>
          <button
            onClick={prevPage}
            className="absolute left-0 md:left-4 lg:left-7 top-1/2 -translate-y-1/2 text-3xl md:text-4xl lg:text-5xl text-nav-text bg-white/80 hover:bg-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shadow-md hover:shadow-lg transition-all z-10"
            aria-label="Previous plants"
          >
            <ArrowRight className="rotate-180" />
          </button>

          <button
            onClick={nextPage}
            className="absolute right-0 md:right-4 lg:right-7 top-1/2 -translate-y-1/2 text-3xl md:text-4xl lg:text-5xl text-nav-text bg-white/80 hover:bg-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shadow-md hover:shadow-lg transition-all z-10"
            aria-label="Next plants"
          >
            <ArrowLeft className="rotate-180" />
          </button>
        </>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-colors ${
                i === currentPage ? 'bg-accent' : 'bg-gray-300'
              }`}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}