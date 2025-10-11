import { useEffect } from "react";

export default function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // Se cierra en 3s
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast" role="status" aria-live="polite">
      {message}
    </div>
  );
}
