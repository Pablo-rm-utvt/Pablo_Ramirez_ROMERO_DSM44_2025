import React from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "../navigator/PacientesNavigator";
import { PacientesActivos } from "../interfaces/pacientesInterface";
import { COLORS } from "../theme/globalStyles";

interface Props {
    paciente: PacientesActivos;
}

export const PacientesCard = ({ paciente }: Props) => {
    const widthDimension = Dimensions.get('window').width;

    type PacientesCardNavigationProp = StackNavigationProp<RootStackParams, 'PacienteHome'>;
    const navigation = useNavigation<PacientesCardNavigationProp>();

    const getColorBySangre = (sangre: string) => {
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
    };

    const accentColor = getColorBySangre(paciente.tipo_sangre);

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("PacienteHome", { paciente })}
            activeOpacity={0.7}
        >
            <View style={[styles.cardContainer, { width: widthDimension * 0.45 }]}>
                <View style={[styles.colorBar, { backgroundColor: accentColor }]} />
                <View style={styles.contentWrapper}>
                    <View style={styles.headerInfo}>
                        <View style={[styles.iniciales, { backgroundColor: accentColor }]}>
                            <Text style={styles.inicialesText}>
                                {paciente.nombre.charAt(0)}{paciente.apellido.charAt(0)}
                            </Text>
                        </View>
                        <View style={styles.infoStack}>
                            <Text style={styles.nombre} numberOfLines={1}>
                                {paciente.nombre}
                            </Text>
                            <Text style={styles.apellido} numberOfLines={1}>
                                {paciente.apellido}
                            </Text>
                        </View>
                    </View>

                    {/* Separador */}
                    <View style={styles.separator} />
                    <View style={styles.footer}>
                        <View style={[styles.badge, { backgroundColor: accentColor + '15' }]}>
                            <Text style={[styles.tipoSangre, { color: accentColor }]}>
                                {paciente.tipo_sangre}
                            </Text>
                        </View>
                        <Text style={styles.arrow}>→</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 8,
        marginVertical: 10,
        borderRadius: 12,
        backgroundColor: COLORS.white,
        overflow: "hidden",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
        elevation: 5,
    },
    colorBar: {
        height: 5,
        width: '100%',
    },
    contentWrapper: {
        paddingHorizontal: 14,
        paddingVertical: 14,
    },
    headerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    iniciales: {
        width: 40,
        height: 40,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    inicialesText: {
        fontSize: 16,
        fontWeight: '800',
        color: COLORS.white,
        letterSpacing: 0.5,
    },
    infoStack: {
        flex: 1,
    },
    nombre: {
        fontSize: 15,
        fontWeight: '800',
        color: COLORS.gray900,
        marginBottom: 3,
        letterSpacing: 0.3,
    },
    apellido: {
        fontSize: 13,
        fontWeight: '500',
        color: COLORS.gray600,
        letterSpacing: 0.2,
    },
    separator: {
        height: 1,
        backgroundColor: COLORS.gray200,
        marginVertical: 10,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 6,
    },
    tipoSangre: {
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 0.4,
    },
    arrow: {
        fontSize: 18,
        color: COLORS.gray400,
        fontWeight: '300',
    }
});


