import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { Clinica } from '../interfaces/clinicaInterfaces';

type Props = {
    paciente: Clinica;
    onPress?: () => void;
};

export const PacienteCard: React.FC<Props> = ({ paciente, onPress }) => {

    return (
        <View style={styles.card}>
            <TouchableOpacity
                onPress={onPress}
                style={styles.mainContent}
            >
                <View style={styles.rowContainer}>
                    {paciente.foto_paciente ? (
                        <Image
                            source={{ uri: `data:image/jpeg;base64,${paciente.foto_paciente}` }}
                            style={styles.avatar}
                        />
                    ) : (
                        <View style={[styles.avatar, styles.avatarPlaceholder]}>
                            <Text style={styles.avatarText}>
                                {paciente.nombre_paciente?.charAt(0)?.toUpperCase() || 'P'}
                            </Text>
                        </View>
                    )}
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{paciente.nombre_paciente}</Text>
                        {paciente.fecha_ingreso && (
                            <Text style={styles.subtitle}>
                                Ingreso: {paciente.fecha_ingreso instanceof Date 
                                    ? paciente.fecha_ingreso.toLocaleDateString()
                                    : new Date(paciente.fecha_ingreso).toLocaleDateString()}
                            </Text>
                        )}
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        marginBottom: 1,
    },
    mainContent: {
        padding: 12,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textContainer: {
        marginLeft: 12,
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    subtitle: {
        fontSize: 13,
        color: '#555',
        marginTop: 2,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    avatarPlaceholder: {
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },

});