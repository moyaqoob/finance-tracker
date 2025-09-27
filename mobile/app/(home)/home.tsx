import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Link } from 'expo-router'
const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={{color:"000000"}}>
        hi there 
      </Text>
      <Link href={'/(auth)/Signup'}>Go to Sign</Link>
      <Link href={'/(auth)/Signup'}>Go to Signup</Link>
    </View>
  )
}
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


export default Home