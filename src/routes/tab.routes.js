// src/routes/tab.routes.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../contexts/theme/ThemeContext";
import { useAuthContext } from "../contexts/auth/AuthContext";

// Screens
import { Home } from "../screens/Home";
import { Clients } from "../screens/Clients";
import { Options } from "../screens/Options";
import { More } from "../screens/More";
import { ServicesOrders } from "../screens/Clients/ServicesOrders";
import { Assets } from "../screens/Assets";

const Tab = createBottomTabNavigator();

export function TabRoutes() {
  const { theme } = useTheme();
  const { user } = useAuthContext();

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
            case "Dashboard":
              iconName = "home-outline";
              break;
            case "Clientes":
              iconName = "people-outline";
              break;
            case "Servi�os":
              iconName = "construct-outline";
              break;
            case "Ativos":
              iconName = "cube-outline";
              break;
            case "Mais":
              iconName = "person-circle-outline";
              break;
            default:
              iconName = "ellipse-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      {/* <Tab.Screen name="Dashboard" component={Home} /> */}
      <Tab.Screen name="Clientes" component={Clients} />
      {/* <Tab.Screen name="Servi�os" component={ServicesOrders} initialParams={{ AllServices: true }} />
      <Tab.Screen name="Ativos" component={Assets} /> */}
      <Tab.Screen name="Mais" component={More} />

    </Tab.Navigator>
  );
}
