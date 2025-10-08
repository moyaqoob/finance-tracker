import { COLORS } from "@/constants/Colors";
import { styles } from "@/constants/home.styles";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
const NoTransactionListContent = () => {
  const router = useRouter();
  return (
    <View style={styles.emptyState}>
      <Ionicons
        name="receipt-outline"
        size={60}
        color={COLORS.textLight}
        style={styles.emptyStateIcon}
      />
      <Text style={styles.emptyStateText}>No transactions yet</Text>

      <Text style={styles.emptyStateText}>Start tracking your finances by adding your first transaction</Text>
    
      <TouchableOpacity
        onPress={() => router.replace("/(root)/create")}
        style={styles.emptyStateButton}
      >
        <Ionicons name="add-circle" style={{alignItems:"center"}} color={"white"} size={18}/>

        <Text style={styles.emptyStateButtonText}>Add Transaction</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NoTransactionListContent;
