import { View, Text } from 'react-native'
import React from 'react'
import { useAuth } from '@clerk/clerk-expo'
import { Redirect,Stack } from 'expo-router';
const AuthLayout = () => {
    const {isSignedIn} = useAuth();

    if(isSignedIn){
        return <Redirect href="/home"/>
    }
  return <Stack/>
}

export default AuthLayout;