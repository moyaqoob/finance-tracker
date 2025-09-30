import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Link } from 'expo-router'
import { useUser } from '@clerk/clerk-expo'
import { SignOutButton } from '@/components/SignoutButton'
import { Button } from '@react-navigation/elements'
const Home = () => {
  // const {user} = useUser();
  return (
    <View style={styles.container}>
      <Text style={{color:"000000"}}>
        hi there 
      </Text>
      <Text>
        username
        {/* {user?.primaryEmailAddress?.emailAddress} */}
      </Text>
      <Link href={'/(auth)/Signin'}>Go to Sign in</Link>
      <Link href={'/(auth)/Signup'}>Go to Signup</Link>
      <SignOutButton/>
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