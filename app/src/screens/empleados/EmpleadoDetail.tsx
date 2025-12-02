import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Datum } from '../../interfaces/empleadosInterface';
import { useAsistenciaEmpleado } from '../../hooks/empleados/useEmpleadosReporte';
import { useNomina } from '../../hooks/empleados/useEmpleadosReporte';
import { useDiasTrabajados } from '../../hooks/empleados/useEmpleadosReporte';
import { useHorasTrabajadas } from '../../hooks/empleados/useEmpleadosReporte';
import { useUnidadesProducidas } from '../../hooks/empleados/useEmpleadosReporte';
import { Navigate } from 'react-location';

type Props = NativeStackScreenProps<any, 'EmpleadoDetail'>;

export const EmpleadoDetailScreen = ({ route }: Props) => {
    const empleado: Datum = route.params?.empleado;
    const { data: asistencia, isLoading: isLoadingAsistencia, loadData: loadAsistencia } = useAsistenciaEmpleado();
    const { data: nomina, isLoading: isLoadingNomina, loadData: loadNomina } = useNomina();
    const { data: diasTrabajados, isLoading: isLoadingDias, loadData: loadDias } = useDiasTrabajados();
    const { data: horasTrabajadas, isLoading: isLoadingHoras, loadData: loadHoras } = useHorasTrabajadas();
    const { data: unidadesProducidas, isLoading: isLoadingUnidades, loadData: loadUnidades } = useUnidadesProducidas();

    const isLoading = isLoadingAsistencia || isLoadingNomina || isLoadingDias || isLoadingHoras || isLoadingUnidades;

    const fechaInicio = '01/01/2025';
    const fechaFin = '01/02/2025';

    useEffect(() => {
        loadAsistencia(empleado.id_empleado, fechaInicio, fechaFin);
        loadNomina(empleado.id_empleado, fechaInicio, fechaFin);
        loadDias(empleado.id_empleado, fechaInicio, fechaFin);
        loadHoras(empleado.id_empleado, fechaInicio, fechaFin);
        loadUnidades(empleado.id_empleado, fechaInicio, fechaFin);
    }, [empleado.id_empleado]);

    return (
        <ScrollView style={style.container}
        >
            <View style={{ backgroundColor: '#7ca2f3ff', padding: 10, borderRadius: 8, marginBottom: 15 }}>
                <View style={style.section}>
                    <Text style={style.sectionTitle}>Información Personal</Text>
                    <View style={style.infoRow}>
                        <Text style={style.label}>ID:</Text>
                        <Text style={style.value}>{empleado.id_empleado}</Text>
                    </View>
                    <View style={style.infoRow}>
                        <Text style={style.label}>Nombre:</Text>
                        <Text style={style.value}>{empleado.nombre} {empleado.apellido_p} {empleado.apellido_m}</Text>
                    </View>
                    <View style={style.infoRow}>
                        <Text style={style.label}>Área:</Text>
                        <Text style={style.value}>{empleado.area}</Text>
                    </View>
                    <View style={style.infoRow}>
                        <Text style={style.label}>Turno:</Text>
                        <Text style={style.value}>{empleado.turno}</Text>
                    </View>
                    <View style={style.infoRow}>
                        <Text style={style.label}>Salario Diario:</Text>
                        <Text style={style.value}>${empleado.salarioDiario}</Text>
                    </View>
                    <View style={style.infoRow}>
                        <Text style={style.label}>Estado:</Text>
                        <Text style={[style.value, { color: empleado.activo ? 'green' : 'red' }]}>
                            {empleado.activo ? 'Activo' : 'Inactivo'}
                        </Text>
                    </View>
                </View>

                <View style={style.section}>
                    <Text style={style.sectionTitle}>Información de Asistencia</Text>
                    <View style={style.infoRow}>
                        <Text style={style.label}>Registros:</Text>
                        <Text style={style.value}>{asistencia?.total_asistencias || 0}</Text>
                    </View>
                </View>

                <View style={style.section}>
                    <Text style={style.sectionTitle}>Información de Nómina</Text>
                    <View style={style.infoRow}>
                        <Text style={style.label}>Registros:</Text>
                        <Text style={style.value}>{nomina?.total || 0}</Text>
                    </View>
                </View>

                <View style={style.section}>
                    <Text style={style.sectionTitle}>Días Trabajados</Text>
                    <View style={style.infoRow}>
                        <Text style={style.label}>Total:</Text>
                        <Text style={style.value}>{diasTrabajados && diasTrabajados.length} días</Text>
                    </View>
                </View>

                <View style={style.section}>
                    <Text style={style.sectionTitle}>Horas Trabajadas</Text>
                    <View style={style.infoRow}>
                        <Text style={style.label}>Total:</Text>
                        <Text style={style.value}>{horasTrabajadas && horasTrabajadas.length} horas</Text>
                    </View>
                </View>

                <View style={style.section}>
                    <Text style={style.sectionTitle}>Unidades Producidas</Text>
                    <View style={style.infoRow}>
                        <Text style={style.label}>Total:</Text>
                        <Text style={style.value}>{unidadesProducidas?.total && unidadesProducidas.total[0]?.total_producido || 0} unidades</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 15,
    },
    section: {
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
    },
    value: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
    listContainer: {
        marginTop: 10,
    },
    itemRow: {
        backgroundColor: '#ffffff',
        padding: 10,
        marginBottom: 8,
        borderRadius: 8,
        borderLeftWidth: 3,
        borderLeftColor: '#4CAF50',
    },
    itemText: {
        fontSize: 12,
        color: '#555',
        marginBottom: 4,
    },
});