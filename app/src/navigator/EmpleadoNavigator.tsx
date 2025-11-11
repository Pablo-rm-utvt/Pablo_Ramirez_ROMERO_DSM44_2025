import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EmpleadosList from '../screens/EmpleadosList';
import FormEmpleado from '../screens/empleado/FormEmpleado';

export type EmpleadoStackParams = {
    EmpleadosList: undefined;
    EmpleadoDetail: { id: number } | undefined;
    EmpleadoForm: { empleado?: any } | undefined;
};

export const EmpleadoNavigator = () => {
    const Stack = createStackNavigator<EmpleadoStackParams>();
    return (
        <Stack.Navigator initialRouteName="EmpleadosList">
            <Stack.Screen name="EmpleadosList" component={EmpleadosList} options={{ title: 'Empleados' }} />
            {/* EmpleadoDetail removed to navigate directly from list to form */}
            <Stack.Screen name="EmpleadoForm" component={FormEmpleado} options={{ title: 'Crear / Editar' }} />
        </Stack.Navigator>
    );
};

export default EmpleadoNavigator;
