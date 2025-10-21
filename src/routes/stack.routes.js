import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Login } from "../screens/Auth/Login";
import { TabRoutes } from "./tab.routes";
import { SignUp } from "../screens/Auth/SignUp";
import { ServicesOrders } from "../screens/Clients/ServicesOrders";
import { ClientAssets } from "../screens/Clients/ClientAssets";
import { NewServiceOrder } from "../screens/Clients/ServicesOrders/NewServiceOrder";
import { NewAsset } from "../screens/Clients/ClientAssets/NewAsset";
import { NewClient } from "../screens/Clients/NewClient"; 

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

      <Stack.Screen
        name="NewServiceOrder"
        component={NewServiceOrder}
        options={{ headerTitle: "Criar Novo Serviço" }}
      />

      <Stack.Screen
        name="NewAsset"
        component={NewAsset}
        options={{ headerTitle: "Criar Novo Ativo" }}
      />

      <Stack.Screen
        name="NewClient"
        component={NewClient}
        options={{ headerTitle: "Criar Novo Cliente" }}
      />
    </Stack.Navigator>
  );
}
