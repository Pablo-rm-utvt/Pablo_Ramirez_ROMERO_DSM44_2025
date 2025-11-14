import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { PacienteActions } from '../../components/PacienteActions';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigator/types';

type Props = StackScreenProps<RootStackParamList, 'PacienteDetail'>;

export const PacienteDetail = ({ route, navigation }: Props) => {
    const { paciente } = route.params;

    const handleEdit = (id: string | number) => {
        navigation.navigate('FormPaciente', { pacienteId: id });
    };

    const handleDelete = async (id: string | number) => {
        try {
            const baseUrl = 'http://10.45.20.13:3000/api';
            const response = await fetch(`${baseUrl}/clinica/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const text = await response.text();
                throw new Error(`Error al eliminar el paciente: ${response.status} ${text}`);
            }
            navigation.goBack();
        } catch (error) {
            console.error('Error al eliminar el paciente:', error);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
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
                <Text style={styles.name}>{paciente.nombre_paciente}</Text>
            </View>

            <View style={styles.infoSection}>
                <Text style={styles.sectionTitle}>Información del Paciente</Text>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>ID:</Text>
                    <Text style={styles.value}>{paciente.id}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>Edad:</Text>
                    <Text style={styles.value}>{paciente.edad} años</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>Sexo:</Text>
                    <Text style={styles.value}>{paciente.sexo}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>Estado Civil:</Text>
                    <Text style={styles.value}>{paciente.estado_civil}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>CURP:</Text>
                    <Text style={styles.value}>{paciente.curp}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>Domicilio:</Text>
                    <Text style={styles.value}>{paciente.domicilio}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>Teléfono:</Text>
                    <Text style={styles.value}>{paciente.telefono}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>Correo:</Text>
                    <Text style={styles.value}>{paciente.correo_electronico}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>Fecha de Ingreso:</Text>
                    <Text style={styles.value}>
                        {new Date(paciente.fecha_ingreso).toLocaleDateString()}
                    </Text>
                </View>

                <View style={styles.infoSection}>
                    <Text style={styles.sectionTitle}>Información Médica</Text>

                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Diagnóstico:</Text>
                        <Text style={styles.value}>{paciente.diagnostico_inicial}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Enfermedades:</Text>
                        <Text style={styles.value}>{paciente.enfermedades_previas}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Medicamentos:</Text>
                        <Text style={styles.value}>{paciente.medicamentos_actuales}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Alergias:</Text>
                        <Text style={styles.value}>{paciente.alergias}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Médico:</Text>
                        <Text style={styles.value}>{paciente.medico_asignado}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Área:</Text>
                        <Text style={styles.value}>{paciente.area_internamiento}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Grupo Sanguíneo:</Text>
                        <Text style={styles.value}>{paciente.grupo_sanguineo}</Text>
                    </View>
                </View>

                <View style={styles.infoSection}>
                    <Text style={styles.sectionTitle}>Signos Vitales</Text>

                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Presión:</Text>
                        <Text style={styles.value}>{paciente.presion_arterial}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Frec. Cardíaca:</Text>
                        <Text style={styles.value}>{paciente.frecuencia_cardiaca} bpm</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Temperatura:</Text>
                        <Text style={styles.value}>{paciente.temperatura_corporal}°C</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Saturación O2:</Text>
                        <Text style={styles.value}>{paciente.saturacion_oxigeno}%</Text>
                    </View>
                </View>

                {paciente.notas_evolucion && (
                    <View style={styles.infoSection}>
                        <Text style={styles.sectionTitle}>Notas de Evolución</Text>
                        <Text style={styles.value}>{paciente.notas_evolucion}</Text>
                    </View>
                )}
            </View>

            <View style={styles.actionsContainer}>
                <PacienteActions
                    id={paciente.id}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: 'white',
        padding: 20,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    avatarPlaceholder: {
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    infoSection: {
        backgroundColor: 'white',
        marginTop: 20,
        padding: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 15,
    },
    infoRow: {
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    label: {
        flex: 1,
        fontSize: 16,
        color: '#666',
    },
    value: {
        flex: 2,
        fontSize: 16,
        color: '#333',
    },
    actionsContainer: {
        marginTop: 20,
        marginBottom: 30,
    },
});