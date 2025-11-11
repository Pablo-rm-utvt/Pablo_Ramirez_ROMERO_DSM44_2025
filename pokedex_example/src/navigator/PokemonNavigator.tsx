import { createStackNavigator } from "@react-navigation/stack";
import { HomePokemon } from "../screens/HomePokemon";
import { PokemonScreen } from "../screens/PokemonScreen";

export type RootStackParams = {
    HomePokemon: undefined;
    PokemonScreen: { id: number | string, name: string, picture: string, url: string };
}

export const PokemonNavigator = () => {

    const Stack = createStackNavigator<RootStackParams>();

    return (
        <Stack.Navigator
            initialRouteName="HomePokemon"
            screenOptions={{
                headerMode: "float",
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="HomePokemon"
                component={HomePokemon}
            />
            <Stack.Screen
                name="PokemonScreen"
                component={PokemonScreen}
            />
        </Stack.Navigator>
    );
}