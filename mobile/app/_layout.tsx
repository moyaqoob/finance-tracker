import SafeScreen from "@/components/SafeScreen";
import { ClerkProvider } from "@clerk/clerk-expo";
import { Slot } from "expo-router";
import "react-native-reanimated";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
export const unstable_settings = {
  anchor: "(home)",
};

function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <SafeScreen>
        <Slot />
      </SafeScreen>
    </ClerkProvider>
  );
}
export default RootLayout;
