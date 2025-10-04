import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Login } from "../screens/Auth/Login";
import { TabRoutes } from "./tab.routes";
import { SignUp } from "../screens/Auth/SignUp";
import { ServicesOrders } from "../screens/Clients/ServicesOrders";
import { ClientAssets } from "../screens/Clients/ClientAssets";
import { useTheme } from "../contexts/theme/ThemeContext";

const Stack = createNativeStackNavigator();

export function StackRoutes() {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.background },
        headerTitleStyle: { color: theme.text, fontSize: 24 },
        headerTintColor: theme.text,
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={TabRoutes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ServicesOrders"
        component={ServicesOrders}
        options={{ headerTitle: "Serviços" }}
      />

      <Stack.Screen
        name="ClientAssets"
        component={ClientAssets}
        options={{ headerTitle: "Ativos" }}
      />
    </Stack.Navigator>
  );
}
