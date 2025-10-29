// src/routes/tab.routes.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../contexts/theme/ThemeContext";

// 🧭 Telas
import { Home } from "../screens/Home";
import { Clients } from "../screens/Clients";
import { Options } from "../screens/Options";

const Tab = createBottomTabNavigator();

export function TabRoutes() {
  const { theme } = useTheme();
   console.log("🧭 TabRoutes montado");

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.card,
          borderTopColor: theme.border,
          height: 70,
          paddingBottom: 10,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case "Início":
              iconName = "home-outline";
              break;
            case "Clientes":
              iconName = "people-outline";
              break;
            case "Perfil":
              iconName = "person-circle-outline";
              break;
            default:
              iconName = "ellipse-outline";
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Início" component={Home} />
      <Tab.Screen name="Clientes" component={Clients} />
      <Tab.Screen name="Perfil" component={Options} />
    </Tab.Navigator>
  );
}
