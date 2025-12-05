import { ArrowLeft, ArrowRight } from "lucide-react";

export default function TimerSidePanelToggle({ isCollapsed, onToggle }) {
    return (
        <button
            type="button"
            onClick={onToggle}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-sm text-[#1f7a30] text-lg"
            aria-label={isCollapsed ? "Expand side panel" : "Collapse side panel"}
        >
            {isCollapsed ? <ArrowRight /> : <ArrowLeft />}
        </button>
    );
}