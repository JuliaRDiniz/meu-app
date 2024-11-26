import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "./pages/home/index";
import { ClientDetails } from "./pages/clients/index";

const Stack = createStackNavigator();

export function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ClientDetails"
        component={ClientDetails}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
