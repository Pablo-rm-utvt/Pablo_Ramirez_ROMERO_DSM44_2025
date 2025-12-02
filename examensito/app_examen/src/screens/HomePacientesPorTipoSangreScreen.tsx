import React, { useState } from "react";
import { View, StyleSheet, Text, FlatList, TextInput, ActivityIndicator } from "react-native";
import { usePacientesPorTipoSangre } from "../hooks/usePacientesData";
import { PacientesActivos } from "../interfaces/pacientesInterface";

export const HomePacientesPorTipoSangreScreen = () => {
    const { pacientes, isLoading, loadPacientes } = usePacientesPorTipoSangre();
    const [tipoSangre, setTipoSangre] = useState<string>("");
    const [searched, setSearched] = useState<boolean>(false);

    const handleSearch = () => {
        if (tipoSangre.trim()) {
            setSearched(true);
            loadPacientes(tipoSangre);
        }
    };

    return (
        <View style={style.root}>
            <View style={style.searchContainer}>
                <TextInput
                    style={style.input}
                    placeholder="Ej: O+, A-, B+, AB"
                    placeholderTextColor="#9CA3AF"
                    value={tipoSangre}
                    onChangeText={setTipoSangre}
                />
                <View style={style.buttonContainer}>
                    <Text 
                        style={style.button}
                        onPress={handleSearch}
                    >
                        Buscar
                    </Text>
                </View>
            </View>

            {isLoading ? (
                <View style={style.containerLoading}>
                    <ActivityIndicator size={60} color="#3B82F6" />
                </View>
            ) : searched && pacientes.length === 0 ? (
                <View style={style.emptyContainer}>
                    <Text style={style.emptyText}>No se encontraron pacientes</Text>
                </View>
            ) : (
                <FlatList
                    data={pacientes}
                    keyExtractor={(item) => `${item.id_paciente}`}
                    renderItem={({ item }) => (
                        <View style={style.card}>
                            <Text style={style.nombre}>
                                {item.nombre} {item.apellido}
                            </Text>
                            <Text style={style.detail}>
                                Tipo de sangre: <Text style={style.detailValue}>{item.tipo_sangre}</Text>
                            </Text>
                            <Text style={style.detail}>
                                Teléfono: <Text style={style.detailValue}>{item.telefono || "N/A"}</Text>
                            </Text>
                            <Text style={[style.detail, { marginBottom: 0 }]}>
                                Estado: <Text style={[style.detailValue, { color: item.activo ? '#10B981' : '#EF4444' }]}>
                                    {item.activo ? 'Activo' : 'Inactivo'}
                                </Text>
                            </Text>
                        </View>
                    )}
                    contentContainerStyle={style.listContent}
                    scrollEnabled={true}
                />
            )}
        </View>
    );
};

const style = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#F8F9FB',
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        gap: 8,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 14,
        backgroundColor: '#FFFFFF',
        color: '#1F2937',
    },
    buttonContainer: {
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#3B82F6',
        color: '#FFFFFF',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
        fontWeight: '600',
        fontSize: 14,
        overflow: 'hidden',
        textAlign: 'center',
    },
    containerLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#9CA3AF',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#3B82F6',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    nombre: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 8,
    },
    detail: {
        fontSize: 13,
        color: '#6B7280',
        marginBottom: 6,
    },
    detailValue: {
        fontWeight: '600',
        color: '#1F2937',
    },
    listContent: {
        paddingBottom: 20,
    },
});
