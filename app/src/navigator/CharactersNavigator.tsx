import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../screens/Home";
import { CharacterScreen } from "../screens/CharacterScreen";

export type RootStackParams = {
    Home: undefined;
    Character: { id: number };
};

export const CharactersNavigator = () => {
    const Stack = createStackNavigator<RootStackParams>();

    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Character" component={CharacterScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};
