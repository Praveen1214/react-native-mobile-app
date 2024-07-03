import { Slot, SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();


const RootLayout = () => {
  const [fontsLoaded] = useFonts({
    "Poppin-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppin-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppin-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppin-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppin-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppin-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppin-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppin-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppin-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });
  
  const error = null;
  
  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;
