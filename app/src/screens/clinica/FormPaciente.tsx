import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useClinicaApi } from '../../hooks/useClinicaApi';
import { useImagePicker } from '../../hooks/useImagePicker';
import { Clinica } from '../../interfaces/clinicaInterfaces';

interface Props extends StackScreenProps<any, any> { }

export const FormPaciente = ({ route, navigation }: Props) => {
    const { createPaciente, updatePaciente, pacientes } = useClinicaApi();
    const { pickImage } = useImagePicker();
    const pacienteToEdit = route.params?.pacienteId
        ? pacientes.find(p => p.id === route.params?.pacienteId)
        : undefined;

    const handleImagePick = async (field: keyof Pick<Clinica,
        'foto_paciente' | 'radiografia_torax' | 'electrocardiograma' |
        'analisis_sangre' | 'resonancia_magnetica' | 'tomografia' | 'foto_herida'
    >) => {
        const result = await pickImage();
        if (result) {
            setFormData({ ...formData, [field]: result });
        }
    };

    const initialDate = new Date();
    const [formData, setFormData] = useState<Partial<Clinica>>({
        nombre_paciente: pacienteToEdit?.nombre_paciente || '',
        edad: pacienteToEdit?.edad || 0,
        sexo: pacienteToEdit?.sexo || '',
        estado_civil: pacienteToEdit?.estado_civil || '',
        curp: pacienteToEdit?.curp || '',
        domicilio: pacienteToEdit?.domicilio || '',
        telefono: pacienteToEdit?.telefono || '',
        correo_electronico: pacienteToEdit?.correo_electronico || '',
        fecha_ingreso: pacienteToEdit?.fecha_ingreso || initialDate,
        diagnostico_inicial: pacienteToEdit?.diagnostico_inicial || '',
        enfermedades_previas: pacienteToEdit?.enfermedades_previas || '',
        medicamentos_actuales: pacienteToEdit?.medicamentos_actuales || '',
        alergias: pacienteToEdit?.alergias || '',
        medico_asignado: pacienteToEdit?.medico_asignado || '',
        area_internamiento: pacienteToEdit?.area_internamiento || '',
        presion_arterial: pacienteToEdit?.presion_arterial || '',
        frecuencia_cardiaca: pacienteToEdit?.frecuencia_cardiaca || 0,
        temperatura_corporal: pacienteToEdit?.temperatura_corporal || 0,
        saturacion_oxigeno: pacienteToEdit?.saturacion_oxigeno || 0,
        notas_evolucion: pacienteToEdit?.notas_evolucion || '',
        firma_medico: pacienteToEdit?.firma_medico || '',
        fecha_alta: pacienteToEdit?.fecha_alta || initialDate,
        grupo_sanguineo: pacienteToEdit?.grupo_sanguineo || '',
        foto_paciente: pacienteToEdit?.foto_paciente || '',
        radiografia_torax: pacienteToEdit?.radiografia_torax || '',
        electrocardiograma: pacienteToEdit?.electrocardiograma || '',
        analisis_sangre: pacienteToEdit?.analisis_sangre || '',
        resonancia_magnetica: pacienteToEdit?.resonancia_magnetica || '',
        tomografia: pacienteToEdit?.tomografia || '',
        foto_herida: pacienteToEdit?.foto_herida || '',
    });

    const handleSubmit = async () => {
        // Validación de campos requeridos
        const camposRequeridos = [
            'nombre_paciente',
            'edad',
            'curp',
            'medico_asignado',
            'area_internamiento'
        ];

        const camposFaltantes = camposRequeridos.filter(campo => !formData[campo as keyof Clinica]);

        if (camposFaltantes.length > 0) {
            Alert.alert('Error', `Los siguientes campos son requeridos:\n${camposFaltantes.join('\n')}`);
            return;
        }

        const success = pacienteToEdit
            ? await updatePaciente(pacienteToEdit.id, formData)
            : await createPaciente(formData as Omit<Clinica, 'id'>);

        if (success) {
            navigation.goBack();
        } else {
            Alert.alert('Error', 'No se pudo guardar el paciente');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.formContainer}>
                {/* Información Personal */}
                <Text style={styles.sectionTitle}>Información Personal</Text>

                <Text style={styles.label}>Nombre del Paciente *</Text>
                <TextInput
                    style={styles.input}
                    value={formData.nombre_paciente}
                    onChangeText={(value) => setFormData({ ...formData, nombre_paciente: value })}
                />

                <Text style={styles.label}>Edad *</Text>
                <TextInput
                    style={styles.input}
                    value={formData.edad?.toString()}
                    keyboardType="numeric"
                    onChangeText={(value) => setFormData({ ...formData, edad: parseInt(value) || 0 })}
                />

                <Text style={styles.label}>Sexo</Text>
                <TextInput
                    style={styles.input}
                    value={formData.sexo}
                    onChangeText={(value) => setFormData({ ...formData, sexo: value })}
                />

                <Text style={styles.label}>Estado Civil</Text>
                <TextInput
                    style={styles.input}
                    value={formData.estado_civil}
                    onChangeText={(value) => setFormData({ ...formData, estado_civil: value })}
                />

                <Text style={styles.label}>CURP *</Text>
                <TextInput
                    style={styles.input}
                    value={formData.curp}
                    onChangeText={(value) => setFormData({ ...formData, curp: value })}
                />

                <Text style={styles.label}>Domicilio</Text>
                <TextInput
                    style={styles.input}
                    value={formData.domicilio}
                    onChangeText={(value) => setFormData({ ...formData, domicilio: value })}
                />

                <Text style={styles.label}>Teléfono</Text>
                <TextInput
                    style={styles.input}
                    value={formData.telefono}
                    keyboardType="phone-pad"
                    onChangeText={(value) => setFormData({ ...formData, telefono: value })}
                />

                <Text style={styles.label}>Correo Electrónico</Text>
                <TextInput
                    style={styles.input}
                    value={formData.correo_electronico}
                    keyboardType="email-address"
                    onChangeText={(value) => setFormData({ ...formData, correo_electronico: value })}
                />

                {/* Información Médica */}
                <Text style={styles.sectionTitle}>Información Médica</Text>

                <Text style={styles.label}>Diagnóstico Inicial</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    value={formData.diagnostico_inicial}
                    onChangeText={(value) => setFormData({ ...formData, diagnostico_inicial: value })}
                    multiline
                />

                <Text style={styles.label}>Enfermedades Previas</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    value={formData.enfermedades_previas}
                    onChangeText={(value) => setFormData({ ...formData, enfermedades_previas: value })}
                    multiline
                />

                <Text style={styles.label}>Medicamentos Actuales</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    value={formData.medicamentos_actuales}
                    onChangeText={(value) => setFormData({ ...formData, medicamentos_actuales: value })}
                    multiline
                />

                <Text style={styles.label}>Alergias</Text>
                <TextInput
                    style={styles.input}
                    value={formData.alergias}
                    onChangeText={(value) => setFormData({ ...formData, alergias: value })}
                />

                <Text style={styles.label}>Grupo Sanguíneo</Text>
                <TextInput
                    style={styles.input}
                    value={formData.grupo_sanguineo}
                    onChangeText={(value) => setFormData({ ...formData, grupo_sanguineo: value })}
                />

                {/* Información de Hospitalización */}
                <Text style={styles.sectionTitle}>Información de Hospitalización</Text>

                <Text style={styles.label}>Médico Asignado *</Text>
                <TextInput
                    style={styles.input}
                    value={formData.medico_asignado}
                    onChangeText={(value) => setFormData({ ...formData, medico_asignado: value })}
                />

                <Text style={styles.label}>Área de Internamiento *</Text>
                <TextInput
                    style={styles.input}
                    value={formData.area_internamiento}
                    onChangeText={(value) => setFormData({ ...formData, area_internamiento: value })}
                />

                {/* Signos Vitales */}
                <Text style={styles.sectionTitle}>Signos Vitales</Text>

                <Text style={styles.label}>Presión Arterial</Text>
                <TextInput
                    style={styles.input}
                    value={formData.presion_arterial}
                    keyboardType='number-pad'
                    onChangeText={(value) => setFormData({ ...formData, presion_arterial: value })}
                />

                <Text style={styles.label}>Frecuencia Cardíaca</Text>
                <TextInput
                    style={styles.input}
                    value={formData.frecuencia_cardiaca?.toString()}
                    keyboardType="numeric"
                    onChangeText={(value) => setFormData({ ...formData, frecuencia_cardiaca: parseInt(value) || 0 })}
                />

                <Text style={styles.label}>Temperatura Corporal</Text>
                <TextInput
                    style={styles.input}
                    value={formData.temperatura_corporal?.toString()}
                    keyboardType="numeric"
                    onChangeText={(value) => setFormData({ ...formData, temperatura_corporal: parseFloat(value) || 0 })}
                />

                <Text style={styles.label}>Saturación de Oxígeno</Text>
                <TextInput
                    style={styles.input}
                    value={formData.saturacion_oxigeno?.toString()}
                    keyboardType="numeric"
                    onChangeText={(value) => setFormData({ ...formData, saturacion_oxigeno: parseInt(value) || 0 })}
                />

                <Text style={styles.label}>Notas de Evolución</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    value={formData.notas_evolucion}
                    onChangeText={(value) => setFormData({ ...formData, notas_evolucion: value })}
                    multiline
                />

                {/* Sección de Imágenes y Estudios */}
                <Text style={styles.sectionTitle}>Imágenes y Estudios Médicos</Text>

                <View style={styles.imageSection}>
                    <TouchableOpacity
                        style={styles.imageButton}
                        onPress={() => handleImagePick('foto_paciente')}
                    >
                        <Text style={styles.label}>Foto del Paciente</Text>
                        {formData.foto_paciente && (
                            <Image
                                source={{ uri: `data:image/jpeg;base64,${formData.foto_paciente}` }}
                                style={styles.previewImage}
                            />
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.imageButton}
                        onPress={() => handleImagePick('radiografia_torax')}
                    >
                        <Text style={styles.label}>Radiografía de Tórax</Text>
                        {formData.radiografia_torax && (
                            <Image
                                source={{ uri: `data:image/jpeg;base64,${formData.radiografia_torax}` }}
                                style={styles.previewImage}
                            />
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.imageButton}
                        onPress={() => handleImagePick('electrocardiograma')}
                    >
                        <Text style={styles.label}>Electrocardiograma</Text>
                        {formData.electrocardiograma && (
                            <Image
                                source={{ uri: `data:image/jpeg;base64,${formData.electrocardiograma}` }}
                                style={styles.previewImage}
                            />
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.imageButton}
                        onPress={() => handleImagePick('analisis_sangre')}
                    >
                        <Text style={styles.label}>Análisis de Sangre</Text>
                        {formData.analisis_sangre && (
                            <Image
                                source={{ uri: `data:image/jpeg;base64,${formData.analisis_sangre}` }}
                                style={styles.previewImage}
                            />
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.imageButton}
                        onPress={() => handleImagePick('resonancia_magnetica')}
                    >
                        <Text style={styles.label}>Resonancia Magnética</Text>
                        {formData.resonancia_magnetica && (
                            <Image
                                source={{ uri: `data:image/jpeg;base64,${formData.resonancia_magnetica}` }}
                                style={styles.previewImage}
                            />
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.imageButton}
                        onPress={() => handleImagePick('tomografia')}
                    >
                        <Text style={styles.label}>Tomografía</Text>
                        {formData.tomografia && (
                            <Image
                                source={{ uri: `data:image/jpeg;base64,${formData.tomografia}` }}
                                style={styles.previewImage}
                            />
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.imageButton}
                        onPress={() => handleImagePick('foto_herida')}
                    >
                        <Text style={styles.label}>Foto de Herida</Text>
                        {formData.foto_herida && (
                            <Image
                                source={{ uri: `data:image/jpeg;base64,${formData.foto_herida}` }}
                                style={styles.previewImage}
                            />
                        )}
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}
                >
                    <Text style={styles.buttonText}>
                        {pacienteToEdit ? 'Actualizar' : 'Guardar'} Paciente
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    formContainer: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginTop: 20,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#bdc3c7',
        paddingBottom: 5,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: '600',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        fontSize: 16,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 30,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    imageSection: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    imageButton: {
        width: '48%',
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 8,
        marginBottom: 15,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        minHeight: 100,
    },
    previewImage: {
        width: '100%',
        height: 150,
        marginTop: 10,
        borderRadius: 5,
        resizeMode: 'cover',
    },
});