export default function HomeCard({ href, src, alt, size }) {
    const sizeClasses =
        size === "lg"
        ? "w-full max-w-xl h-80"
        : "w-52 h-52 sm:w-60 sm:h-60 md:w-64 md:h-64"
;

    return (
        <a
        href={href}
        className={`flex flex-col items-center justify-center rounded-xl shadow-md overflow-hidden bg-nav-bg p-4 hover:shadow-lg hover:scale-105 transition-transform ${sizeClasses}`}>
        <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover rounded-xl"
        />
        </a>
    );
}
