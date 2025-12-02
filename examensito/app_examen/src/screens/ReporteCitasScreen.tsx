import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ActivityIndicator, TextInput, FlatList } from "react-native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { PatientDrawerParams } from "../navigator/PatientDrawerNavigator";
import { useCitasPaciente } from "../hooks/usePacientesData";

type Props = DrawerScreenProps<PatientDrawerParams, 'TodasLasCitas'>;

export const ReporteCitasScreen = ({ route }: Props) => {
    const { paciente } = route.params as { paciente: any };
    const { citas, isLoading, loadCitas } = useCitasPaciente();
    const [filtro, setFiltro] = useState("");

    const handleLoadData = () => {
        if (paciente?.id_paciente) {
            loadCitas(paciente.id_paciente);
        }
    };

    useEffect(() => {
        handleLoadData();
    }, [paciente?.id_paciente]);

    if (isLoading) {
        return (
            <View style={style.containerLoading}>
                <ActivityIndicator size={60} color="#3B82F6" />
            </View>
        );
    }

    const renderHeader = () => (
        <>
            <View style={style.filterContainer}>
                <TextInput
                    style={style.input}
                    placeholder="Buscar cita..."
                    value={filtro}
                    onChangeText={setFiltro}
                />
            </View>

            {citas && citas.length > 0 && (
                <View style={style.dataContainer}>
                    <View style={style.card}>
                        <Text style={style.label}>Total Citas:</Text>
                        <Text style={style.value}>{citas.length}</Text>
                    </View>
                </View>
            )}
        </>
    );

    const citasFiltradas = citas?.filter((cita: any) => 
        cita.motivo?.toLowerCase().includes(filtro.toLowerCase()) ||
        cita.medico_asignado?.toLowerCase().includes(filtro.toLowerCase())
    ) || [];

    return (
        <View style={style.root}>
            <FlatList
                style={style.content}
                data={citasFiltradas}
                keyExtractor={(item, index) => `${item.id_cita}-${index}`}
                ListHeaderComponent={renderHeader}
                ListEmptyComponent={
                    !isLoading && (
                        <View style={style.emptyContainer}>
                            <Text style={style.emptyText}>No hay citas disponibles</Text>
                        </View>
                    )
                }
                renderItem={({ item }) => (
                    <View style={style.card}>
                        <View style={style.row}>
                            <Text style={style.label}>Fecha:</Text>
                            <Text style={style.value}>{item.fecha}</Text>
                        </View>
                        <View style={style.row}>
                            <Text style={style.label}>Hora:</Text>
                            <Text style={[style.value, { color: "#3B82F6" }]}>{item.hora}</Text>
                        </View>
                        <View style={style.row}>
                            <Text style={style.label}>Motivo:</Text>
                            <Text style={style.value}>{item.motivo}</Text>
                        </View>
                        <View style={style.row}>
                            <Text style={style.label}>Médico:</Text>
                            <Text style={[style.value, { color: "#F59E0B" }]}>{item.medico_asignado}</Text>
                        </View>
                        <View style={style.row}>
                            <Text style={style.label}>Estatus:</Text>
                            <Text style={[style.value, { color: item.estatus === "confirmada" ? "#22C55E" : "#EF4444" }]}>
                                {item.estatus}
                            </Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const style = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#F8F9FB',
    },
    content: {
        paddingHorizontal: 0,
    },
    containerLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F9FB',
    },
    filterContainer: {
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
        fontSize: 14,
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
