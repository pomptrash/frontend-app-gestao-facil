import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Home } from "../screens/Home";
import { Clients } from "../screens/Clients";
import { Services } from "../screens/Services";
import { ClientAssets } from "../screens/ClientAssets";


import { Feather } from '@expo/vector-icons'

import { useTheme } from "../theme/ThemeContext";

const Tab = createBottomTabNavigator()

export function TabRoutes(){

    const { theme } = useTheme()

    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.background,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Feather name="home" color={color} size={size} />
            ),
          }}
        />

        <Tab.Screen
          name="Clientes"
          component={Clients}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Feather name="user" color={color} size={size} />
            ),
          }}
        />

        <Tab.Screen
          name="Ativos"
          component={ClientAssets}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Feather name="layers" color={color} size={size} />
            ),
          }}
        />

        <Tab.Screen
          name="Serviços"
          component={Services}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Feather name="tool" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    );
}