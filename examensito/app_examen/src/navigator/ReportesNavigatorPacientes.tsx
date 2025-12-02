import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ReporteCitasScreen } from '../screens/ReporteCitasScreen';
import { ReporteMedicamentosScreen } from '../screens/ReporteMedicamentosScreen';
import { ReporteTratamientosScreen } from '../screens/ReporteTratamientosScreen';
import { ReporteCitasCanceladasScreen } from '../screens/ReporteCitasCanceladasScreen';
import { ReporteCitasPorFechaScreen } from '../screens/ReporteCitasPorFechaScreen';
import { ReportePacientesPorTipoSangreScreen } from '../screens/ReportePacientesPorTipoSangreScreen';
import { ReportePacienteConCitasScreen } from '../screens/ReportePacienteConCitasScreen';
import { PacientesActivos } from '../interfaces/pacientesInterface';

export type ReportesDrawerParams = {
    ReporteCitas: { paciente: PacientesActivos };
    ReporteMedicamentos: { paciente: PacientesActivos };
    ReporteTratamientos: { paciente: PacientesActivos };
    ReporteCitasCanceladas: { paciente: PacientesActivos };
    ReporteCitasPorFecha: { paciente: PacientesActivos };
    ReportePacientesPorTipoSangre: { paciente: PacientesActivos };
    ReportePacienteConCitas: { paciente: PacientesActivos };
};

const Drawer = createDrawerNavigator<ReportesDrawerParams>();

export const ReportesNavigatorPacientes = ({ paciente }: { paciente: PacientesActivos }) => {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: '#1F2937',
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                    fontWeight: '700',
                    fontSize: 16,
                    letterSpacing: 0.3,
                },
                drawerActiveTintColor: '#3B82F6',
                drawerInactiveTintColor: '#9CA3AF',
                drawerLabelStyle: {
                    fontSize: 13,
                    fontWeight: '600',
                },
                drawerStyle: {
                    backgroundColor: '#F8F9FB',
                },
                drawerItemStyle: {
                    marginVertical: 8,
                },
            }}
        >
            <Drawer.Screen 
                name="ReporteCitas" 
                component={ReporteCitasScreen}
                options={{
                    drawerLabel: 'Citas',
                    title: `Citas - ${paciente.nombre} ${paciente.apellido}`
                }}
                initialParams={{ paciente }}
            />
            <Drawer.Screen 
                name="ReporteMedicamentos" 
                component={ReporteMedicamentosScreen}
                options={{
                    drawerLabel: 'Medicamentos',
                    title: `Medicamentos - ${paciente.nombre} ${paciente.apellido}`
                }}
                initialParams={{ paciente }}
            />
            <Drawer.Screen 
                name="ReporteTratamientos" 
                component={ReporteTratamientosScreen}
                options={{
                    drawerLabel: 'Tratamientos',
                    title: 'Tratamientos'
                }}
                initialParams={{ paciente }}
            />
            <Drawer.Screen 
                name="ReporteCitasCanceladas" 
                component={ReporteCitasCanceladasScreen}
                options={{
                    drawerLabel: 'Citas Canceladas',
                    title: 'Citas Canceladas'
                }}
                initialParams={{ paciente }}
            />
            <Drawer.Screen 
                name="ReporteCitasPorFecha" 
                component={ReporteCitasPorFechaScreen}
                options={{
                    drawerLabel: 'Citas por Fecha',
                    title: 'Buscar Citas'
                }}
                initialParams={{ paciente }}
            />
            <Drawer.Screen 
                name="ReportePacientesPorTipoSangre" 
                component={ReportePacientesPorTipoSangreScreen}
                options={{
                    drawerLabel: 'Por Tipo de Sangre',
                    title: 'Pacientes'
                }}
                initialParams={{ paciente }}
            />
            <Drawer.Screen 
                name="ReportePacienteConCitas" 
                component={ReportePacienteConCitasScreen}
                options={{
                    drawerLabel: 'Paciente Completo',
                    title: 'Info Paciente'
                }}
                initialParams={{ paciente }}
            />
        </Drawer.Navigator>
    );
};
