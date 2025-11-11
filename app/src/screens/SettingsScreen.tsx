import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { View, Text } from 'react-native';
import { appTheme } from '../themes/appTheme';

export const SettingsScreen = () => {

    const { authState } = useContext(AuthContext);

    return (
        <View
            style={appTheme.marginGlobal}
        >
            <Text
                style={appTheme.title}
            >
                Settings Screen
            </Text>
            <Text
                style={appTheme.title}
            >
                {JSON.stringify(authState)}
            </Text>
        </View>
    );
}