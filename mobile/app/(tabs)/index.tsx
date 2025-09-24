import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text className="text-2xl ">Hello we cdf </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,              
    justifyContent: "center", 
    alignItems: "center",     
    backgroundColor: "#f5f5f5"
  },
  text:{
    fontFamily:"bold",

  }
});
