export default function HomeCard({ href, src, alt, size }) {
    const sizeClasses =
        size === "lg" ? "md:w-full md:max-w-xl md:h-80" : "size-48 md:size-64";

    return (
        <a href={href} className={`flex flex-col items-center justify-center rounded-xl shadow-md overflow-hidden bg-nav-bg p-4 hover:shadow-lg hover:scale-105 transition-transform ${sizeClasses}`}>
            <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover rounded-xl"
            />
        </a>
    );
}
