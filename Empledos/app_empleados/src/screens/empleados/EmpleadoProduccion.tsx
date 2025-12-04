import React, { useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Datum } from '../../interfaces/empleadosInterface';
import { useNomina, useUnidadesProducidas } from '../../hooks/empleados/useEmpleadosReporte';
import { ConfigIp } from "../../context/authContext";

type Props = NativeStackScreenProps<any, 'EmpleadoProduccion'>;



export const EmpleadoProduccion = ({ route, navigation }: Props) => {
    const { apiIp } = useContext(ConfigIp);
    const empleado: Datum = route.params?.empleado;

    const { data: unidadesProducidas, loadData: loadUnidades } = useUnidadesProducidas(apiIp);

    const handleNavigateToEmpleado = () => navigation.goBack();

    useEffect(() => {
        loadUnidades(empleado.id_empleado);
    }, [empleado.id_empleado]);

    return (
        <ScrollView style={style.container}>
            <View style={{ backgroundColor: '#b3c8f4ff', padding: 10, borderRadius: 8, marginBottom: 15 }}>
                <View style={{ backgroundColor: "white", borderRadius: 10, width: 180, alignItems: 'center', margin: "auto", marginBottom: 10 }}>
                    <Text style={style.headerTitle}>{empleado.nombre} {empleado.apellido_p}</Text>
                </View>

                <View style={style.infoHeader}>
                    <Text style={style.sectionTitle}>Unidades Producidas</Text>
                    <View style={style.infoRow}>
                        <Text style={style.label}>Total:</Text>
                        <Text style={style.value}>{(unidadesProducidas?.total && unidadesProducidas.total[0]?.total_producido) ?? 0} unidades</Text>
                    </View>
                </View>
                <View style={{ alignItems: "center" }}>
                    <TouchableOpacity style={{ backgroundColor: "#f48d84ff", borderRadius: 10, width: 100, alignItems: "center" }} onPress={handleNavigateToEmpleado}>
                        <Text style={{ color: 'black' }}>Regresar</Text>
                    </TouchableOpacity>
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
    infoHeader: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#666',
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
    }
});
