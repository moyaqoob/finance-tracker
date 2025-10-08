import SafeScreen from "@/components/SafeScreen";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Slot } from "expo-router";

export const unstable_settings = {
  anchor: "(root)",
};

export default function Layout() {
  return (
    <ClerkProvider
      publishableKey="pk_test_Z2xhZC1nb2JsaW4tMTYuY2xlcmsuYWNjb3VudHMuZGV2JA"
      tokenCache={tokenCache}
    >
      <SafeScreen>
        <Slot />
      </SafeScreen>
    </ClerkProvider>
  );
}
