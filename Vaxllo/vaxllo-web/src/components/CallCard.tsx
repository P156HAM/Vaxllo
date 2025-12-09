import { colors } from "../styles";
import type { Call, CallType, CallPriority } from "@/types";
import {
  IoCall,
  IoChatbubblesOutline,
  IoBan,
  IoCheckmarkCircle,
  IoTrashOutline,
  IoChevronDown,
  IoFlag,
} from "react-icons/io5";
import { useState } from "react";
import styles from "./CallCard.module.css";

interface CallCardProps {
  call: Call;
  onPress: () => void;
  onUpdate: (updatedCall: Call) => void;
  onDelete: (id: string) => void;
  onTextBack?: (phoneNumber: string) => void;
  onPriorityChange?: (call: Call, priority: CallPriority) => void;
}

const callTypeLabels: Record<CallType, string> = {
  viktigt: "Viktigt",
  leads: "leads",
  spam: "Spam",
  normal: "Normal",
  säljare: "Säljare",
  support: "Support",
  annat: "Annat",
};

export default function CallCard({
  call,
  onPress,
  onUpdate,
  onDelete,
  onTextBack,
  onPriorityChange,
}: CallCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCallBack = (phoneNumber: string) => {
    window.open(`tel:${phoneNumber}`, "_self");
  };

  const handleTextBack = (phoneNumber: string) => {
    if (onTextBack) {
      onTextBack(phoneNumber);
    } else {
      window.open(`sms:${phoneNumber}`, "_self");
    }
  };

  const handleBlock = () => {
    const updatedCall = { ...call, is_blocked: !call.is_blocked };
    onUpdate(updatedCall);
  };

  const handlePriorityChange = (priority: CallPriority) => {
    if (onPriorityChange) {
      onPriorityChange(call, priority);
    } else {
      const updatedCall = { ...call, priority };
      onUpdate(updatedCall);
    }
  };

  const handleDelete = () => {
    if (window.confirm("Är du säker på att du vill ta bort detta samtal?")) {
      onDelete(call.id);
    }
  };

  const renderCallTypeBadge = (callType: CallType) => {
    const badgeColors = {
      viktigt: colors.error,
      leads: colors.primary,
      spam: colors.muted,
      normal: colors.success,
      säljare: colors.secondary,
      support: colors.accent,
      annat: colors.muted,
    };

    if (callType === "normal") return null;

    return (
      <span
        className={styles.callTypeBadge}
        style={{ backgroundColor: badgeColors[callType] }}
      >
        {callTypeLabels[callType]}
      </span>
    );
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("sv-SE", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes > 0) {
      return `${minutes}m`;
    }
    return `${remainingSeconds}s`;
  };

  return (
    <div
      className={`${styles.card} ${call.is_blocked ? styles.blockedCard : ""}`}
    >
      <div
        className={styles.cardContent}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h3 className={styles.callerName}>
              {call.caller_name || call.phone_number}
            </h3>
            <div className={styles.metadata}>
              <span className={styles.time}>{formatTime(call.created_at)}</span>
              <span className={styles.separator}>•</span>
              <span className={styles.duration}>
                {formatDuration(call.duration)}
              </span>
              {call.is_blocked && (
                <>
                  <span className={styles.separator}>•</span>
                  <span className={styles.blockedText}>Blockerad</span>
                </>
              )}
            </div>
          </div>
          <div className={styles.headerRight}>
            {renderCallTypeBadge(call.call_type)}
            <IoChevronDown
              size={16}
              color={colors.muted}
              className={`${styles.chevron} ${isExpanded ? styles.chevronRotated : ""}`}
            />
          </div>
        </div>

        {!isExpanded && (
          <p className={styles.previewText}>{call.transcript}</p>
        )}
      </div>

      {isExpanded && (
        <div className={styles.expandedContent}>
          <p className={styles.fullTranscript}>{call.transcript}</p>
          
          {/* Priority Selector */}
          <div className={styles.prioritySection}>
            <label className={styles.priorityLabel}>Prioritet:</label>
            <div className={styles.priorityButtons}>
              {(["high", "medium", "low"] as CallPriority[]).map((priority) => (
                <button
                  key={priority}
                  className={`${styles.priorityButton} ${
                    call.priority === priority ? styles.priorityButtonActive : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePriorityChange(priority);
                  }}
                >
                  {priority === "high" && "Hög"}
                  {priority === "medium" && "Medel"}
                  {priority === "low" && "Låg"}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.actions}>
            <button
              className={`${styles.actionButton} ${styles.callButton}`}
              onClick={(e) => {
                e.stopPropagation();
                handleCallBack(call.phone_number);
              }}
              title="Ring tillbaka"
            >
              <IoCall size={18} color="#ffffff" />
            </button>
            <button
              className={styles.actionButton}
              onClick={(e) => {
                e.stopPropagation();
                handleTextBack(call.phone_number);
              }}
              title="Sms tillbaka"
            >
              <IoChatbubblesOutline size={18} color={colors.muted} />
            </button>
            <button
              className={styles.actionButton}
              onClick={(e) => {
                e.stopPropagation();
                onPress();
              }}
              title="Visa konversation"
            >
              <IoFlag size={18} color={colors.primary} />
            </button>
            <button
              className={styles.actionButton}
              onClick={(e) => {
                e.stopPropagation();
                handleBlock();
              }}
              title={call.is_blocked ? "Avblockera" : "Blockera"}
            >
              {call.is_blocked ? (
                <IoCheckmarkCircle
                  size={18}
                  color={colors.success}
                />
              ) : (
                <IoBan size={18} color={colors.warning} />
              )}
            </button>
            <button
              className={styles.actionButton}
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              title="Ta bort"
            >
              <IoTrashOutline size={18} color={colors.error} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

