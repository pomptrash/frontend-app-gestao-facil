import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Login } from "../screens/Auth/Login";
import { TabRoutes } from "./tab.routes";
import { SignUp } from "../screens/Auth/SignUp";

const Stack = createNativeStackNavigator()

export function StackRoutes(){
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
            <Stack.Screen name="SignUp" component={SignUp} options={{headerShown:false}}/>
            <Stack.Screen name="Home" component={TabRoutes} options={{headerShown:false}} />
        </Stack.Navigator>
    )
}