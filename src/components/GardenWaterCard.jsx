import { Droplet } from "lucide-react";

export default function GardenWaterCard({ water }) {
    return (
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-2 mb-2">
                <div className="bg-blue-200 p-1.5 rounded-full">
                    <Droplet className="text-blue-600" size={18} />
                </div>
                <h3 className="text-lg font-bold text-nav-text">Water Points</h3>
            </div>
            <p className="text-3xl font-bold text-blue-600">{water}</p>
        </div>
    );
}
