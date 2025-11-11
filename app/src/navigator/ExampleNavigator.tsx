import { createStackNavigator } from '@react-navigation/stack';
import { HomeExample } from '../screens/example/HomeExample';
import { FormExample } from '../screens/example/FormExample';
import { UseExample } from '../interfaces/exampleInterfaces';

export type RootStackParams = {
    HomeExample: undefined;
    FormExample: UseExample | undefined;
}

const Stack = createStackNavigator<RootStackParams>();

export const ExampleNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: 'white'
                }
            }}
        >
            <Stack.Screen name="HomeExample" component={HomeExample} />
            <Stack.Screen name="FormExample" component={FormExample} />
        </Stack.Navigator>
    );
};