import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ActivityIndicator, TextInput, FlatList } from "react-native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { ReportesDrawerParams } from "../navigator/ReportesNavigatorPacientes";
import { usePacientesPorTipoSangre } from "../hooks/usePacientesData";

type Props = DrawerScreenProps<ReportesDrawerParams, 'ReporteCitas'>;

export const ReportePacientesPorTipoSangreScreen = () => {
    const [tipoSangre, setTipoSangre] = useState("O+");
    const { data, isLoading, loadData } = usePacientesPorTipoSangre();

    const handleSearch = () => {
        if (tipoSangre.trim()) {
            loadData(tipoSangre);
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
                data={data}
                keyExtractor={(item, index) => `${item.id_paciente}-${index}`}
                ListHeaderComponent={
                    <View>
                        <View style={style.searchContainer}>
                            <TextInput
                                style={style.input}
                                placeholder="Tipo de sangre (ej: O+)..."
                                value={tipoSangre}
                                onChangeText={setTipoSangre}
                            />
                        </View>
                        {data && data.length > 0 && (
                            <View style={style.dataContainer}>
                                <View style={style.card}>
                                    <Text style={style.label}>Total Pacientes:</Text>
                                    <Text style={style.value}>{data.length}</Text>
                                </View>
                            </View>
                        )}
                    </View>
                }
                ListEmptyComponent={
                    !isLoading && (
                        <View style={style.emptyContainer}>
                            <Text style={style.emptyText}>No hay pacientes con este tipo de sangre</Text>
                        </View>
                    )
                }
                renderItem={({ item }) => (
                    <View style={style.card}>
                        <View style={style.row}>
                            <Text style={style.label}>Nombre:</Text>
                            <Text style={style.value}>{item.nombre} {item.apellido}</Text>
                        </View>
                        <View style={style.row}>
                            <Text style={style.label}>Tipo Sangre:</Text>
                            <Text style={[style.value, { color: "#3B82F6" }]}>{item.tipo_sangre}</Text>
                        </View>
                        <View style={style.row}>
                            <Text style={style.label}>Teléfono:</Text>
                            <Text style={style.value}>{item.telefono}</Text>
                        </View>
                        <View style={style.row}>
                            <Text style={style.label}>Estado:</Text>
                            <Text style={[style.value, { color: item.activo ? "#22C55E" : "#EF4444" }]}>
                                {item.activo ? "Activo" : "Inactivo"}
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
