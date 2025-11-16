import PlantCard from "../PlantCard";

export default function PlantStore() {
  const topRowPlants = [
    //TODO: see if there is a way to make the alt text change based on plant size
    { src: '/src/img/plant-one.png', alt: 'Small plant' },
    { src: '/src/img/plant-three.png', alt: 'Fully grown plant' },
    { src: '/src/img/plant-two.png', alt: 'Medium plant' },
    { src: '/src/img/plant-three.png', alt: 'Fully grown plant' },
  ];

const bottomRowPlants = [
    { src: '/src/img/plant-one.png', alt: 'Small plant' },
    { src: '/src/img/plant-two.png', alt: 'Medium plant' },
    { src: '/src/img/plant-three.png', alt: 'Fully grown plant' },
];

  return (
    <main className="flex min-h-[calc(100vh-64px)] bg-white">
      <section className="flex-1 bg-gradient-to-b from-white to-bg-gradient flex flex-col items-center justify-center relative py-10 px-7">
        
        <div className="flex justify-center gap-9 md:gap-12 lg:gap-20 mb-12 flex-wrap">
          {topRowPlants.map((plant, i) => (
            <PlantCard key={i} imageSrc={plant.src} imageAlt={plant.alt} />
          ))}
        </div>

        <div className="flex justify-center gap-9 md:gap-12 lg:gap-20 mb-12 flex-wrap">
          {bottomRowPlants.map((plant, i) => (
            <PlantCard key={i} imageSrc={plant.src} imageAlt={plant.alt} />
          ))}
        </div>

        <div className="absolute right-7 top-1/2 -translate-y-1/2 text-4xl text-gray-500" aria-hidden="true">
          &#8250;
        </div>

        <div className="w-[88%] h-4 bg-nav-bg rounded-xl mt-4" />
      </section>
    </main>
  );
}