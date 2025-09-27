import { View, Text } from 'react-native'
import React, { type ReactNode } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { COLORS } from '@/constants/Colors';

type Props = {
    children:ReactNode
}

const SafeScreen = ({children}:Props) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{paddingTop:insets.top,flex:1,backgroundColor:COLORS.background}}>
      {children}
    </View>
  )
}

export default SafeScreen