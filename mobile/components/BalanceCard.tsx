import { COLORS } from "@/constants/Colors";
import { styles } from "@/constants/home.styles";
import React from "react";
import { Text, View } from "react-native";

interface BalanceProps {
  summary: {
    balance: Number;
    income: Number;
    expenses: Number;
  };
}

const BalanceCard = ({ summary }: BalanceProps) => {
  return (
    <View style={styles.balanceCard}>
      <Text style={styles.balanceTitle}>Total Balance</Text>
      <Text style={styles.balanceAmount}>${summary.balance.toFixed(2)}</Text>
      <View style={styles.balanceStats}>
        <View style={styles.balanceStatItem}>
          <Text style={styles.balanceStatLabel}>Income</Text>
          <Text style={[styles.balanceStatAmount, { color: COLORS.income }]}>
            +${summary.income.toFixed(2)}
          </Text>
        </View>
        <View style={styles.statDivider }/>
        <View style={[styles.balanceStatItem]}>
          <Text style={styles.balanceStatLabel}>Expenses</Text>
          <Text style={[styles.balanceStatAmount, {
            color:COLORS.expense
          }]}>-${(summary.expenses).toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
};

export default BalanceCard;
