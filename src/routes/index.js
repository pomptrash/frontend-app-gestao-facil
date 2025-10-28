// src/routes/index.js
import { NavigationContainer } from "@react-navigation/native";
import { StackRoutes } from "./stack.routes";

export function Routes() {
  return (
    <NavigationContainer
      onStateChange={(state) => {
        const last = state?.routes?.[state.index ?? 0];
        console.log("🗺️ Navigation state change → route:", last?.name, last);
      }}
    >
      <StackRoutes />
    </NavigationContainer>
  );
}