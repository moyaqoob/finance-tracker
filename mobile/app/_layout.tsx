import SafeScreen from "@/components/SafeScreen";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Slot } from "expo-router";
export const unstable_settings = {
  anchor: "(root)",
};

function Layout() {
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey="pk_test_Z2xhZC1nb2JsaW4tMTYuY2xlcmsuYWNjb3VudHMuZGV2JA">
      <SafeScreen>
        <Slot />
      </SafeScreen>
    </ClerkProvider>
  );
}
export default Layout;
