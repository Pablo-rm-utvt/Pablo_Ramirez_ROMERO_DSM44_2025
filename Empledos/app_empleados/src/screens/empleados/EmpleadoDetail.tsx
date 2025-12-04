import React, { useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Datum } from '../../interfaces/empleadosInterface';
import { useAsistenciaEmpleado, useNomina, useDiasTrabajados, useHorasTrabajadas, useUnidadesProducidas } from '../../hooks/empleados/useEmpleadosReporte';
import { ConfigIp } from "../../context/authContext";

type Props = NativeStackScreenProps<any, 'EmpleadoDetail'>;

export const EmpleadoDetailScreen = ({ route, navigation }: Props) => {

    const { apiIp } = useContext(ConfigIp);
    const empleado: Datum = route.params?.empleado;

    const { data: asistencia, loadData: loadAsistencia } = useAsistenciaEmpleado(apiIp);

    const { data: diasTrabajados, loadData: loadDias } = useDiasTrabajados(apiIp);
    const { data: horasTrabajadas, loadData: loadHoras } = useHorasTrabajadas(apiIp);
    const handleNavigateToProduccion = () => navigation.navigate('EmpleadoProduccion', { empleado });
    const handleNavigateToNomina = () => navigation.navigate('EmpleadoNomina', { empleado });
    const handleNavigateToList = () => navigation.popToTop();
    useEffect(() => {
        loadAsistencia(empleado.id_empleado);
        loadDias(empleado.id_empleado);
        loadHoras(empleado.id_empleado);
    }, [empleado.id_empleado]);

    return (
        <View style={style.container}>

            <ScrollView style={style.container}>
                <View style={{ backgroundColor: '#b3c8f4ff', padding: 10, borderRadius: 8, marginBottom: 15 }}>

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
                            <Text style={[style.value, { color: empleado.activo ? 'green' : 'red' }]}>{empleado.activo ? 'Activo' : 'Inactivo'}</Text>
                        </View>


                        <Text style={style.sectionTitle}>Información de Asistencia</Text>
                        <View style={style.infoRow}>
                            <Text style={style.label}>Registros:</Text>
                            <Text style={style.value}>{asistencia?.total_asistencias ?? 0}</Text>
                        </View>

                        <Text style={style.sectionTitle}>Días Trabajados</Text>
                        <View style={style.infoRow}>
                            <Text style={style.label}>Total:</Text>
                            <Text style={style.value}>{(diasTrabajados?.length) ?? 0} días</Text>
                        </View>

                        <Text style={style.sectionTitle}>Horas Trabajadas</Text>
                        <View style={style.infoRow}>
                            <Text style={style.label}>Total:</Text>
                            <Text style={style.value}>{(horasTrabajadas?.length) ?? 0} horas</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={{ backgroundColor: "#b3c8f4ff", top: 0, height: 50, width: 360, flexDirection: "row", justifyContent: "space-around" }}>

                <TouchableOpacity style={{ margin: 5, backgroundColor: "#b3c8f4ff", justifyContent: "center", borderRadius: 10, width: 100, alignItems: "center" }} onPress={handleNavigateToNomina}>
                    <Image
                        style={{ width: 20, height: 20, marginBottom: 5 }}
                        source={require('../../../assets/nomina.png')}
                    />
                    <Text style={{ color: "black", fontWeight: "bold" }}>Nómina</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ margin: 5, backgroundColor: "#b3c8f4ff", borderRadius: 10, justifyContent: "center", width: 100, alignItems: "center" }} onPress={handleNavigateToProduccion}>
                    <Image
                        style={{ width: 20, height: 20, marginBottom: 5 }}
                        source={require('../../../assets/producciónn.png')}
                    />
                    <Text style={{ color: "black", fontWeight: "bold" }}>Producción</Text>
                </TouchableOpacity>



                <TouchableOpacity style={{ margin: 5, backgroundColor: "#b3c8f4ff", borderRadius: 10, justifyContent: "center", width: 100, alignItems: "center" }} onPress={handleNavigateToList}>
                    <Image
                        style={{ width: 20, height: 20, marginBottom: 5 }}
                        source={require('../../../assets/return.png')}
                    />
                    <Text style={{ color: 'black', fontWeight: "bold" }}>Regresar</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    section: {
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
    },

    buttonTitle: {
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
    },
    button: {
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 45,
        borderRadius: 10,
        backgroundColor: '#a8d5faff',
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
    }
});
