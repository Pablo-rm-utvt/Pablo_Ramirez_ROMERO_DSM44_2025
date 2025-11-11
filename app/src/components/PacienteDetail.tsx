import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

interface Props {
    paciente: {
        nombre: string;
        apellido: string;
        email: string;
        telefono: string;
        direccion: string;
        fecha_nacimiento: string;
        area: string;
    };
}

export const PacienteDetail = ({ paciente }: Props) => {
    const nombreCompleto = `${paciente?.nombre || ''} ${paciente?.apellido || ''}`.trim();
    
    return (
        <ScrollView style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.title}>Información Personal</Text>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Nombre:</Text>
                    <Text style={styles.value}>{nombreCompleto || 'No disponible'}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Área:</Text>
                    <Text style={styles.value}>{paciente?.area || 'No asignada'}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Fecha de Nacimiento:</Text>
                    <Text style={styles.value}>{paciente?.fecha_nacimiento || 'No disponible'}</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.title}>Información de Contacto</Text>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.value}>{paciente?.email || 'No disponible'}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Teléfono:</Text>
                    <Text style={styles.value}>{paciente?.telefono || 'No disponible'}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Dirección:</Text>
                    <Text style={styles.value}>{paciente?.direccion || 'No disponible'}</Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    section: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 16,
    },
    infoRow: {
        flexDirection: 'row',
        paddingVertical: 8,
        alignItems: 'flex-start',
    },
    label: {
        width: 120,
        fontSize: 14,
        fontWeight: '600',
        color: '#7f8c8d',
    },
    value: {
        flex: 1,
        fontSize: 14,
        color: '#2c3e50',
    },
});