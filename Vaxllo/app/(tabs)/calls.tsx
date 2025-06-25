import CallCard from "@/components/CallCard";
import Loading from "@/components/Loading";
import { supabase } from "@/lib/supabase";
import { colors, spacing, typography } from "@/styles";
import { Call, Message } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const dummyCalls: Call[] = [
  {
    id: "1",
    phone_number: "+46701234567",
    caller_name: "Johan Andersson",
    duration: 120,
    transcript:
      "Hej, jag ringer angående den nya produktlanseringen. Vi behöver diskutera marknadsföringsstrategin för Q2.",
    conversation: [
      {
        role: "caller",
        content: "Hej, det är Johan från marknadsavdelningen.",
        timestamp: new Date(2024, 2, 15, 10, 0).toISOString(),
      },
      {
        role: "ai",
        content: "Hej Johan! Hur kan jag hjälpa dig idag?",
        timestamp: new Date(2024, 2, 15, 10, 0, 2).toISOString(),
      },
      {
        role: "caller",
        content: "Jag ringer angående den nya produktlanseringen.",
        timestamp: new Date(2024, 2, 15, 10, 0, 5).toISOString(),
      },
    ],
    priority: "high",
    call_type: "viktigt",
    is_blocked: false,
    created_at: new Date(2024, 2, 15).toISOString(),
  },
  {
    id: "2",
    phone_number: "+46739876543",
    duration: 45,
    transcript:
      "Hej, jag är intresserad av era tjänster. Kan du berätta mer om era prisplaner?",
    conversation: [
      {
        role: "caller",
        content: "Hej, jag är intresserad av era tjänster.",
        timestamp: new Date(2024, 2, 16, 14, 30).toISOString(),
      },
      {
        role: "ai",
        content:
          "Välkommen! Jag hjälper dig gärna med information om våra tjänster.",
        timestamp: new Date(2024, 2, 16, 14, 30, 3).toISOString(),
      },
    ],
    priority: "medium",
    call_type: "leads",
    is_blocked: false,
    created_at: new Date(2024, 2, 16).toISOString(),
  },
  {
    id: "3",
    phone_number: "+46762345678",
    caller_name: "Elvo",
    duration: 60,
    transcript:
      "Hej, det är Johan från Elvo. Vi vill höra om du är intresserad av våra tjänster.",
    conversation: [
      {
        role: "caller",
        content:
          "Hej, det är Johan från Elvo. Vi vill höra om du är intresserad av våra tjänster.",
        timestamp: new Date(2024, 2, 17, 15, 0).toISOString(),
      },
      {
        role: "ai",
        content: "Hej Johan! Hur kan jag hjälpa dig idag?",
        timestamp: new Date(2024, 2, 17, 15, 0, 2).toISOString(),
      },
    ],
    priority: "low",
    call_type: "säljare",
    is_blocked: false,
    created_at: new Date(2024, 2, 17).toISOString(),
  },
  {
    id: "4",
    phone_number: "+46755666777",
    duration: 15,
    transcript: "Grattis! Du har vunnit en gratis semesterresa...",
    conversation: [
      {
        role: "caller",
        content: "Grattis! Du har vunnit en gratis semesterresa!",
        timestamp: new Date(2024, 2, 18, 9, 15).toISOString(),
      },
      {
        role: "ai",
        content:
          "Detta verkar vara ett oönskat samtal. Jag markerar det som skräppost.",
        timestamp: new Date(2024, 2, 18, 9, 15, 2).toISOString(),
      },
    ],
    priority: "low",
    call_type: "spam",
    is_blocked: true,
    created_at: new Date(2024, 2, 18).toISOString(),
  },
  {
    id: "5",
    phone_number: "+46799888777",
    caller_name: "Supportteam",
    duration: 180,
    transcript:
      "Kritisk systemuppdatering krävs. Vänligen granska och godkänn ändringarna innan dagens slut.",
    conversation: [
      {
        role: "caller",
        content:
          "Hej, det gäller en kritisk systemuppdatering som behöver granskas.",
        timestamp: new Date(2024, 2, 19, 14, 0).toISOString(),
      },
      {
        role: "ai",
        content:
          "Jag förstår. Jag ska vidarebefordra detta till systemadministratören omedelbart.",
        timestamp: new Date(2024, 2, 19, 14, 0, 3).toISOString(),
      },
      {
        role: "caller",
        content: "Tack, det är viktigt att detta görs innan dagens slut.",
        timestamp: new Date(2024, 2, 19, 14, 0, 6).toISOString(),
      },
    ],
    priority: "high",
    call_type: "viktigt",
    is_blocked: false,
    created_at: new Date(2024, 2, 19).toISOString(),
  },
];

