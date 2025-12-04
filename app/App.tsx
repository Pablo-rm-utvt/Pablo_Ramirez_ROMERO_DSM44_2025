import React, { ReactNode } from 'react';
import { ConfigIpProvedor } from './src/context/authContext';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerNavigator } from './src/navigator/DrawerNav';

const App = () => {
    return (
        <ConfigIpProvedor>
            <NavigationContainer>
                <DrawerNavigator />
            </NavigationContainer>
        </ConfigIpProvedor>
    );
}



export default App;