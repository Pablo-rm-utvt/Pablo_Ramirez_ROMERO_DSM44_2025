import { createStackNavigator } from "@react-navigation/stack";
import { ScreenI } from "../screens/stack/ScreenI";
import { ScreenII } from "../screens/stack/ScreenII";
import { ScreenIII } from "../screens/stack/ScreenIII";
import { UserScreen } from "../screens/stack/UserScreen";

export type RootStackParams = {
    ScreenI: undefined;
    ScreenII: undefined;
    ScreenIII: undefined;
    UserScreen: { username: string, id_user: number, status: boolean };
}

export const StackNav = () => {

    const Stack = createStackNavigator<RootStackParams>();

    return (
        <Stack.Navigator
            initialRouteName="ScreenI"
            screenOptions={{
                headerMode: "float",
                headerShown: true,
                headerStyle: {
                    height: 50,
                    shadowColor: "violet",
                    backgroundColor: "pink",
                    borderWidth: 6,
                    borderColor: "gray",
                    borderRadius: 20,
                    opacity: 0.7
                },
                headerTitleStyle: {
                    fontWeight: "bold",
                    color: "violet"
                },
                headerTintColor: "violet",
                cardStyle: {
                    backgroundColor: "white"
                }
            }}
        >
            <Stack.Screen
                name="ScreenI"
                component={ScreenI}
                options={{ title: "Pantalla incial" }}
            />
            <Stack.Screen
                name="ScreenII"
                component={ScreenII}
                options={{ title: "Pantalla secundaria" }}
            />
            <Stack.Screen
                name="UserScreen"
                component={UserScreen}
                options={{ title: "Datos del usuario" }}
            />
        </Stack.Navigator>
    );
}