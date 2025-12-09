import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { colors } from "../styles";
import { IoClose, IoSearchOutline, IoFilterOutline } from "react-icons/io5";
import { mockCalls } from "../lib/mockData";
import type { Call, Message, CallType, CallPriority } from "@/types";
import CallCard from "../components/CallCard";
import Loading from "../components/Loading";
import { useToast } from "../components/ToastProvider";
import styles from "./Calls.module.css";

export default function Calls() {
  const [searchParams] = useSearchParams();
  const filterType = searchParams.get("type") as CallType | null;
  const { showToast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [calls, setCalls] = useState<Call[]>(mockCalls);
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);
  const [showConversation, setShowConversation] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const handleUpdateCall = (updatedCall: Call) => {
    setCalls(calls.map((c) => (c.id === updatedCall.id ? updatedCall : c)));
    showToast(
      updatedCall.is_blocked
        ? "Samtalet har blockerats"
        : "Samtalet har avblockerats",
      "success"
    );
  };

  const handleDeleteCall = (id: string) => {
    setCalls(calls.filter((c) => c.id !== id));
    showToast("Samtalet har tagits bort", "success");
  };

  const handleTextBack = (phoneNumber: string) => {
    showToast(`Öppnar SMS till ${phoneNumber}`, "info");
    // In a real app, this would open SMS
    setTimeout(() => {
      window.open(`sms:${phoneNumber}`, "_self");
    }, 500);
  };

  const handlePriorityChange = (call: Call, priority: CallPriority) => {
    const updatedCall = { ...call, priority };
    setCalls(calls.map((c) => (c.id === updatedCall.id ? updatedCall : c)));
    const priorityLabels = { high: "Hög", medium: "Medel", low: "Låg" };
    showToast(`Prioritet ändrad till ${priorityLabels[priority]}`, "success");
  };

  const filteredCalls = calls.filter((call) => {
    const matchesType = !filterType || call.call_type === filterType;
    const matchesSearch =
      !searchQuery ||
      call.phone_number.includes(searchQuery) ||
      call.caller_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      call.transcript.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const renderConversation = (messages: Message[]) => (
    <div className={styles.conversation}>
      {messages.map((message, index) => (
        <div
          key={index}
          className={`${styles.message} ${
            message.role === "ai" ? styles.aiMessage : styles.callerMessage
          }`}
        >
          <p
            className={`${styles.messageText} ${
              message.role === "ai" ? styles.aiMessageText : ""
            }`}
          >
            {message.content}
          </p>
          <span
            className={`${styles.messageTime} ${
              message.role === "ai" ? styles.aiMessageTime : ""
            }`}
          >
            {new Date(message.timestamp).toLocaleTimeString("sv-SE")}
          </span>
        </div>
      ))}
    </div>
  );

  if (loading) return <Loading />;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Senaste Samtal</h1>
          <div className={styles.headerInfo}>
            <span className={styles.callCount}>
              {filteredCalls.length} av {calls.length} samtal
            </span>
            {filterType && (
              <span className={styles.filterBadge}>
                Filtrerat: {filterType}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className={styles.searchSection}>
        <div className={styles.searchContainer}>
          <IoSearchOutline size={20} color={colors.muted} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Sök efter nummer, namn eller innehåll..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          className={styles.filterButton}
          onClick={() => setShowFilters(!showFilters)}
        >
          <IoFilterOutline size={20} color={colors.primary} />
        </button>
      </div>

      {showFilters && (
        <div className={styles.filters}>
          <button
            className={`${styles.filterChip} ${!filterType ? styles.active : ""}`}
            onClick={() => window.history.replaceState({}, "", "/calls")}
          >
            Alla
          </button>
          {(["viktigt", "leads", "spam", "support", "säljare"] as CallType[]).map(
            (type) => (
              <button
                key={type}
                className={`${styles.filterChip} ${
                  filterType === type ? styles.active : ""
                }`}
                onClick={() =>
                  window.history.replaceState({}, "", `/calls?type=${type}`)
                }
              >
                {type}
              </button>
            )
          )}
        </div>
      )}

      <div className={styles.list}>
        {filteredCalls.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Inga samtal hittades</p>
            {searchQuery && (
              <button
                className={styles.clearButton}
                onClick={() => setSearchQuery("")}
              >
                Rensa sökning
              </button>
            )}
          </div>
        ) : (
          filteredCalls.map((call) => (
            <CallCard
              key={call.id}
              call={call}
              onPress={() => {
                setSelectedCall(call);
                setShowConversation(true);
              }}
              onUpdate={handleUpdateCall}
              onDelete={handleDeleteCall}
              onTextBack={handleTextBack}
              onPriorityChange={handlePriorityChange}
            />
          ))
        )}
      </div>

      {showConversation && selectedCall && (
        <div className={styles.modalOverlay} onClick={() => setShowConversation(false)}>
          <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <h2 className={styles.modalTitle}>
                  {selectedCall.caller_name || selectedCall.phone_number}
                </h2>
                <p className={styles.modalSubtitle}>
                  {new Date(selectedCall.created_at).toLocaleDateString("sv-SE", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <button
                className={styles.closeButton}
                onClick={() => setShowConversation(false)}
              >
                <IoClose size={24} color={colors.text} />
              </button>
            </div>
            <div className={styles.modalContent}>
              {renderConversation(selectedCall.conversation)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
