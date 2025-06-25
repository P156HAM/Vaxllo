import { colors, spacing, typography } from "@/styles";
import { Call, CallPriority, CallType } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  Animated,
  Easing,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface CallCardProps {
  call: Call;
  onPress: () => void;
  onUpdate: (updatedCall: Call) => void;
  onDelete: (id: string) => void;
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
}: CallCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [animatedValue] = useState(new Animated.Value(0));

  const handleCallBack = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleTextBack = (phoneNumber: string) => {
    Linking.openURL(`sms:${phoneNumber}`);
  };

  const handleBlock = () => {
    const updatedCall = { ...call, is_blocked: !call.is_blocked };
    onUpdate(updatedCall);
  };

  const handleSetPriority = (priority: CallPriority) => {
    const updatedCall = { ...call, priority };
    onUpdate(updatedCall);
  };

  const handleDelete = () => {
    Alert.alert(
      "Ta bort samtal",
      "Är du säker på att du vill ta bort detta samtal?",
      [
        { text: "Avbryt", style: "cancel" },
        {
          text: "Ta bort",
          style: "destructive",
          onPress: () => onDelete(call.id),
        },
      ]
    );
  };

  const toggleExpanded = () => {
    const toValue = isExpanded ? 0 : 1;

    Animated.timing(animatedValue, {
      toValue,
      duration: 200,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();

    setIsExpanded(!isExpanded);
  };

  const expandedHeight = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 140],
  });

  const rotateValue = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

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

    // Don't show badge for normal calls
    if (callType === "normal") return null;

    return (
      <View
        style={[
          styles.callTypeBadge,
          { backgroundColor: badgeColors[callType] },
        ]}
      >
        <Text style={styles.callTypeBadgeText}>{callTypeLabels[callType]}</Text>
      </View>
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
    <View style={[styles.card, call.is_blocked && styles.blockedCard]}>
      {/* Card Content */}
      <TouchableOpacity
        onPress={toggleExpanded}
        activeOpacity={0.9}
        style={styles.cardContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.callerName} numberOfLines={1}>
              {call.caller_name || call.phone_number}
            </Text>
            <View style={styles.metadata}>
              <Text style={styles.time}>{formatTime(call.created_at)}</Text>
              <View style={styles.separator} />
              <Text style={styles.duration}>
                {formatDuration(call.duration)}
              </Text>
              {call.is_blocked && (
                <View style={styles.blockedIndicator}>
                  <View style={styles.separator} />
                  <Text style={styles.blockedText}>Blockerad</Text>
                </View>
              )}
            </View>
          </View>
          <View style={styles.headerRight}>
            {renderCallTypeBadge(call.call_type)}
            <Animated.View
              style={[styles.chevron, { transform: [{ rotate: rotateValue }] }]}
            >
              <Ionicons name="chevron-down" size={16} color={colors.muted} />
            </Animated.View>
          </View>
        </View>

        {/* Preview transcript when collapsed */}
        {!isExpanded && (
          <Text style={styles.previewText} numberOfLines={2}>
            {call.transcript}
          </Text>
        )}
      </TouchableOpacity>

      {/* Expanded Content */}
      <Animated.View
        style={[styles.expandedContent, { height: expandedHeight }]}
      >
        <View style={styles.expandedInner}>
          {/* Full transcript */}
          <Text style={styles.fullTranscript}>{call.transcript}</Text>

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.actionButton, styles.callButton]}
              onPress={(e) => {
                e.stopPropagation();
                handleCallBack(call.phone_number);
              }}
            >
              <Ionicons name="call" size={18} color="#ffffff" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={(e) => {
                e.stopPropagation();
                onPress();
              }}
            >
              <Ionicons
                name="chatbubbles-outline"
                size={18}
                color={colors.muted}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={(e) => {
                e.stopPropagation();
                handleBlock();
              }}
            >
              <Ionicons
                name={call.is_blocked ? "checkmark-circle" : "ban"}
                size={18}
                color={call.is_blocked ? colors.success : colors.warning}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
            >
              <Ionicons name="trash-outline" size={18} color={colors.error} />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginBottom: spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: colors.border,
  },
  blockedCard: {
    backgroundColor: colors.error + "08",
    borderColor: colors.error + "20",
  },
  cardContent: {
    padding: spacing.lg,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: spacing.sm,
  },
  headerLeft: {
    flex: 1,
    marginRight: spacing.md,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  callerName: {
    fontSize: typography.sizes.lg,
    fontWeight: "600",
    color: colors.text,
    marginBottom: spacing.xs,
  },
  metadata: {
    flexDirection: "row",
    alignItems: "center",
  },
  time: {
    fontSize: typography.sizes.sm,
    color: colors.muted,
    fontWeight: "500",
  },
  separator: {
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: colors.muted,
    marginHorizontal: spacing.sm,
  },
  duration: {
    fontSize: typography.sizes.sm,
    color: colors.muted,
    fontWeight: "500",
  },
  blockedIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  blockedText: {
    fontSize: typography.sizes.sm,
    color: colors.error,
    fontWeight: "500",
  },
  callTypeBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 4,
  },
  callTypeBadgeText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  chevron: {
    marginLeft: spacing.xs,
  },
  previewText: {
    fontSize: typography.sizes.sm,
    color: colors.text,
    opacity: 0.7,
    lineHeight: 18,
    marginTop: spacing.xs,
  },
  expandedContent: {
    overflow: "hidden",
    height: 140,
  },
  expandedInner: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    height: "100%",
    justifyContent: "space-between",
  },
  fullTranscript: {
    fontSize: typography.sizes.sm,
    color: colors.text,
    opacity: 0.8,
    lineHeight: 20,
    flex: 1,
    maxHeight: 60,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    height: 60,
    alignItems: "center",
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  callButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
});
