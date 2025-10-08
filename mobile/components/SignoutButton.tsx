import { COLORS } from "@/constants/Colors";
import { styles } from "@/constants/home.styles";
import { useClerk } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Alert, TouchableOpacity } from "react-native";
export const SignOutButton = () => {
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    if (typeof window != "undefined") {
      const confirmed = window.confirm("Are you sure you want to Logout?");
      if(confirmed) signOut();

      router.replace("/Signin")
    } else {
      Alert.alert("Logout", "Are you sure you want to logout?", [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", style: "destructive", onPress: () => signOut() },
      ]);
    }
  };

  return (
    <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
      <Ionicons name="log-out-outline" size={22} color={COLORS.primary} />
    </TouchableOpacity>
  );
};
