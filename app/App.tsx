import React, { ReactNode } from 'react';
import { AuthProvider } from './src/context/authContext';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerNavigator } from './src/navigator/DrawerNav';
//import { TareaNavigator } from './src/navigator/TareaNavigator';
//import { PokemonNavigator } from './src/navigator/PokemonNavigator';
//import { StackNav } from './src/navigator/StackNav';
//import { PrimerScreen } from './src/screens/PrimerScreen';
//import { MiPrimerDiseno } from './src/screens/MiPrimerDiseno';
//import { PrimerComponente } from './src/screens/PrimerComponente';
//import { ContadorScreen } from './src/screens/ContadorScreen';
//import { ComponenteStyle } from './src/screens/ComponenteStyle';
//import { ContadorReducerScreen } from './src/screens/ContadorReducerScreen';
//import { MiPrimerScreen } from './src/screens/MiPrimerScreen-maestro';
//import { MiPrimerDiseno } from './src/screens/MiPrimerDiseno-maestro';
//import { MiPrimerContador } from './src/screens/MiPrimerContador-maestro';

const AppState = ({ children }: { children: ReactNode }) => {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
}

const App = () => {
    return (
        <NavigationContainer>
            <AppState>
                <DrawerNavigator />
            </AppState>
        </NavigationContainer>
    );
}

export default App;