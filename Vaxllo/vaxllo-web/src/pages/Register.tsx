import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useStore } from "../lib/store";
import { colors } from "../styles";
import {
  IoPersonAdd,
  IoMailOutline,
  IoLockClosedOutline,
} from "react-icons/io5";
import { Container } from "../components/ui/Layout";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import styles from "./Register.module.css";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Lösenorden matchar inte");
      return;
    }

    if (password.length < 6) {
      setError("Lösenordet måste vara minst 6 tecken");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const success = await register(email, password);
      if (success) {
        navigate("/dashboard");
      } else {
        setError("Ett fel uppstod");
      }
    } catch (err: any) {
      setError(err?.message || "Ett fel uppstod");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.logoContainer}>
            <IoPersonAdd size={48} color={colors.primary} />
          </div>
          <h1 className={styles.title}>Skapa konto</h1>
          <p className={styles.subtitle}>Registrera dig för att komma igång</p>
        </div>

        <div className={styles.form}>
          <Input
            icon={<IoMailOutline size={20} color={colors.text} />}
            placeholder="E-postadress"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />

          <Input
            icon={<IoLockClosedOutline size={20} color={colors.text} />}
            placeholder="Lösenord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isPassword
          />

          <Input
            icon={<IoLockClosedOutline size={20} color={colors.text} />}
            placeholder="Bekräfta lösenord"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            isPassword
          />

          {error && <p style={{ color: colors.error, fontSize: "14px" }}>{error}</p>}

          <Button
            loading={loading}
            onClick={handleRegister}
            disabled={loading}
            size="large"
          >
            {loading ? "Skapar konto..." : "Registrera"}
          </Button>
        </div>

        <div className={styles.footer}>
          <span style={{ color: colors.text, opacity: 0.7 }}>Har du redan ett konto? </span>
          <Link to="/login" style={{ color: colors.primary, fontWeight: 600 }}>
            Logga in
          </Link>
        </div>
      </div>
    </Container>
  );
}

