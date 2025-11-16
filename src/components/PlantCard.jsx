export default function PlantCard({ 
  imageSrc, 
  imageAlt, 
  healthPercentage = 60 
}) {
  return (
    <div className="flex flex-col items-center gap-2.5 bg-card-bg p-5 rounded-xl shadow-card min-w-[140px] cursor-pointer">
      <img 
        src={imageSrc} 
        alt={imageAlt}
        className="w-[28vw] max-w-[140px] aspect-square bg-nav-bg rounded-full shadow-inset-plant"
      />
      <div className="w-[min(34vw,140px)] h-3 bg-nav-text rounded-lg overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-accent to-light-green rounded-l-lg"
          style={{ width: `${healthPercentage}%` }}
        />
      </div>
    </div>
  );
}