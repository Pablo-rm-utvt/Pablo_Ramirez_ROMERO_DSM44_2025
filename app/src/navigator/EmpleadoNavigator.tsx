import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EmpleadoListScreen } from '../screens/empleados/EmpleadoList';
import { EmpleadoDetailScreen } from '../screens/empleados/EmpleadoDetail';
import { Datum } from '../interfaces/empleadosInterface';

export type EmpleadoStackParams = {
  EmpleadoListScreen: undefined;
  EmpleadoDetail: { empleado: Datum };
};

const Stack = createNativeStackNavigator<EmpleadoStackParams>();

export const EmpleadoNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="EmpleadoListScreen"
        component={EmpleadoListScreen}
        options={{
          title: 'Empleados',
        }}
      />
      <Stack.Screen
        name="EmpleadoDetail"
        component={EmpleadoDetailScreen}
        options={{
          title: 'Detalle del Empleado',
        }}
      />
    </Stack.Navigator>
  );
};
