import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PokemonNavigator } from './src/navigator/PokemonNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <PokemonNavigator />
    </NavigationContainer>
  );
}

export default App;