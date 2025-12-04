import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EmpleadoListScreen } from '../screens/empleados/EmpleadoList';
import { EmpleadoDetailScreen } from '../screens/empleados/EmpleadoDetail';
import { EmpleadoNominaScreen } from '../screens/empleados/EmpleadoNomina';
import { EmpleadoProduccion } from '../screens/empleados/EmpleadoProduccion';
import { Datum } from '../interfaces/empleadosInterface';

export type EmpleadoStackParams = {
  EmpleadoListScreen: undefined;
  EmpleadoProduccion: { empleado: Datum };
  EmpleadoDetail: { empleado: Datum };
  EmpleadoNomina: { empleado: Datum };
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

      <Stack.Screen
        name="EmpleadoProduccion"
        component={EmpleadoProduccion}
        options={{
          title: 'Detalle del Produccion',
        }}
      />
      <Stack.Screen
        name="EmpleadoNomina"
        component={EmpleadoNominaScreen}
        options={{
          title: 'Nómina del Empleado',
        }}
      />
    </Stack.Navigator>
  );
};
