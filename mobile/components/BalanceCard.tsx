import { COLORS } from "@/constants/Colors";
import { styles } from "@/constants/home.styles";
import React from "react";
import { Text, View } from "react-native";
interface BalanceProps {
  summary: {
    balance: number | string;
    income: number | string;
    expense: number | string;
  };
}

const BalanceCard = ({ summary }: BalanceProps) => {
  // Ensure numbers
  const balance = Number(summary.balance) || 0;
  const income = Number(summary.income) || 0;
  const expenses = Math.abs(Number(summary.expense) || 0);
  console.log("balance card",balance,income,expenses,summary.expense,summary.income)
  console.log("balance summary",summary,expenses)

  return (
    <View style={styles.balanceCard}>
      <Text style={styles.balanceTitle}>Total Balance</Text>
      <Text style={styles.balanceAmount}>${balance.toFixed(2)}</Text>

      <View style={styles.balanceStats}>
        <View style={styles.balanceStatItem}>
          <Text style={styles.balanceStatLabel}>Income</Text>
          <Text style={[styles.balanceStatAmount, { color: COLORS.income }]}>
            +${income.toFixed(2)}
          </Text>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.balanceStatItem}>
          <Text style={styles.balanceStatLabel}>Expenses</Text>
          <Text style={[styles.balanceStatAmount, { color: COLORS.expense }]}>
            -${expenses.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default BalanceCard;
