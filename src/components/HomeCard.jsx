import { Link } from "react-router-dom";

export default function HomeCard({ to, size = "sm", className = "", children }) {
    const sizeClasses =
        size === "lg" ? "w-full h-80 p md:max-w-xl md:h-80" : "size-70 md:size-64";

    return (
        <Link to={to} className="block">
            <div className={`flex items-center rounded-xl shadow-md overflow-hidden bg-nav-bg p-4 hover:shadow-lg hover:scale-105 transition-transform mx-auto ${sizeClasses} ${className}`}>
                {children}
            </div>
        </Link>
    );
}
