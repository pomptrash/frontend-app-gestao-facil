import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Login } from "../screens/Login";
import { tabRoutes } from "./tab.routes";

const Stack = createNativeStackNavigator()

export function StackRoutes(){
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
            <Stack.Screen name="Home" component={tabRoutes} options={{headerShown:false}} />
        </Stack.Navigator>
    )
}