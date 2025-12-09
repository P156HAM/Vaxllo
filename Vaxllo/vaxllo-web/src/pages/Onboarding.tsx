import { useNavigate } from "react-router-dom";
import { colors } from "../styles";
import {
  IoCall,
  IoMic,
  IoFlag,
  IoShieldCheckmark,
  IoCheckmarkCircle,
  IoArrowForward,
} from "react-icons/io5";
import { Container } from "../components/ui/Layout";
import Button from "../components/ui/Button";
import styles from "./Onboarding.module.css";

export default function Onboarding() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <Container>
      <div className={styles.container}>
        {/* Left side - Image/Illustration */}
        <div className={styles.leftSection}>
          <div className={styles.imagePlaceholder}>
            <div className={styles.imageContent}>
              <IoCall size={120} color={colors.primary} />
              <div className={styles.floatingIcon} style={{ top: "20%", left: "10%" }}>
                <IoMic size={40} color={colors.primary} />
              </div>
              <div className={styles.floatingIcon} style={{ top: "60%", right: "15%" }}>
                <IoFlag size={40} color={colors.secondary} />
              </div>
              <div className={styles.floatingIcon} style={{ bottom: "20%", left: "20%" }}>
                <IoShieldCheckmark size={40} color={colors.success} />
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Information */}
        <div className={styles.rightSection}>
          <div className={styles.content}>
            <div className={styles.header}>
              <h1 className={styles.brandName}>Vaxllo</h1>
              <p className={styles.tagline}>AI-driven samtalshantering</p>
            </div>

            <div className={styles.description}>
              <h2 className={styles.title}>Hantera alla dina samtal med AI</h2>
              <p className={styles.subtitle}>
                Vaxllo är en intelligent lösning för att hantera inkommande samtal.
                Vår AI-assistent svarar automatiskt, transkriberar samtal och kategoriserar
                dem efter prioritet. Få full kontroll över dina samtal och missa aldrig
                viktiga meddelanden igen.
              </p>
            </div>

            <div className={styles.features}>
              <div className={styles.feature}>
                <IoCheckmarkCircle size={24} color={colors.success} />
                <div>
                  <h3 className={styles.featureTitle}>Automatisk AI-svar</h3>
                  <p className={styles.featureDescription}>
                    Vår AI svarar på alla inkommande samtal och hanterar dem professionellt
                  </p>
                </div>
              </div>
              <div className={styles.feature}>
                <IoCheckmarkCircle size={24} color={colors.success} />
                <div>
                  <h3 className={styles.featureTitle}>Intelligent kategorisering</h3>
                  <p className={styles.featureDescription}>
                    Samtal sorteras automatiskt efter typ: viktigt, leads, spam, support
                  </p>
                </div>
              </div>
              <div className={styles.feature}>
                <IoCheckmarkCircle size={24} color={colors.success} />
                <div>
                  <h3 className={styles.featureTitle}>Fullständig transkription</h3>
                  <p className={styles.featureDescription}>
                    Se hela konversationen med både AI och uppringaren i realtid
                  </p>
                </div>
              </div>
              <div className={styles.feature}>
                <IoCheckmarkCircle size={24} color={colors.success} />
                <div>
                  <h3 className={styles.featureTitle}>Prioritering och hantering</h3>
                  <p className={styles.featureDescription}>
                    Markera viktiga samtal, blockera spam och hantera alla samtal från en plats
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.ctaSection}>
              <div className={styles.loginNote}>
                <IoCheckmarkCircle size={20} color={colors.success} />
                <p>
                  <strong>Inget konto behövs!</strong> Klicka på "Logga in" för att komma igång
                  direkt med demo-läget.
                </p>
              </div>
              <Button onClick={handleGetStarted} size="large" className={styles.ctaButton}>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  Kom igång
                  <IoArrowForward size={20} />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
