import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '@/constants/create.style'
import { Ionicons } from '@expo/vector-icons'
const CreateTransaction = () => {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity>
                {/* <Ionicons name=''/> */}
            </TouchableOpacity>
        </View>
      

    </View>
  )
}

export default CreateTransaction