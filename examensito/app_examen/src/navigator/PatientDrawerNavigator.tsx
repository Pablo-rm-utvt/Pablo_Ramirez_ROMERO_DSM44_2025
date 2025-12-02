import { createDrawerNavigator, DrawerScreenProps } from '@react-navigation/drawer';
import { PacienteHomeScreen } from '../screens/PacienteHomeScreen';
import { ReporteCitasScreen } from '../screens/ReporteCitasScreen';
import { ReporteTratamientosScreen } from '../screens/ReporteTratamientosScreen';
import { ReporteCitasPorFechaScreen } from '../screens/ReporteCitasPorFechaScreen';
import { ReporteMedicamentosScreen } from '../screens/ReporteMedicamentosScreen';
import { ReportePacienteConCitasScreen } from '../screens/ReportePacienteConCitasScreen';
import { PacientesActivos } from '../interfaces/pacientesInterface';
import { useRoute } from '@react-navigation/native';

export type PatientDrawerParams = {
    InformacionPaciente: { paciente: PacientesActivos };
    TodasLasCitas: { paciente: PacientesActivos };
    Tratamientos: { paciente: PacientesActivos };
    CitasPorFecha: { paciente: PacientesActivos };
    Medicamentos: { paciente: PacientesActivos };
    PacienteConCitas: { paciente: PacientesActivos };
};

export const PatientDrawerNavigator = () => {
    const route = useRoute<any>();
    const paciente = route.params?.paciente;
    const Drawer = createDrawerNavigator<PatientDrawerParams>();

    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: true,
                headerStyle: { backgroundColor: '#ffe998ff' },
                headerTintColor: 'white',
                headerTitleStyle: { fontWeight: '700', fontSize: 16 },
                headerLeft: undefined,
                drawerStyle: {
                    backgroundColor: '#ffe998ff',
                },
                drawerLabelStyle: { color: 'white' },
                drawerActiveTintColor: '#3B82F6',
                drawerInactiveTintColor: '#9CA3AF',
            }}
        >
            <Drawer.Screen
                name="InformacionPaciente"
                component={PacienteHomeScreen}
                options={{
                    title: 'Información General',
                    drawerLabel: 'Información General del Paciente',
                }}
                initialParams={{ paciente }}
            />
            <Drawer.Screen
                name="TodasLasCitas"
                component={ReporteCitasScreen}
                options={{
                    title: 'Citas',
                    drawerLabel: 'Ver Todas las Citas',
                }}
                initialParams={{ paciente }}
            />
            <Drawer.Screen
                name="Tratamientos"
                component={ReporteTratamientosScreen}
                options={{
                    title: 'Tratamientos',
                    drawerLabel: 'Consultar Tratamientos por Diagnóstico',
                }}
                initialParams={{ paciente }}
            />
            <Drawer.Screen
                name="CitasPorFecha"
                component={ReporteCitasPorFechaScreen}
                options={{
                    title: 'Citas por Fecha',
                    drawerLabel: 'Consultar Citas de un Día Específico',
                }}
                initialParams={{ paciente }}
            />
            <Drawer.Screen
                name="Medicamentos"
                component={ReporteMedicamentosScreen}
                options={{
                    title: 'Medicamentos',
                    drawerLabel: 'Obtener Medicamentos y Dosis',
                }}
                initialParams={{ paciente }}
            />
            <Drawer.Screen
                name="PacienteConCitas"
                component={ReportePacienteConCitasScreen}
                options={{
                    title: 'Paciente y Citas',
                    drawerLabel: 'Mostrar Paciente con sus Citas',
                }}
                initialParams={{ paciente }}
            />
        </Drawer.Navigator>
    );
};
