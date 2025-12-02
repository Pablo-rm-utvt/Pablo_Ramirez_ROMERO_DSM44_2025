import React from "react";
import { View, StyleSheet, Text, ActivityIndicator, ScrollView } from "react-native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { PatientDrawerParams } from "../navigator/PatientDrawerNavigator";
import { useCitasPaciente } from "../hooks/usePacientesData";

type Props = DrawerScreenProps<PatientDrawerParams, 'PacienteConCitas'>;

export const ReportePacienteConCitasScreen = ({ route }: Props) => {
    const paciente = route.params?.paciente;
    const { citas, isLoading } = useCitasPaciente();

    if (isLoading) {
        return (
            <View style={style.containerLoading}>
                <ActivityIndicator size={60} color="#3B82F6" />
            </View>
        );
    }

    return (
        <ScrollView style={style.root}>
            <View style={style.card}>
                <Text style={style.header}>Información del Paciente</Text>
                <View style={style.row}>
                    <Text style={style.label}>Nombre:</Text>
                    <Text style={style.value}>{paciente?.nombre} {paciente?.apellido}</Text>
                </View>
                <View style={style.row}>
                    <Text style={style.label}>Tipo Sangre:</Text>
                    <Text style={[style.value, { color: "#3B82F6" }]}>{paciente?.tipo_sangre}</Text>
                </View>
                <View style={style.row}>
                    <Text style={style.label}>Alergias:</Text>
                    <Text style={style.value}>{paciente?.alergias}</Text>
                </View>
            </View>

            <View style={style.card}>
                <Text style={style.header}>Total de Citas: {citas?.length || 0}</Text>
            </View>

            {citas && citas.length > 0 ? (
                citas.map((cita, index) => (
                    <View key={`${cita.id_cita}-${index}`} style={style.card}>
                        <Text style={style.label}>Cita #{index + 1}</Text>
                        <View style={style.row}>
                            <Text style={style.label}>Fecha:</Text>
                            <Text style={style.value}>{cita.fecha || 'N/A'}</Text>
                        </View>
                        <View style={style.row}>
                            <Text style={style.label}>Hora:</Text>
                            <Text style={style.value}>{cita.hora || 'N/A'}</Text>
                        </View>
                        <View style={style.row}>
                            <Text style={style.label}>Motivo:</Text>
                            <Text style={style.value}>{cita.motivo || 'N/A'}</Text>
                        </View>
                        <View style={style.row}>
                            <Text style={style.label}>Estado:</Text>
                            <Text style={[style.value, { color: cita.estatus === 'Cancelada' ? '#EF4444' : '#10B981' }]}>
                                {cita.estatus}
                            </Text>
                        </View>
                    </View>
                ))
            ) : (
                <View style={style.emptyContainer}>
                    <Text style={style.emptyText}>Este paciente no tiene citas registradas</Text>
                </View>
            )}
        </ScrollView>
    );
};

const style = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#F8F9FB',
    },
    containerLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F9FB',
    },
    searchContainer: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    input: {
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 14,
        color: '#1F2937',
        borderWidth: 1,
        borderColor: '#D1D5DB',
    },
    dataContainer: {
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        marginHorizontal: 16,
        marginVertical: 8,
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#3B82F6',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 1,
    },
    header: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        paddingBottom: 8,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 4,
        alignItems: 'center',
    },
    label: {
        fontSize: 12,
        fontWeight: '700',
        color: '#6B7280',
        textTransform: 'uppercase',
        letterSpacing: 0.3,
    },
    value: {
        fontSize: 13,
        fontWeight: '600',
        color: '#1F2937',
        flex: 1,
        textAlign: 'right',
    },
    emptyContainer: {
        marginVertical: 40,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 14,
        color: '#9CA3AF',
        fontStyle: 'italic',
    },
});
