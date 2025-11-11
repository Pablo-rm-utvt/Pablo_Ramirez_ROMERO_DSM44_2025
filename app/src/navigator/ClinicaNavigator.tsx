import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeClinica } from '../screens/clinica/HomeClinica';
import { FormPaciente } from '../screens/clinica/FormPaciente';
import { PacienteDetail } from '../screens/clinica/PacienteDetail';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

export const ClinicaNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                cardStyle: {
                    backgroundColor: 'white'
                },
                headerStyle: {
                    elevation: 0,
                    shadowColor: 'transparent'
                }
            }}
        >
            <Stack.Screen
                name="HomeClinica"
                component={HomeClinica}
                options={{ title: 'Pacientes' }}
            />
            <Stack.Screen
                name="FormPaciente"
                component={FormPaciente}
                options={{ title: 'Registro de Paciente' }}
            />
            <Stack.Screen
                name="PacienteDetail"
                component={PacienteDetail}
                options={{ title: 'Detalle del Paciente' }}
            />
        </Stack.Navigator>
    );
};