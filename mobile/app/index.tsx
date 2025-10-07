import { useAuth } from "@clerk/clerk-expo";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { Redirect } from "expo-router";
import { View, Text } from "react-native";

export default function Index() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;
    if (isSignedIn) router.replace("/home"); // already logged in
  }, [isLoaded, isSignedIn]);

  return (
    <Redirect href={"/(root)/home"}/>
  );
}
