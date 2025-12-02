import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ActivityIndicator, TextInput, FlatList } from "react-native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { PatientDrawerParams } from "../navigator/PatientDrawerNavigator";
import { useTratamientosPorDiagnostico } from "../hooks/usePacientesData";

type Props = DrawerScreenProps<PatientDrawerParams, 'Tratamientos'>;

export const ReporteTratamientosScreen = ({ route }: Props) => {
    const [diagnostico, setDiagnostico] = useState("Hipertensión");
    const { tratamientos, isLoading, loadTratamientos } = useTratamientosPorDiagnostico();

    const handleSearch = () => {
        if (diagnostico.trim()) {
            loadTratamientos(diagnostico);
        }
    };

    useEffect(() => {
        handleSearch();
    }, []);

    if (isLoading) {
        return (
            <View style={style.containerLoading}>
                <ActivityIndicator size={60} color="#3B82F6" />
            </View>
        );
    }

    return (
        <View style={style.root}>
            <FlatList
                data={tratamientos}
                keyExtractor={(item, index) => `${item.id_tratamiento}-${index}`}
                ListHeaderComponent={
                    <View>
                        <View style={style.searchContainer}>
                            <TextInput
                                style={style.input}
                                placeholder="Diagnóstico..."
                                value={diagnostico}
                                onChangeText={setDiagnostico}
                            />
                        </View>
                        {tratamientos && tratamientos.length > 0 && (
                            <View style={style.dataContainer}>
                                <View style={style.card}>
                                    <Text style={style.label}>Total Tratamientos:</Text>
                                    <Text style={style.value}>{tratamientos.length}</Text>
                                </View>
                            </View>
                        )}
                    </View>
                }
                ListEmptyComponent={
                    !isLoading && (
                        <View style={style.emptyContainer}>
                            <Text style={style.emptyText}>No hay tratamientos disponibles</Text>
                        </View>
                    )
                }
                renderItem={({ item }) => (
                    <View style={style.card}>
                        <View style={style.row}>
                            <Text style={style.label}>Diagnóstico:</Text>
                            <Text style={style.value}>{item.diagnostico}</Text>
                        </View>
                        <View style={style.row}>
                            <Text style={style.label}>Medicamento:</Text>
                            <Text style={style.value}>{item.medicamento}</Text>
                        </View>
                        <View style={style.row}>
                            <Text style={style.label}>Dosis:</Text>
                            <Text style={[style.value, { color: "#3B82F6" }]}>{item.dosis}</Text>
                        </View>
                        <View style={style.row}>
                            <Text style={style.label}>Inicio:</Text>
                            <Text style={style.value}>{item.fecha_inicio}</Text>
                        </View>
                        <View style={style.row}>
                            <Text style={style.label}>Fin:</Text>
                            <Text style={style.value}>{item.fecha_fin}</Text>
                        </View>
                        <View style={style.row}>
                            <Text style={style.label}>Notas:</Text>
                            <Text style={style.value}>{item.notas}</Text>
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
