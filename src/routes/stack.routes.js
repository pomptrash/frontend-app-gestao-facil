// src/routes/stack.routes.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// 🧭 Telas
import { Login } from "../screens/Auth/Login";
import { SignUp } from "../screens/Auth/SignUp";
import { TabRoutes } from "./tab.routes";
import { ServicesOrders } from "../screens/Clients/ServicesOrders";
import { ClientAssets } from "../screens/Clients/ClientAssets";
import { NewServiceOrder } from "../screens/Clients/ServicesOrders/NewServiceOrder";
import { NewAsset } from "../screens/Clients/ClientAssets/NewAsset";
import { NewClient } from "../screens/Clients/NewClient";
import { More } from "../screens/More";
import { Locations } from "../screens/Locations";
import { ServiceTypes } from "../screens/ServiceTypes";
import { Users } from "../screens/Users";
import { Options } from "../screens/Options";
import { NewLocation } from "../screens/Locations/NewLocation";

// 🎨 Contextos globais
import { useTheme } from "../contexts/theme/ThemeContext";
import { useAuthContext } from "../contexts/auth/AuthContext";

// ⏳ Componente auxiliar
import { Loading } from "../components/Loading";

const Stack = createNativeStackNavigator();

export function StackRoutes() {
  const { theme } = useTheme();
  const { isAuthenticated, loading } = useAuthContext();

  if (loading) {
    return <Loading key="loading" />;
  }

  console.log("🧭 StackRoutes render ->", { isAuthenticated, loading });

  return (
    <Stack.Navigator
      key={isAuthenticated ? "private-stack" : "public-stack"}
      initialRouteName={isAuthenticated ? "AppTabs" : "Login"}
      screenOptions={{
        headerStyle: { backgroundColor: theme.background },
        headerTitleStyle: { color: theme.text, fontSize: 22, fontWeight: "600" },
        headerTintColor: theme.text,
      }}
    >
      {isAuthenticated ? (
        <>
          <Stack.Screen
            name="AppTabs"
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
            options={{ headerTitle: "Novo Serviço" }}
          />
          <Stack.Screen
            name="NewAsset"
            component={NewAsset}
            options={{ headerTitle: "Novo Ativo" }}
          />
          <Stack.Screen
            name="NewClient"
            component={NewClient}
            options={{ headerTitle: "Novo Cliente" }}
          />
          <Stack.Screen
            name="NewLocation"
            component={NewLocation}
            options={{ headerTitle: "Novo Local" }}
          />
          <Stack.Screen name="Locations" component={Locations} options={{ headerTitle: "Locais" }} />
          <Stack.Screen name="ServiceTypes" component={ServiceTypes} options={{ headerTitle: "Tipos de Serviço" }} />
          <Stack.Screen name="Users" component={Users} options={{ headerTitle: "Usuários" }} />
          <Stack.Screen name="Options" component={Options} options={{ headerTitle: "Opções" }} />

          
        </>
      ) : (
        <>
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
        </>
      )}
    </Stack.Navigator>
  );
}


