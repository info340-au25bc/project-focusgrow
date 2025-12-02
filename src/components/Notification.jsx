import { CheckCircle, XCircle } from "lucide-react";
import { useEffect } from "react";

const Notification = ({
  message,
  type = "success",
  onClose,
  autoClose = 4000,
}) => {
  const isSuccess = type === "success";

  useEffect(() => {
    if (!autoClose) return;
    const id = setTimeout(() => {
      onClose?.();
    }, autoClose);
    return () => clearTimeout(id);
  }, [autoClose, onClose]);

  return (
    <div
      role="alert"
      aria-live="polite"
      style={{
        top: "calc(var(--navbar-height, 64px) + 0.5rem)",
      }}
      className={`
        fixed z-[1100] 
        /* horizontal positioning: full width on xs, right-aligned on md+ */
        left-4 right-4 mx-auto 
        md:right-6 md:left-auto md:mx-0

        /* width constraints */
        w-auto max-w-[100%]
        sm:max-w-lg md:max-w-sm

        /* visuals */
        p-3 rounded-lg shadow-xl bg-white border-l-4
        transform transition-all duration-300 ease-out
        /* drop-in animation start state handled by opacity/translate-y */
        opacity-100
      `}
    >
      <div className="flex items-start md:items-center gap-3">
        {isSuccess ? (
          <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-500 flex-shrink-0 mt-0.5 md:mt-0" />
        ) : (
          <XCircle className="w-5 h-5 md:w-6 md:h-6 text-red-500 flex-shrink-0 mt-0.5 md:mt-0" />
        )}

        <div className="flex-1">
          <p className="text-sm md:text-base text-gray-800 font-medium break-words">
            {message}
          </p>
        </div>

        <button
          onClick={onClose}
          aria-label="Close notification"
          className="ml-3 text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          <span className="text-lg leading-none">&times;</span>
        </button>
      </div>
    </div>
  );
};

export default Notification;
