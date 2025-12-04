import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Text, ActivityIndicator, RefreshControl } from "react-native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { PatientDrawerParams } from "../navigator/PatientDrawerNavigator";
import { usePacienteCompleto } from "../hooks/usePacientesData";
import { COLORS, globalStyles } from "../theme/globalStyles";

type Props = DrawerScreenProps<PatientDrawerParams, 'InformacionPaciente'>;

export const PacienteHomeScreen = ({ route }: Props) => {
    const { paciente: pacienteInitial } = route.params;
    const { paciente, isLoading, loadPacienteData } = usePacienteCompleto();
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (pacienteInitial?.id_paciente) {
            loadPacienteData(pacienteInitial.id_paciente);
        }
    }, [pacienteInitial?.id_paciente]);

    const onRefresh = async () => {
        setRefreshing(true);
        if (pacienteInitial?.id_paciente) {
            await loadPacienteData(pacienteInitial.id_paciente);
        }
        setRefreshing(false);
    };

    if (isLoading) {
        return (
            <View style={[globalStyles.container, globalStyles.centerLoading]}>
                <ActivityIndicator size={50} color={COLORS.primary} />
            </View>
        );
    }

    const p = paciente || pacienteInitial;
    const colorBySangre = getColorBySangre(p.tipo_sangre);

    return (
        <ScrollView
            style={styles.root}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    tintColor={COLORS.primary}
                    progressBackgroundColor={COLORS.white}
                />
            }
        >
            <View style={[styles.headerCard, { borderLeftColor: colorBySangre }]}>
                <View style={styles.headerTop}>
                    <View style={[styles.avatarLarge, { backgroundColor: colorBySangre }]}>
                        <Text style={styles.avatarText}>
                            {p.nombre.charAt(0)}{p.apellido.charAt(0)}
                        </Text>
                    </View>
                    <View style={styles.headerInfo}>
                        <Text style={styles.nombreCompleto}>{p.nombre}</Text>
                        <Text style={styles.apellidoCompleto}>{p.apellido}</Text>
                        <Text style={styles.idPaciente}>ID: {p.id_paciente}</Text>
                    </View>
                </View>

                <View style={styles.badgesRow}>
                    <View style={[styles.estatusBadge, p.activo ? styles.activoBadge : styles.inactivoBadge]}>
                        <Text style={styles.estatusText}>
                            {p.activo ? '● Activo' : '● Inactivo'}
                        </Text>
                    </View>
                    <View style={[styles.tipoSangreBadge, { backgroundColor: colorBySangre + '20' }]}>
                        <Text style={[styles.tipoSangreText, { color: colorBySangre }]}>
                            {p.tipo_sangre}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>📋 Información Personal</Text>
                </View>

                <DetailItem
                    label="Fecha Nacimiento"
                    value={p.fecha_nacimiento || "N/A"}
                />

                <DetailItem
                    label="Sexo"
                    value={p.sexo === 'M' ? 'Masculino' : p.sexo === 'F' ? 'Femenino' : 'N/A'}
                />

                <DetailItem
                    label="Teléfono"
                    value={p.telefono || "N/A"}
                />

                <DetailItem
                    label="Dirección"
                    value={p.direccion || "N/A"}
                    isLast
                />
            </View>

            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>🏥 Información Médica</Text>
                </View>

                <DetailItem
                    label="Alergias"
                    value={p.alergias || "Sin alergias conocidas"}
                    isLast
                />
            </View>

            <View style={{ height: 100 }} />
        </ScrollView>
    );
};

interface DetailItemProps {
    label: string;
    value: string;
    highlight?: boolean;
    isLast?: boolean;
}

const DetailItem = ({ label, value, highlight, isLast }: DetailItemProps) => (
    <View style={[styles.detailRow, !isLast && styles.detailRowBorder]}>
        <Text style={styles.label}>{label}</Text>
        <Text style={[styles.value, highlight && styles.valueHighlight]}>
            {value}
        </Text>
    </View>
);

function getColorBySangre(sangre: string) {
    const sangres: { [key: string]: string } = {
        'O+': COLORS.primary,
        'O-': COLORS.secondary,
        'A+': COLORS.tertiary,
        'A-': COLORS.warning,
        'B+': COLORS.primary,
        'B-': COLORS.secondary,
        'AB+': COLORS.tertiary,
        'AB-': COLORS.warning,
    };
    return sangres[sangre] || COLORS.primary;
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: COLORS.gray50,
    },
    headerCard: {
        backgroundColor: COLORS.white,
        borderLeftWidth: 5,
        paddingHorizontal: 16,
        paddingVertical: 18,
        marginHorizontal: 12,
        marginTop: 12,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 14,
    },
    avatarLarge: {
        width: 52,
        height: 52,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    avatarText: {
        fontSize: 18,
        fontWeight: '800',
        color: COLORS.white,
        letterSpacing: 0.5,
    },
    headerInfo: {
        flex: 1,
    },
    nombreCompleto: {
        fontSize: 20,
        fontWeight: '800',
        color: COLORS.gray900,
        letterSpacing: -0.3,
        marginBottom: 2,
    },
    apellidoCompleto: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.gray700,
        letterSpacing: 0.2,
        marginBottom: 4,
    },
    idPaciente: {
        fontSize: 11,
        color: COLORS.gray500,
        fontWeight: '600',
        letterSpacing: 0.3,
        textTransform: 'uppercase',
    },
    badgesRow: {
        flexDirection: 'row',
        gap: 10,
    },
    estatusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
    },
    activoBadge: {
        backgroundColor: COLORS.tertiaryLight,
    },
    inactivoBadge: {
        backgroundColor: COLORS.gray100,
    },
    estatusText: {
        fontSize: 12,
        fontWeight: '700',
        color: COLORS.tertiary,
        letterSpacing: 0.3,
    },
    tipoSangreBadge: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
    },
    tipoSangreText: {
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 0.3,
    },
    section: {
        backgroundColor: COLORS.white,
        borderRadius: 12,
        marginHorizontal: 12,
        marginVertical: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 2,
    },
    sectionHeader: {
        marginBottom: 12,
        paddingBottom: 10,
        borderBottomWidth: 2,
        borderBottomColor: COLORS.gray100,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: COLORS.gray900,
        letterSpacing: -0.2,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    detailRowBorder: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.gray100,
    },
    label: {
        fontSize: 13,
        fontWeight: '600',
        color: COLORS.gray700,
        flex: 0.35,
        letterSpacing: 0.2,
    },
    value: {
        fontSize: 13,
        fontWeight: '700',
        color: COLORS.gray900,
        flex: 0.65,
        textAlign: 'right',
        letterSpacing: 0.1,
    },
    valueHighlight: {
        color: COLORS.primary,
        backgroundColor: COLORS.primaryLight,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        textAlign: 'center',
    },
});
