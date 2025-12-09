import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useStore } from "../lib/store";
import { colors } from "../styles";
import { IoCall, IoMailOutline, IoLockClosedOutline } from "react-icons/io5";
import { Container } from "../components/ui/Layout";
import { Title, Subtitle, ErrorText, Body } from "../components/ui/Typography";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import styles from "./Login.module.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);

    try {
      const success = await login(email, password);
      if (success) {
        navigate("/dashboard");
      } else {
        setError("Ett fel uppstod");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ett fel uppstod");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.logoContainer}>
            <IoCall size={48} color={colors.primary} />
          </div>
          <Title>Välkommen tillbaka</Title>
          <Subtitle color={colors.text + "B3"}>Logga in för att fortsätta</Subtitle>
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

          {error && <ErrorText>{error}</ErrorText>}

          <Button loading={loading} onClick={handleLogin} disabled={loading}>
            {loading ? "Loggar in..." : "Logga in"}
          </Button>

          <Button variant="link" onClick={() => navigate("/register")}>
            Glömt lösenord?
          </Button>
        </div>

        <div className={styles.footer}>
          <Body>Har du inget konto? </Body>
          <Link to="/register" style={{ color: colors.primary, fontWeight: 600 }}>
            Registrera dig
          </Link>
        </div>
      </div>
    </Container>
  );
}

