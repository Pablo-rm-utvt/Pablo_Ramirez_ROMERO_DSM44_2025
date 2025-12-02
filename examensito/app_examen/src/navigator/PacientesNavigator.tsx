import { createStackNavigator } from '@react-navigation/stack';
import { HomeDrawerNavigator } from './HomeDrawerNavigator';
import { PatientDrawerNavigator } from './PatientDrawerNavigator';
import { PacienteHomeScreen } from '../screens/PacienteHomeScreen';
import { CrearPacienteScreen } from '../screens/CrearPacienteScreen';
import { PacientesActivos } from '../interfaces/pacientesInterface';

export type RootStackParams = {
    HomeDrawer: undefined;
    PacienteHome: { paciente: PacientesActivos };
    PatientReportes: { paciente: PacientesActivos };
    CrearPaciente: undefined;
};

export const PacientesNavigator = () => {
    const Stack = createStackNavigator<RootStackParams>();

    return (
        <Stack.Navigator
            initialRouteName="HomeDrawer"
            screenOptions={{
                headerMode: "float",
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="HomeDrawer"
                component={HomeDrawerNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="PacienteHome"
                component={PatientDrawerNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="PatientReportes"
                component={PatientDrawerNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CrearPaciente"
                component={CrearPacienteScreen}
                options={{
                    headerShown: true,
                    title: "Crear / Editar Paciente",
                    headerStyle: {
                        backgroundColor: '#1F2937'
                    },
                    headerTintColor: '#FFF',
                    headerTitleStyle: {
                        fontWeight: '600'
                    }
                }}
            />
        </Stack.Navigator>
    );
};
