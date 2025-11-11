import { createStackNavigator } from "@react-navigation/stack";
import { FormScreen } from "../screens/tarea/FormScreen";
import { HomeTarea } from "../screens/tarea/HomeTarea";
import { TareaResponse } from "../interfaces/tareasInterfaces";

export type RootStackParams = {
    HomeTarea: undefined;
    FormScreen: TareaResponse;
}

export const TareaNavigator = () => {

    const Stack = createStackNavigator<RootStackParams>();

    return (
        <Stack.Navigator
            initialRouteName="HomeTarea"
            screenOptions={{
                headerMode: "float",
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="HomeTarea"
                component={HomeTarea}
            />
            <Stack.Screen
                name="FormScreen"
                component={FormScreen}
            />
        </Stack.Navigator>
    );
}