export default function Calls() {
  const [loading, setLoading] = useState(true);
  const [calls, setCalls] = useState<Call[]>([]);
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);
  const [showConversation, setShowConversation] = useState(false);

  useEffect(() => {
    fetchCalls();
  }, []);

  const fetchCalls = async () => {
    try {
      const { data, error } = await supabase
        .from("calls")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCalls(data?.length ? data : dummyCalls);
    } catch (error) {
      console.error("Error fetching calls:", error);
      setCalls(dummyCalls);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCall = async (updatedCall: Call) => {
    try {
      const { error } = await supabase
        .from("calls")
        .update({
          is_blocked: updatedCall.is_blocked,
          priority: updatedCall.priority,
        })
        .eq("id", updatedCall.id);

      if (error) throw error;

      setCalls(calls.map((c) => (c.id === updatedCall.id ? updatedCall : c)));
    } catch (error) {
      Alert.alert("Fel", "Kunde inte uppdatera samtalet");
    }
  };

  const handleDeleteCall = async (id: string) => {
    try {
      const { error } = await supabase.from("calls").delete().eq("id", id);

      if (error) throw error;

      setCalls(calls.filter((c) => c.id !== id));
    } catch (error) {
      Alert.alert("Fel", "Kunde inte ta bort samtalet");
    }
  };

  const renderConversation = (messages: Message[]) => (
    <View style={styles.conversation}>
      {messages.map((message, index) => (
        <View
          key={index}
          style={[
            styles.message,
            message.role === "ai" ? styles.aiMessage : styles.callerMessage,
          ]}
        >
          <Text
            style={[
              styles.messageText,
              message.role === "ai" && styles.aiMessageText,
            ]}
          >
            {message.content}
          </Text>
          <Text
            style={[
              styles.messageTime,
              message.role === "ai" && styles.aiMessageTime,
            ]}
          >
            {new Date(message.timestamp).toLocaleTimeString("sv-SE")}
          </Text>
        </View>
      ))}
    </View>
  );

  const renderCall = ({ item: call }: { item: Call }) => (
    <CallCard
      call={call}
      onPress={() => {
        setSelectedCall(call);
        setShowConversation(true);
      }}
      onUpdate={handleUpdateCall}
      onDelete={handleDeleteCall}
    />
  );

  if (loading) return <Loading />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Senaste Samtal</Text>
        <View style={styles.headerInfo}>
          <Text style={styles.callCount}>{calls.length} samtal</Text>
        </View>
      </View>

      <FlatList
        data={calls}
        keyExtractor={(item) => item.id}
        renderItem={renderCall}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        visible={showConversation}
        animationType="slide"
        onRequestClose={() => setShowConversation(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <View>
              <Text style={styles.modalTitle}>
                {selectedCall?.caller_name || selectedCall?.phone_number}
              </Text>
              <Text style={styles.modalSubtitle}>
                {selectedCall &&
                  new Date(selectedCall.created_at).toLocaleDateString("sv-SE")}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setShowConversation(false)}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalContent}>
            {selectedCall && renderConversation(selectedCall.conversation)}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: {
    fontSize: typography.sizes.xxl,
    fontWeight: "800",
    color: colors.text,
  },
  headerInfo: {
    alignItems: "flex-end",
  },
  callCount: {
    fontSize: typography.sizes.sm,
    color: colors.muted,
    fontWeight: "500",
  },
  list: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: "700",
    color: colors.text,
  },
  modalSubtitle: {
    fontSize: typography.sizes.sm,
    color: colors.muted,
    marginTop: spacing.xs,
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.border + "40",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    flex: 1,
    padding: spacing.lg,
  },
  conversation: {
    gap: spacing.md,
  },
  message: {
    padding: spacing.md,
    borderRadius: 16,
    maxWidth: "85%",
  },
  aiMessage: {
    backgroundColor: colors.primary,
    alignSelf: "flex-start",
    borderBottomLeftRadius: 4,
  },
  callerMessage: {
    backgroundColor: colors.border + "80",
    alignSelf: "flex-end",
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: typography.sizes.md,
    color: colors.text,
    marginBottom: spacing.xs,
    lineHeight: 20,
  },
  aiMessageText: {
    color: colors.background,
  },
  messageTime: {
    fontSize: typography.sizes.sm,
    color: colors.muted,
    alignSelf: "flex-end",
  },
  aiMessageTime: {
    color: "#ffffff",
    opacity: 0.8,
  },
});
