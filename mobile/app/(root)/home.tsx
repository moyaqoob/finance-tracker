import images from "@/assets/image";
import BalanceCard from "@/components/BalanceCard";
import PageLoader from "@/components/PageLoader";
import { SignOutButton } from "@/components/SignoutButton";
import TransactionItem from "@/components/TransactionItem";
import { styles } from "@/constants/home.styles";
import useTransaction from "@/hooks/useTransactions";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { Alert, FlatList, Image, Text, TouchableOpacity, View, type ListRenderItem } from "react-native";
import { TransactionProps } from "@/components/TransactionItem";

const Home = () => {
  const { user } = useUser();
  const { transactions, summary, isLoading, loadData, deleteTransaction } =
    useTransaction(user?.id);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleDelete=(id:string)=>{
     Alert.alert("Delete Transaction","Are you sure you want to delete this transaction",[
      {text:"Cancel",style:"cancel"},
      {text:"Delete",style:"destructive",onPress:()=> deleteTransaction(id)}
     ])
  }


  

  if (isLoading) return <PageLoader />;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={images.logo}
              style={styles.headerLogo}
              resizeMode="contain"
            />
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome,</Text>
              <Text style={styles.usernameText}>
                {user?.emailAddresses[0].emailAddress.split("@")[0].replace(/[0-9]/g,"")}
              </Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => router.push("/create")}
            >
              <Ionicons name="add" size={20} color={"#FFF"} />
              <Text style={styles.addButtonText}> Add</Text>
            </TouchableOpacity>
            <SignOutButton />
          </View>
        </View>

        <BalanceCard summary={summary}/>
        <View style={styles.transactionsHeaderContainer}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
        </View>

      </View>
      <FlatList
        style={styles.transactionsList}
        contentContainerStyle={styles.transactionsListContent}
        data={transactions}
        renderItem={({item}) => (
          <TransactionItem item={item} onDelete={handleDelete} />
        )}
      />
    </View>
  );
};

export default Home;
