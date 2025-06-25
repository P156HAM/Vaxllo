import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Container } from "@/components/ui/Layout";
import { Body, ErrorText, Subtitle, Title } from "@/components/ui/Typography";
import { supabase } from "@/lib/supabase";
import { colors, spacing } from "@/styles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      router.replace("/(tabs)/dashboard");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Ett fel uppstod");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    router.push("/(auth)/register");
  };

  const handleResetPassword = () => {
    router.push("/(auth)/reset-password");
  };

  return (
    <Container>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Ionicons name="call" size={48} color={colors.primary} />
          </View>
          <Title>Välkommen tillbaka</Title>
          <Subtitle color={colors.text + "B3"}>
            Logga in för att fortsätta
          </Subtitle>
        </View>

        <View style={styles.form}>
          <Input
            icon="mail-outline"
            placeholder="E-postadress"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Input
            icon="lock-closed-outline"
            placeholder="Lösenord"
            value={password}
            onChangeText={setPassword}
            isPassword
          />

          {error && <ErrorText>{error}</ErrorText>}

          <Button loading={loading} onPress={handleLogin} disabled={loading}>
            {loading ? "Loggar in..." : "Logga in"}
          </Button>

          <Button variant="link" onPress={handleResetPassword}>
            Glömt lösenord?
          </Button>
        </View>

        <View style={styles.footer}>
          <Body>Har du inget konto? </Body>
          <Button
            variant="link"
            onPress={handleRegister}
            textStyle={styles.footerLink}
          >
            Registrera dig
          </Button>
        </View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: spacing.xxl,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary + "20",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  form: {
    gap: spacing.lg,
    marginBottom: spacing.xxl,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  footerLink: {
    color: colors.primary,
    fontWeight: "600",
  },
});
