export default function TimerSidePanelToggle({ isCollapsed, onToggle }) {
    return (
        <button type="button"
            onClick={onToggle}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-sm text-[#1f7a30] text-lg"
            aria-labelledby={isCollapsed ? "Expand side panel" : "Collapse side panel"}>
            {isCollapsed ? ">" : "<"}
        </button>
    );
}