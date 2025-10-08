import { useUser } from "@clerk/clerk-expo";
import { Redirect, Stack, useSegments } from "expo-router";

export default function Layout() {
  const { isSignedIn, isLoaded } = useUser();
  const segments = useSegments(); 
  if (!isLoaded) return null; 

  const currentSegment = segments[1]; 

  if (!isSignedIn && currentSegment !== "Signin" && currentSegment !== "Signup") {
    return <Redirect href="/Signin" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
