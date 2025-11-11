import { createStackNavigator } from "@react-navigation/stack";
import { HomeUser } from "../screens/user/HomeUser";
import { FormUser } from "../screens/user/FormUser";
import { UserResponse } from "../interfaces/userInterfaces";

export type UserStackParams = {
    HomeUser: undefined;
    FormUser: UserResponse;
}

export const UserNavigator = () => {
    const Stack = createStackNavigator<UserStackParams>();
    return (
        <Stack.Navigator
            initialRouteName="HomeUser"
            screenOptions={{
                headerMode: "float",
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="HomeUser"
                component={HomeUser}
            />
            <Stack.Screen
                name="FormUser"
                component={FormUser}
            />
        </Stack.Navigator>
    );
}