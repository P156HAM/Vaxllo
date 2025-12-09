import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../lib/store";
import { colors } from "../styles";
import { IoAdd, IoClose, IoLogOutOutline } from "react-icons/io5";
import { useToast } from "../components/ToastProvider";
import styles from "./Settings.module.css";

interface AllowedNumber {
  id: string;
  number: string;
  label: string;
}

export default function Settings() {
  const navigate = useNavigate();
  const { theme, notifications, setTheme, setNotifications, logout } = useStore();
  const { showToast } = useToast();

  const [aiSettings, setAiSettings] = useState({
    virtualNumber: "+46 10 750 41 01",
    greetingMessage:
      "Hej, detta är [Företagsnamn]s assistent. Samtalet kommer att registreras och vidarebefordras till företagets ägare. Tack!",
    responseMode: "all" as "all" | "unknown" | "business_hours",
  });

  const [allowedNumbers, setAllowedNumbers] = useState<AllowedNumber[]>([
    { id: "1", number: "112", label: "Polisen" },
    { id: "2", number: "1177", label: "Sjukvårdsupplysningen" },
  ]);

  const [showAddNumberModal, setShowAddNumberModal] = useState(false);
  const [newNumber, setNewNumber] = useState({ number: "", label: "" });

  const handleSignOut = () => {
    logout();
    navigate("/");
    showToast("Du har loggat ut", "info");
  };

  const removeAllowedNumber = (id: string) => {
    setAllowedNumbers(allowedNumbers.filter((item) => item.id !== id));
    showToast("Nummer borttaget", "success");
  };

  const handleAddNumber = () => {
    if (!newNumber.number || !newNumber.label) {
      showToast("Vänligen fyll i både nummer och etikett", "error");
      return;
    }

    const newId = Date.now().toString();
    setAllowedNumbers([
      ...allowedNumbers,
      { id: newId, number: newNumber.number, label: newNumber.label },
    ]);
    setNewNumber({ number: "", label: "" });
    setShowAddNumberModal(false);
    showToast("Nummer tillagt", "success");
  };

  const handleAddAllContacts = () => {
    // Mock: Add some common Swedish numbers
    const commonNumbers: AllowedNumber[] = [
      { id: Date.now().toString(), number: "112", label: "Nödnummer" },
      { id: (Date.now() + 1).toString(), number: "11414", label: "Kundtjänst" },
    ];

    setAllowedNumbers([...allowedNumbers, ...commonNumbers]);
    showToast(`${commonNumbers.length} nummer tillagda`, "success");
  };

  const handleSaveSettings = () => {
    showToast("Inställningar sparade", "success");
  };

  return (
    <div className={styles.container}>
      <div className={styles.scrollContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>Inställningar</h1>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>AI-assistent</h2>

          <div className={styles.settingGroup}>
            <label className={styles.settingLabel}>Virtuellt nummer</label>
            <div className={styles.numberDisplay}>
              <span className={styles.numberText}>{aiSettings.virtualNumber}</span>
            </div>
            <p className={styles.helperText}>
              Detta nummer kan användas för att ta emot samtal
            </p>
          </div>

          <div className={styles.settingGroup}>
            <label className={styles.settingLabel}>AI hälsningsmeddelande</label>
            <textarea
              className={styles.textInput}
              value={aiSettings.greetingMessage}
              onChange={(e) =>
                setAiSettings({ ...aiSettings, greetingMessage: e.target.value })
              }
              placeholder="Skriv ditt meddelande..."
            />
            <p className={styles.helperText}>
              Detta meddelande läses upp för alla som ringer
            </p>
          </div>

          <div className={styles.settingGroup}>
            <label className={styles.settingLabel}>När ska AI svara?</label>

            <div className={styles.radioGroup}>
              <button
                className={styles.radioOption}
                onClick={() =>
                  setAiSettings({ ...aiSettings, responseMode: "all" })
                }
              >
                <div
                  className={`${styles.radioButton} ${
                    aiSettings.responseMode === "all" ? styles.radioButtonActive : ""
                  }`}
                >
                  {aiSettings.responseMode === "all" && (
                    <div className={styles.radioButtonDot} />
                  )}
                </div>
                <span className={styles.radioText}>Alla samtal</span>
              </button>

              <button
                className={styles.radioOption}
                onClick={() =>
                  setAiSettings({ ...aiSettings, responseMode: "unknown" })
                }
              >
                <div
                  className={`${styles.radioButton} ${
                    aiSettings.responseMode === "unknown"
                      ? styles.radioButtonActive
                      : ""
                  }`}
                >
                  {aiSettings.responseMode === "unknown" && (
                    <div className={styles.radioButtonDot} />
                  )}
                </div>
                <span className={styles.radioText}>Endast okända nummer</span>
              </button>

              <button
                className={styles.radioOption}
                onClick={() =>
                  setAiSettings({ ...aiSettings, responseMode: "business_hours" })
                }
              >
                <div
                  className={`${styles.radioButton} ${
                    aiSettings.responseMode === "business_hours"
                      ? styles.radioButtonActive
                      : ""
                  }`}
                >
                  {aiSettings.responseMode === "business_hours" && (
                    <div className={styles.radioButtonDot} />
                  )}
                </div>
                <span className={styles.radioText}>Endast utanför öppettider</span>
              </button>
            </div>
          </div>

          <button className={styles.saveButton} onClick={handleSaveSettings}>
            Spara AI-inställningar
          </button>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionHeader}>Tillåtna nummer</h3>
          <h2 className={styles.sectionTitle}>Nummer som AI inte svarar på</h2>

          <div className={styles.numbersList}>
            {allowedNumbers.map((item) => (
              <div key={item.id} className={styles.numberItem}>
                <div className={styles.numberItemContent}>
                  <div className={styles.numberItemLabel}>{item.label}</div>
                  <div className={styles.numberItemValue}>{item.number}</div>
                </div>
                <button
                  className={styles.removeButton}
                  onClick={() => removeAllowedNumber(item.id)}
                >
                  <IoClose size={18} color={colors.error} />
                </button>
              </div>
            ))}
          </div>

          <div className={styles.addButtonsGroup}>
            <button
              className={styles.addButton}
              onClick={() => setShowAddNumberModal(true)}
            >
              <IoAdd size={20} color={colors.primary} />
              <span className={styles.addButtonText}>Lägg till nummer</span>
            </button>

            <button className={styles.addButton} onClick={handleAddAllContacts}>
              <IoAdd size={20} color={colors.primary} />
              <span className={styles.addButtonText}>
                Lägg till alla i mina kontakter
              </span>
            </button>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>App-inställningar</h2>

          <div className={styles.settingsGroup}>
            <div className={styles.switchSetting}>
              <span className={styles.switchLabel}>Mörkt läge</span>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={theme === "dark"}
                  onChange={(e) => {
                    setTheme(e.target.checked ? "dark" : "light");
                    showToast(
                      e.target.checked ? "Mörkt läge aktiverat" : "Ljust läge aktiverat",
                      "info"
                    );
                  }}
                />
                <span className={styles.slider}></span>
              </label>
            </div>

            <div className={styles.switchSetting}>
              <span className={styles.switchLabel}>Notifieringar</span>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => {
                    setNotifications(e.target.checked);
                    showToast(
                      e.target.checked
                        ? "Notifieringar aktiverade"
                        : "Notifieringar inaktiverade",
                      "info"
                    );
                  }}
                />
                <span className={styles.slider}></span>
              </label>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <button className={styles.signOutButton} onClick={handleSignOut}>
            <IoLogOutOutline size={20} color="#ffffff" />
            <span className={styles.signOutText}>Logga ut</span>
          </button>
        </div>

        <div className={styles.bottomSpace} />
      </div>

      {showAddNumberModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowAddNumberModal(false)}
        >
          <div
            className={styles.modalContainer}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Lägg till nummer</h2>
              <button
                className={styles.closeButton}
                onClick={() => setShowAddNumberModal(false)}
              >
                <IoClose size={24} color={colors.text} />
              </button>
            </div>
            <div className={styles.modalContent}>
              <div className={styles.modalForm}>
                <label className={styles.modalLabel}>Etikett</label>
                <input
                  type="text"
                  className={styles.modalInput}
                  placeholder="t.ex. Polisen"
                  value={newNumber.label}
                  onChange={(e) =>
                    setNewNumber({ ...newNumber, label: e.target.value })
                  }
                />
                <label className={styles.modalLabel}>Nummer</label>
                <input
                  type="text"
                  className={styles.modalInput}
                  placeholder="t.ex. 112"
                  value={newNumber.number}
                  onChange={(e) =>
                    setNewNumber({ ...newNumber, number: e.target.value })
                  }
                />
                <div className={styles.modalActions}>
                  <button
                    className={styles.modalCancelButton}
                    onClick={() => {
                      setShowAddNumberModal(false);
                      setNewNumber({ number: "", label: "" });
                    }}
                  >
                    Avbryt
                  </button>
                  <button className={styles.modalSaveButton} onClick={handleAddNumber}>
                    Lägg till
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
