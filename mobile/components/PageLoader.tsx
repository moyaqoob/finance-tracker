import { COLORS } from "@/constants/Colors";
import { Colors } from "@/constants/theme";
import React from "react"
import {View, ActivityIndicator }  from "react-native"
const PageLoader=()=>{
    return(
        <View>
            <ActivityIndicator size={"large"} color={COLORS.primary}  />
        </View>
    )
}

export default PageLoader;