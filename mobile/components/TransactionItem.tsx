import { COLORS } from "@/constants/Colors";
import { styles } from "@/constants/home.styles";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export interface TransactionProps {
  item: {
    id: number;
    title: string;
    amount: string;
    category: string;
  };
  onDelete: (id: number) => void;
}
type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

export const CATEGORY_ICONS: Record<string, IoniconName> = {
  "Food & Drinks": "restaurant-outline",
  Shopping: "cart-outline",
  Transportation: "car-outline",
  Entertainment: "film-outline",
  Bills: "document-text-outline",
  Income: "cash-outline",
  Other: "pricetag-outline",
};

const TransactionItem = ({ item, onDelete }: TransactionProps) => {
  const isIncome = parseFloat(item.amount) > 0;
  const iconName = CATEGORY_ICONS[item.category] || "pricetag-outline";
  return (
    <View style={styles.transactionCard} key={item.id}>
      <TouchableOpacity style={styles.transactionContent}>
        <View style={styles.categoryIconContainer}>
          <Ionicons
            name={iconName}
            size={22}
            color={isIncome ? COLORS.income : COLORS.expense}
          />
        </View>
        <View style={styles.transactionLeft}>
          <Text style={{textTransform:"capitalize"}}>{item.title}</Text>
          <Text style={{textTransform:"lowercase",color:"gray"}}>{item.category} </Text>
        </View>
        <View style={styles.transactionRight}>
          <Text
            style={[
              styles.transactionAmount,
              { color: isIncome ? COLORS.income : COLORS.expense },
            ]}
          >
            {isIncome ? `+${item.amount}` : item.amount}
          </Text>
        </View>
        <View style={styles.statDivider} />
        <TouchableOpacity
          onPress={() => onDelete(item.id)}
          style={styles.deleteButton}
        >
          <Ionicons name="trash" size={16} color="red" />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

export default TransactionItem;
