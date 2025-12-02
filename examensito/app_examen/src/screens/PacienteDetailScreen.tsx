import React, { useEffect } from "react";
import { View, StyleSheet, Text, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { usePacienteCompleto } from "../hooks/usePacientesData";
import { PacientesActivos } from "../interfaces/pacientesInterface";

type Props = any;

export const PacienteDetailScreen = ({ route, navigation }: Props) => {
    const { paciente: pacienteInitial } = route.params;
    const { paciente, isLoading, loadPacienteData } = usePacienteCompleto();

    useEffect(() => {
        loadPacienteData(pacienteInitial.id_paciente);
    }, [pacienteInitial.id_paciente]);

    if (isLoading) {
        return (
            <View style={style.containerLoading}>
                <ActivityIndicator size={60} color="#3B82F6" />
            </View>
        );
    }

    const p = paciente || pacienteInitial;

    const handleGoToReports = () => {
        navigation.navigate('PatientReportes', { paciente: p as PacientesActivos });
    };

    return (
        <ScrollView style={style.root} showsVerticalScrollIndicator={false}>
            <View style={style.headerCard}>
                <Text style={style.nombreCompleto}>
                    {p.nombre} {p.apellido}
                </Text>
                <Text style={style.estado}>
                    {p.activo ? "Activo" : "Inactivo"}
                </Text>
            </View>

            <View style={style.section}>
                <Text style={style.sectionTitle}>Información Personal</Text>
                
                <View style={style.detailRow}>
                    <Text style={style.label}>ID Paciente:</Text>
                    <Text style={style.value}>{p.id_paciente}</Text>
                </View>

                <View style={style.detailRow}>
                    <Text style={style.label}>Fecha de Nacimiento:</Text>
                    <Text style={style.value}>{p.fecha_nacimiento || "N/A"}</Text>
                </View>

                <View style={style.detailRow}>
                    <Text style={style.label}>Sexo:</Text>
                    <Text style={style.value}>{p.sexo === 'M' ? 'Masculino' : p.sexo === 'F' ? 'Femenino' : 'N/A'}</Text>
                </View>

                <View style={style.detailRow}>
                    <Text style={style.label}>Teléfono:</Text>
                    <Text style={style.value}>{p.telefono || "N/A"}</Text>
                </View>

                <View style={style.detailRow}>
                    <Text style={style.label}>Dirección:</Text>
                    <Text style={style.value}>{p.direccion || "N/A"}</Text>
                </View>
            </View>

            <View style={style.section}>
                <Text style={style.sectionTitle}>Información Médica</Text>

                <View style={style.detailRow}>
                    <Text style={style.label}>Tipo de Sangre:</Text>
                    <Text style={[style.value, style.bloodType]}>{p.tipo_sangre || "N/A"}</Text>
                </View>

                <View style={style.detailRow}>
                    <Text style={style.label}>Alergias:</Text>
                    <Text style={style.value}>{p.alergias || "Sin alergias conocidas"}</Text>
                </View>
            </View>

            <TouchableOpacity 
                style={style.reportButton}
                onPress={handleGoToReports}
                activeOpacity={0.8}
            >
                <Text style={style.reportButtonText}>Ver Reportes del Paciente</Text>
            </TouchableOpacity>

            <View style={{ height: 100 }} />
        </ScrollView>
    );
};

const style = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#F8F9FB',
        paddingHorizontal: 16,
    },
    containerLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F9FB',
    },
    headerCard: {
        backgroundColor: '#1F2937',
        borderRadius: 12,
        padding: 20,
        marginVertical: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    nombreCompleto: {
        fontSize: 24,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 8,
    },
    estado: {
        fontSize: 14,
        fontWeight: '600',
        color: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        overflow: 'hidden',
    },
    section: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderLeftWidth: 4,
        borderLeftColor: '#3B82F6',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 12,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#6B7280',
        flex: 0.35,
    },
    value: {
        fontSize: 14,
        color: '#1F2937',
        flex: 0.65,
        textAlign: 'right',
        fontWeight: '500',
    },
    bloodType: {
        backgroundColor: '#EFF6FF',
        color: '#1E40AF',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        overflow: 'hidden',
        fontWeight: '700',
    },
    reportButton: {
        backgroundColor: '#3B82F6',
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 20,
        marginHorizontal: 16,
        marginVertical: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
    },
    reportButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.3,
    },
});
