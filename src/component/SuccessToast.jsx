import { useEffect } from "react";
import './save-popup.css'

const SuccessToast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2500);
    console.log("saved")
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast success">
      ✅ {message || "Saved successfully"}
    </div>
  );
};
export default SuccessToast;
