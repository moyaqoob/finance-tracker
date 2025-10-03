import useTransaction from "@/hooks/useTransactions";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
const Home = () => {
  const { user } = useUser();
  const { transactions, summary, isLoading, loadData, deleteTransaction } =
    useTransaction(user?.id)

  useEffect(()=>{
    loadData()
  },[loadData])

  console.log("transaction", transactions)
  console.log("summary", summary)
  console.log("userId",user?.id)
  return (
    <View style={styles.container}>
      <SignedIn>
        <Text style={{ color: "000000" }}>
          Hello {user?.emailAddresses[0].emailAddress}
        </Text>
      </SignedIn>
      <SignedOut>
        <Link href={"/(auth)/Signin"}>
          <Text>Sign In</Text>
        </Link>
      </SignedOut>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});

export default Home;
