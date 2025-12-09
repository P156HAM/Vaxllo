import Toast from "./Toast";
import type { ToastType } from "./Toast";
import styles from "./ToastContainer.module.css";

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

export default function ToastContainer({
  toasts,
  removeToast,
}: {
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
}) {
  return (
    <div className={styles.container}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}

