import React, { useEffect } from "react";
import { View, StyleSheet, FlatList, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { usePacientesActivos } from "../hooks/usePacientesData";
import { PacientesCard } from "../components/PacientesCard";
import { COLORS, globalStyles } from "../theme/globalStyles";

export const PacientesScreens = () => {
    const { pacientes, isLoading, cargarPacientes } = usePacientesActivos();
    const navigation = useNavigation<any>();

    useEffect(() => {
        cargarPacientes();
    }, [cargarPacientes]);

    return (
        <View style={styles.root}>
            <FlatList
                data={pacientes}
                keyExtractor={(paciente, index) => `${paciente.id_paciente}${index}`}
                ListHeaderComponent={(
                    <View>
                        <View style={styles.headerContainer}>
                            <View style={styles.headerGradient}>
                                <Text style={styles.headerTitle}>Pacientes</Text>
                                <Text style={styles.headerSubtitle}>Gestión de Salud</Text>
                            </View>
                        </View>

                        <View style={styles.actionBar}>
                            <View style={styles.statCard}>
                                <Text style={styles.statNumber}>{pacientes.length}</Text>
                                <Text style={styles.statLabel}>Pacientes Activos</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.buttonAgregar}
                                onPress={() => navigation.navigate('CrearPaciente')}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.buttonText}>+ Nuevo Paciente</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.sectionSpacer} />
                    </View>
                )}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 12 }}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <PacientesCard paciente={item} />
                )}
                onEndReached={cargarPacientes}
                onEndReachedThreshold={0.3}
                ListEmptyComponent={(
                    <View style={[globalStyles.centerLoading, { marginTop: 100 }]}>
                        <Text style={styles.emptyText}>Sin pacientes registrados</Text>
                    </View>
                )}
                ListFooterComponent={(
                    isLoading && pacientes.length > 0 ? (
                        <View style={styles.loadingFooter}>
                            <ActivityIndicator size={40} color={COLORS.primary} />
                        </View>
                    ) : null
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: COLORS.gray50,
    },
    headerContainer: {
        backgroundColor: COLORS.primary,
        paddingTop: 24,
        paddingBottom: 32,
    },
    headerGradient: {
        paddingHorizontal: 20,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: '800',
        color: COLORS.white,
        letterSpacing: -0.5,
        marginBottom: 6,
    },
    headerSubtitle: {
        fontSize: 14,
        color: COLORS.primaryLight,
        fontWeight: '500',
        letterSpacing: 0.3,
    },
    actionBar: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 16,
        gap: 12,
        alignItems: 'center',
    },
    statCard: {
        flex: 1,
        backgroundColor: COLORS.white,
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderLeftWidth: 4,
        borderLeftColor: COLORS.primary,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    statNumber: {
        fontSize: 24,
        fontWeight: '800',
        color: COLORS.primary,
        letterSpacing: -0.3,
    },
    statLabel: {
        fontSize: 11,
        color: COLORS.gray600,
        fontWeight: '600',
        marginTop: 4,
        letterSpacing: 0.2,
        textTransform: 'uppercase',
    },
    buttonAgregar: {
        backgroundColor: COLORS.secondary,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 10,
        justifyContent: 'center',
        shadowColor: COLORS.secondary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonText: {
        color: COLORS.white,
        fontWeight: '800',
        fontSize: 12,
        letterSpacing: 0.3,
    },
    sectionSpacer: {
        height: 4,
    },
    listContent: {
        paddingHorizontal: 8,
        paddingBottom: 20,
    },
    emptyText: {
        fontSize: 16,
        color: COLORS.gray500,
        fontWeight: '500',
        letterSpacing: 0.2,
    },
    loadingFooter: {
        paddingVertical: 24,
        alignItems: 'center',
    },
});
