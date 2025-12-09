import { useEffect } from "react";
import { IoCheckmarkCircle, IoCloseCircle, IoInformationCircle } from "react-icons/io5";
import { colors } from "../styles";
import styles from "./Toast.module.css";

export type ToastType = "success" | "error" | "info";

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return <IoCheckmarkCircle size={20} color={colors.success} />;
      case "error":
        return <IoCloseCircle size={20} color={colors.error} />;
      case "info":
        return <IoInformationCircle size={20} color={colors.primary} />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return colors.success + "15";
      case "error":
        return colors.error + "15";
      case "info":
        return colors.primary + "15";
    }
  };

  return (
    <div
      className={styles.toast}
      style={{ backgroundColor: getBackgroundColor() }}
      onClick={onClose}
    >
      {getIcon()}
      <span className={styles.message}>{message}</span>
    </div>
  );
}

