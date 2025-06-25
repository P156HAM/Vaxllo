import { useStore } from "@/lib/store";
import { supabase } from "@/lib/supabase";
import { colors, spacing, typography } from "@/styles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

export default function Settings() {
  const colorScheme = useColorScheme();
  const { theme, notifications, setTheme, setNotifications } = useStore();

  const [aiSettings, setAiSettings] = useState({
    virtualNumber: "+46 10 750 41 01",
    greetingMessage:
      "Hej, detta är [Företagsnamn]s assistent. Samtalet kommer att registreras och vidarebefordras till företagets ägare. Tack!",
    responseMode: "all", // "all", "unknown", "business_hours"
  });

  const [allowedNumbers] = useState([
    { id: "1", number: "112", label: "Polisen" },
    { id: "2", number: "1177", label: "Sjukvårdsupplysningen" },
  ]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.replace("/");
    }
  };

  const removeAllowedNumber = (id: string) => {
    console.log("Remove number:", id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Inställningar</Text>
        </View>

        {/* AI Assistant Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI-assistent</Text>

          {/* Virtual Number */}
          <View style={styles.settingGroup}>
            <Text style={styles.settingLabel}>Virtuellt nummer</Text>
            <View style={styles.numberDisplay}>
              <Text style={styles.numberText}>{aiSettings.virtualNumber}</Text>
            </View>
          </View>

          {/* AI Greeting Message */}
          <View style={styles.settingGroup}>
            <Text style={styles.settingLabel}>AI hälsningsmeddelande</Text>
            <TextInput
              style={styles.textInput}
              value={aiSettings.greetingMessage}
              onChangeText={(text) =>
                setAiSettings({ ...aiSettings, greetingMessage: text })
              }
              multiline
              placeholder="Skriv ditt meddelande..."
              placeholderTextColor={colors.muted}
            />
            <Text style={styles.helperText}>
              Detta meddelande läses upp för alla som ringer
            </Text>
          </View>

          {/* Response Settings */}
          <View style={styles.settingGroup}>
            <Text style={styles.settingLabel}>När ska AI svara?</Text>

            <View style={styles.radioGroup}>
              <TouchableOpacity
                style={styles.radioOption}
                onPress={() =>
                  setAiSettings({ ...aiSettings, responseMode: "all" })
                }
              >
                <View
                  style={[
                    styles.radioButton,
                    aiSettings.responseMode === "all" &&
                      styles.radioButtonActive,
                  ]}
                >
                  {aiSettings.responseMode === "all" && (
                    <View style={styles.radioButtonDot} />
                  )}
                </View>
                <Text style={styles.radioText}>Alla samtal</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.radioOption}
                onPress={() =>
                  setAiSettings({ ...aiSettings, responseMode: "unknown" })
                }
              >
                <View
                  style={[
                    styles.radioButton,
                    aiSettings.responseMode === "unknown" &&
                      styles.radioButtonActive,
                  ]}
                >
                  {aiSettings.responseMode === "unknown" && (
                    <View style={styles.radioButtonDot} />
                  )}
                </View>
                <Text style={styles.radioText}>Endast okända nummer</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.radioOption}
                onPress={() =>
                  setAiSettings({
                    ...aiSettings,
                    responseMode: "business_hours",
                  })
                }
              >
                <View
                  style={[
                    styles.radioButton,
                    aiSettings.responseMode === "business_hours" &&
                      styles.radioButtonActive,
                  ]}
                >
                  {aiSettings.responseMode === "business_hours" && (
                    <View style={styles.radioButtonDot} />
                  )}
                </View>
                <Text style={styles.radioText}>Endast utanför öppettider</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Allowed Numbers Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Tillåtna nummer</Text>
          <Text style={styles.sectionTitle}>Nummer some AI inte svarar på</Text>

          <View style={styles.numbersList}>
            {allowedNumbers.map((item) => (
              <View key={item.id} style={styles.numberItem}>
                <View style={styles.numberItemContent}>
                  <Text style={styles.numberItemLabel}>{item.label}</Text>
                  <Text style={styles.numberItemValue}>{item.number}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => removeAllowedNumber(item.id)}
                  style={styles.removeButton}
                >
                  <Ionicons name="close" size={18} color={colors.error} />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <View style={styles.addButtonsGroup}>
            <TouchableOpacity style={styles.addButton}>
              <Ionicons name="add" size={20} color={colors.primary} />
              <Text style={styles.addButtonText}>Lägg till nummer</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.addButton}>
              <Ionicons name="add" size={20} color={colors.primary} />
              <Text style={styles.addButtonText}>
                Lägg till alla i mina kontakter
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* App Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App-inställningar</Text>

          <View style={styles.settingsGroup}>
            <View style={styles.switchSetting}>
              <Text style={styles.switchLabel}>Mörkt läge</Text>
              <Switch
                value={theme === "dark"}
                onValueChange={(value) => setTheme(value ? "dark" : "light")}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor="#ffffff"
              />
            </View>

            <View style={styles.switchSetting}>
              <Text style={styles.switchLabel}>Notifieringar</Text>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor="#ffffff"
              />
            </View>
          </View>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.signOutButton}
            onPress={handleSignOut}
          >
            <Ionicons name="log-out-outline" size={20} color="#ffffff" />
            <Text style={styles.signOutText}>Logga ut</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  title: {
    fontSize: typography.sizes.xxl,
    fontWeight: "800",
    color: colors.text,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    fontSize: typography.sizes.lg,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: typography.sizes.md,
    fontWeight: "700",
    color: colors.muted,
    marginBottom: spacing.lg,
  },
  settingGroup: {
    marginBottom: spacing.xl,
  },
  settingLabel: {
    fontSize: typography.sizes.md,
    fontWeight: "600",
    color: colors.text,
    marginBottom: spacing.md,
  },
  numberDisplay: {
    backgroundColor: colors.text,
    borderRadius: 20,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    alignSelf: "flex-start",
  },
  numberText: {
    color: "#ffffff",
    fontSize: typography.sizes.lg,
    fontWeight: "600",
  },
  textInput: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: spacing.lg,
    fontSize: typography.sizes.md,
    color: colors.text,
    textAlignVertical: "top",
    minHeight: 100,
    lineHeight: 22,
    marginBottom: spacing.sm,
  },
  helperText: {
    fontSize: typography.sizes.sm,
    color: colors.muted,
    lineHeight: 18,
  },
  radioGroup: {
    gap: spacing.md,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.sm,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
    marginRight: spacing.md,
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonActive: {
    borderColor: colors.primary,
  },
  radioButtonDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  radioText: {
    fontSize: typography.sizes.md,
    color: colors.text,
    fontWeight: "500",
  },
  numbersList: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },
  numberItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  numberItemContent: {
    flex: 1,
  },
  numberItemLabel: {
    fontSize: typography.sizes.md,
    fontWeight: "600",
    color: colors.text,
    marginBottom: spacing.xs,
  },
  numberItemValue: {
    fontSize: typography.sizes.sm,
    color: colors.muted,
    fontWeight: "500",
  },
  removeButton: {
    padding: spacing.sm,
  },
  addButtonsGroup: {
    marginTop: spacing.lg,
    gap: spacing.md,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 12,
    paddingVertical: spacing.lg,
    borderStyle: "dashed",
  },
  addButtonText: {
    marginLeft: spacing.sm,
    fontSize: typography.sizes.md,
    color: colors.primary,
    fontWeight: "600",
  },
  settingsGroup: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },
  switchSetting: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  switchLabel: {
    fontSize: typography.sizes.md,
    color: colors.text,
    fontWeight: "500",
  },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.error,
    paddingVertical: spacing.lg,
    borderRadius: 12,
  },
  signOutText: {
    marginLeft: spacing.sm,
    fontSize: typography.sizes.md,
    color: "#ffffff",
    fontWeight: "600",
  },
  bottomSpace: {
    height: spacing.xl,
  },
});
