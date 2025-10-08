import { CATEGORY_ICONS } from "@/components/TransactionItem";
import { COLORS } from "@/constants/Colors";
import { styles } from "@/constants/create.style";
import { API_URL } from "@/lib/config";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const create = () => {
  const router = useRouter();
  const { user } = useUser();
  const [isLoading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [isExpense, setIsExpense] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState();

 const handleSave = async () => {
  if (!title.trim())
    return Alert.alert("Error", "Please enter a transaction title");

  if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0)
    return Alert.alert("Error", "Please enter a valid amount");

  if (!selectedCategory)
    return Alert.alert("Error", "Please select a category");

  setLoading(true);

  try {
    const formattedAmount = isExpense
      ? -Math.abs(parseFloat(amount))
      : Math.abs(parseFloat(amount));

    const response = await axios.post(`${API_URL}/`, {
      userId: user?.id,
      title,
      amount: formattedAmount,
      category: selectedCategory,
    });

    console.log("Response:", response.data);
    Alert.alert("Success", "Transaction saved successfully!");
  } catch (error) {
    console.error("Error saving transaction:", error);
    Alert.alert("Error", "Server Error Occurred");
  } finally {
    setLoading(false);
  }
};

  console.log("selectedCategory", selectedCategory);
  console.log("amount", amount);
  console.log("title", title);
  console.log("expense",isExpense);
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons
          name={"arrow-back"}
          onPress={() => router.replace("/(root)/create")}
          size={24}
          color={"black"}
        />

        <Text style={styles.headerTitle}> Create Transaction</Text>

        <TouchableOpacity
          style={[
            styles.saveButtonContainer,
            isLoading && styles.saveButtonDisabled,
          ]}
           onPress={()=>handleSave()}
        >
          <Text style={styles.saveButton}>
            {" "}
            {isLoading ? "Saving..." : "Save"}{" "}
          </Text>
          {!isLoading && (
            <Ionicons name="checkmark" size={18} color={COLORS.primary} 
           
            />
          )}
        </TouchableOpacity>
      </View>

      {/* Card */}
      <View style={styles.card}>
        <View style={styles.typeSelector}>
          <TouchableOpacity
            onPress={() => setIsExpense(true)}
            style={[styles.typeButton, isExpense && styles.typeButtonActive]}
          >
            <Ionicons
              name="arrow-down-circle"
              style={styles.typeIcon}
              size={22}
              color={isExpense ? COLORS.white : COLORS.expense}
            />
            <Text
              style={[
                styles.typeButtonText,
                isExpense && styles.typeButtonTextActive,
              ]}
            >
              Expense
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setIsExpense(false)}
            style={[styles.typeButton, !isExpense && styles.typeButtonActive]}
          >
            <Ionicons
              name="arrow-down-circle"
              size={22}
              style={styles.typeIcon}
              color={!isExpense ? "white" : "green"}
            />
            <Text style={styles.typeButtonText}>Income</Text>
          </TouchableOpacity>
        </View>

        {/* Amount */}
        <View style={styles.amountContainer}>
          <Text style={styles.currencySymbol}>$</Text>
          <TextInput
            style={styles.amountInput}
            placeholder="0.00"
            placeholderTextColor={COLORS.textLight}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
        </View>

        {/* Input title */}
        <View style={styles.inputContainer}>
          <Ionicons
            name="create-outline"
            size={22}
            color={COLORS.textLight}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            onChangeText={setTitle}
            placeholder=""
          />
        </View>

        {/*  */}
        <Text style={styles.sectionTitle}>
          <Ionicons name="pricetag-outline" size={16} color={COLORS.text} />{" "}
          Category
        </Text>
        <View style={styles.categoryGrid}>
          {Object.entries(CATEGORY_ICONS).map((category: any) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category[0] &&
                  styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(category[0])}
            >
              <Ionicons
                name={category[1]}
                size={20}
                color={
                  selectedCategory === category[0]
                    ? COLORS.white
                    : COLORS.text
                }
                style={styles.categoryIcon}
              />
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategory === category[0] &&
                    styles.categoryButtonTextActive,
                ]}
              >
                {category[0]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      )}
    </View>
  );
};

export default create;
