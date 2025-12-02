import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    Alert,
    Modal,
    FlatList,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFormPaciente, useFormCita, useFormTratamiento, useFormMedicamento } from "../hooks/useFormPaciente";
import { usePacientesActivos } from "../hooks/usePacientesData";

export const CrearPacienteScreen = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const [activeTab, setActiveTab] = useState<"paciente" | "tratamiento" | "medicamento" | "listar">("paciente");
    const [idPacienteCreado, setIdPacienteCreado] = useState<number | null>(null);
    const [modoEdicion, setModoEdicion] = useState<boolean>(false);
    const [itemSeleccionado, setItemSeleccionado] = useState<any>(null);

    const { pacientes, loadPacientes, isLoading: isLoadingPacientes } = usePacientesActivos();

    useEffect(() => {
        loadPacientes(true);
    }, [loadPacientes]);

    const {
        state: statePaciente,
        isLoading: isLoadingPaciente,
        handleInputChange: handlePacienteChange,
        handleSubmit: handlePacienteSubmit,
        resetForm: resetPacienteForm,
        setFormData: setPacienteFormData,
        handleDelete: deletePaciente,
    } = useFormPaciente();

    const handleCreatePaciente = async () => {
        if (!statePaciente.nombre || !statePaciente.apellido || !statePaciente.fecha_nacimiento) {
            Alert.alert("Validación", "Por favor completa los campos obligatorios");
            return;
        }

        try {
            const result = await handlePacienteSubmit();
            Alert.alert("Éxito", modoEdicion ? "Paciente actualizado correctamente" : "Paciente creado correctamente");
            setIdPacienteCreado(result.id_paciente || result.id);
            resetPacienteForm();
            setModoEdicion(false);
            setActiveTab("listar");
            await loadPacientes(true);
        } catch (error) {
            Alert.alert("Error", "No se pudo crear/actualizar el paciente");
        }
    };

    const handleEliminarPaciente = async () => {
        try {
            await deletePaciente();
            resetPacienteForm();
            setModoEdicion(false);
            setActiveTab("paciente");
            await loadPacientes(true);
        } catch (error) {
            Alert.alert("Error", "No se pudo eliminar el paciente");
        }
    };

    const handleEditarPaciente = (paciente: any) => {
        setPacienteFormData({
            id_paciente: paciente.id_paciente,
            nombre: paciente.nombre,
            apellido: paciente.apellido,
            fecha_nacimiento: paciente.fecha_nacimiento,
            sexo: paciente.sexo,
            telefono: paciente.telefono,
            direccion: paciente.direccion,
            tipo_sangre: paciente.tipo_sangre,
            alergias: paciente.alergias,
        });
        setModoEdicion(true);
        setIdPacienteCreado(paciente.id_paciente);
        setActiveTab("paciente");
    };

    const {
        state: stateTratamiento,
        isLoading: isLoadingTratamiento,
        handleInputChange: handleTratamientoChange,
        handleSubmit: handleTratamientoSubmit,
        resetForm: resetTratamientoForm,
        setFormData: setTratamientoFormData,
        handleDelete: deleteTratamiento,
    } = useFormTratamiento(idPacienteCreado || 0);

    const handleCreateTratamiento = async () => {
        if (!stateTratamiento.diagnostico || !stateTratamiento.medicamento || !stateTratamiento.dosis) {
            Alert.alert("Validación", "Por favor completa los campos obligatorios");
            return;
        }

        try {
            await handleTratamientoSubmit();
            Alert.alert("Éxito", modoEdicion ? "Tratamiento actualizado correctamente" : "Tratamiento creado correctamente");
            resetTratamientoForm();
            setModoEdicion(false);
        } catch (error) {
            Alert.alert("Error", "No se pudo crear/actualizar el tratamiento");
        }
    };

    const handleEliminarTratamiento = async () => {
        try {
            await deleteTratamiento();
            resetTratamientoForm();
            setModoEdicion(false);
        } catch (error) {
            Alert.alert("Error", "No se pudo eliminar el tratamiento");
        }
    };

    const {
        state: stateMedicamento,
        isLoading: isLoadingMedicamento,
        handleInputChange: handleMedicamentoChange,
        handleSubmit: handleMedicamentoSubmit,
        resetForm: resetMedicamentoForm,
        setFormData: setMedicamentoFormData,
        handleDelete: deleteMedicamento,
    } = useFormMedicamento(idPacienteCreado || 0);

    const handleCreateMedicamento = async () => {
        if (!stateMedicamento.medicamento || !stateMedicamento.dosis || !stateMedicamento.frecuencia) {
            Alert.alert("Validación", "Por favor completa los campos obligatorios");
            return;
        }

        try {
            await handleMedicamentoSubmit();
            Alert.alert("Éxito", modoEdicion ? "Medicamento actualizado correctamente" : "Medicamento creado correctamente");
            resetMedicamentoForm();
            setModoEdicion(false);
        } catch (error) {
            Alert.alert("Error", "No se pudo crear/actualizar el medicamento");
        }
    };

    const handleEliminarMedicamento = async () => {
        try {
            await deleteMedicamento();
            resetMedicamentoForm();
            setModoEdicion(false);
        } catch (error) {
            Alert.alert("Error", "No se pudo eliminar el medicamento");
        }
    };

    return (
        <View style={styles.root}>
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === "paciente" && styles.tabActive]}
                    onPress={() => {
                        setActiveTab("paciente");
                        resetPacienteForm();
                        setModoEdicion(false);
                    }}
                >
                    <Text style={[styles.tabText, activeTab === "paciente" && styles.tabTextActive]}>
                        Paciente
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === "tratamiento" && styles.tabActive]}
                    onPress={() => setActiveTab("tratamiento")}
                    disabled={!idPacienteCreado}
                >
                    <Text style={[styles.tabText, activeTab === "tratamiento" && styles.tabTextActive]}>
                        Tratamiento
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === "medicamento" && styles.tabActive]}
                    onPress={() => setActiveTab("medicamento")}
                    disabled={!idPacienteCreado}
                >
                    <Text style={[styles.tabText, activeTab === "medicamento" && styles.tabTextActive]}>
                        Medicamento
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === "listar" && styles.tabActive]}
                    onPress={() => setActiveTab("listar")}
                >
                    <Text style={[styles.tabText, activeTab === "listar" && styles.tabTextActive]}>
                        Listar
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
                {activeTab === "paciente" && (
                    <View style={styles.formContainer}>
                        <Text style={styles.formTitle}>Crear Nuevo Paciente</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Nombre *"
                            value={statePaciente.nombre}
                            onChangeText={(value) => handlePacienteChange("nombre", value)}
                            editable={!isLoadingPaciente}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Apellido *"
                            value={statePaciente.apellido}
                            onChangeText={(value) => handlePacienteChange("apellido", value)}
                            editable={!isLoadingPaciente}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Fecha de Nacimiento (YYYY-MM-DD) *"
                            value={statePaciente.fecha_nacimiento}
                            onChangeText={(value) => handlePacienteChange("fecha_nacimiento", value)}
                            editable={!isLoadingPaciente}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Sexo (M/F)"
                            value={statePaciente.sexo}
                            onChangeText={(value) => handlePacienteChange("sexo", value)}
                            editable={!isLoadingPaciente}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Teléfono"
                            value={statePaciente.telefono}
                            onChangeText={(value) => handlePacienteChange("telefono", value)}
                            keyboardType="phone-pad"
                            editable={!isLoadingPaciente}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Dirección"
                            value={statePaciente.direccion}
                            onChangeText={(value) => handlePacienteChange("direccion", value)}
                            editable={!isLoadingPaciente}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Tipo de Sangre"
                            value={statePaciente.tipo_sangre}
                            onChangeText={(value) => handlePacienteChange("tipo_sangre", value)}
                            editable={!isLoadingPaciente}
                        />

                        <TextInput
                            style={[styles.input, styles.inputMultiline]}
                            placeholder="Alergias"
                            value={statePaciente.alergias}
                            onChangeText={(value) => handlePacienteChange("alergias", value)}
                            multiline={true}
                            numberOfLines={4}
                            editable={!isLoadingPaciente}
                        />

                        <View style={styles.buttonRow}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonFlex, isLoadingPaciente && styles.buttonDisabled]}
                                onPress={handleCreatePaciente}
                                disabled={isLoadingPaciente}
                            >
                                {isLoadingPaciente ? (
                                    <ActivityIndicator color="#FFF" size="small" />
                                ) : (
                                    <Text style={styles.buttonText}>
                                        {modoEdicion ? "Actualizar" : "Crear"} Paciente
                                    </Text>
                                )}
                            </TouchableOpacity>
                            
                            {modoEdicion && (
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonDelete, styles.buttonFlex, isLoadingPaciente && styles.buttonDisabled]}
                                    onPress={handleEliminarPaciente}
                                    disabled={isLoadingPaciente}
                                >
                                    <Text style={styles.buttonText}>Eliminar</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                )}

                {activeTab === "tratamiento" && (
                    <View style={styles.formContainer}>
                        <Text style={styles.formTitle}>Crear Nuevo Tratamiento</Text>
                        <Text style={styles.infoText}>Paciente ID: {idPacienteCreado}</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Diagnóstico *"
                            value={stateTratamiento.diagnostico}
                            onChangeText={(value) => handleTratamientoChange("diagnostico", value)}
                            editable={!isLoadingTratamiento}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Medicamento *"
                            value={stateTratamiento.medicamento}
                            onChangeText={(value) => handleTratamientoChange("medicamento", value)}
                            editable={!isLoadingTratamiento}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Dosis *"
                            value={stateTratamiento.dosis}
                            onChangeText={(value) => handleTratamientoChange("dosis", value)}
                            editable={!isLoadingTratamiento}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Fecha de Inicio (YYYY-MM-DD)"
                            value={stateTratamiento.fecha_inicio}
                            onChangeText={(value) => handleTratamientoChange("fecha_inicio", value)}
                            editable={!isLoadingTratamiento}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Fecha de Fin (YYYY-MM-DD)"
                            value={stateTratamiento.fecha_fin}
                            onChangeText={(value) => handleTratamientoChange("fecha_fin", value)}
                            editable={!isLoadingTratamiento}
                        />

                        <TextInput
                            style={[styles.input, styles.inputMultiline]}
                            placeholder="Notas"
                            value={stateTratamiento.notas}
                            onChangeText={(value) => handleTratamientoChange("notas", value)}
                            multiline={true}
                            numberOfLines={4}
                            editable={!isLoadingTratamiento}
                        />

                        <View style={styles.buttonRow}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonFlex, isLoadingTratamiento && styles.buttonDisabled]}
                                onPress={handleCreateTratamiento}
                                disabled={isLoadingTratamiento}
                            >
                                {isLoadingTratamiento ? (
                                    <ActivityIndicator color="#FFF" size="small" />
                                ) : (
                                    <Text style={styles.buttonText}>Crear Tratamiento</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                {activeTab === "medicamento" && (
                    <View style={styles.formContainer}>
                        <Text style={styles.formTitle}>Crear Nuevo Medicamento</Text>
                        <Text style={styles.infoText}>Paciente ID: {idPacienteCreado}</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Medicamento *"
                            value={stateMedicamento.medicamento}
                            onChangeText={(value) => handleMedicamentoChange("medicamento", value)}
                            editable={!isLoadingMedicamento}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Dosis *"
                            value={stateMedicamento.dosis}
                            onChangeText={(value) => handleMedicamentoChange("dosis", value)}
                            editable={!isLoadingMedicamento}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Frecuencia (Ej: cada 8 horas) *"
                            value={stateMedicamento.frecuencia}
                            onChangeText={(value) => handleMedicamentoChange("frecuencia", value)}
                            editable={!isLoadingMedicamento}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Fecha de Inicio (YYYY-MM-DD)"
                            value={stateMedicamento.fecha_inicio}
                            onChangeText={(value) => handleMedicamentoChange("fecha_inicio", value)}
                            editable={!isLoadingMedicamento}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Fecha de Fin (YYYY-MM-DD)"
                            value={stateMedicamento.fecha_fin}
                            onChangeText={(value) => handleMedicamentoChange("fecha_fin", value)}
                            editable={!isLoadingMedicamento}
                        />

                        <View style={styles.buttonRow}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonFlex, isLoadingMedicamento && styles.buttonDisabled]}
                                onPress={handleCreateMedicamento}
                                disabled={isLoadingMedicamento}
                            >
                                {isLoadingMedicamento ? (
                                    <ActivityIndicator color="#FFF" size="small" />
                                ) : (
                                    <Text style={styles.buttonText}>Crear Medicamento</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                {activeTab === "listar" && (
                    <View style={styles.formContainer}>
                        <Text style={styles.formTitle}>Pacientes</Text>
                        {isLoadingPacientes && pacientes.length === 0 ? (
                            <ActivityIndicator size="large" color="#3B82F6" style={{ marginTop: 20 }} />
                        ) : pacientes.length === 0 ? (
                            <Text style={styles.emptyText}>No hay pacientes registrados</Text>
                        ) : (
                            <FlatList
                                data={pacientes}
                                keyExtractor={(item, index) => `${item.id_paciente}${index}`}
                                scrollEnabled={false}
                                renderItem={({ item }) => (
                                    <View style={styles.pacienteItem}>
                                        <View style={styles.pacienteInfo}>
                                            <Text style={styles.pacienteNombre}>
                                                {item.nombre} {item.apellido}
                                            </Text>
                                            <Text style={styles.pacienteSub}>
                                                ID: {item.id_paciente} | {item.tipo_sangre}
                                            </Text>
                                            <Text style={styles.pacienteSub}>
                                                {item.telefono}
                                            </Text>
                                        </View>
                                        <View style={styles.pacienteAcciones}>
                                            <TouchableOpacity
                                                style={[styles.buttonAction, styles.editButton]}
                                                onPress={() => handleEditarPaciente(item)}
                                            >
                                                <Text style={styles.buttonActionText}>Editar</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={[styles.buttonAction, styles.deleteButton]}
                                                onPress={() => {
                                                    setPacienteFormData({
                                                        id_paciente: item.id_paciente,
                                                        nombre: item.nombre,
                                                        apellido: item.apellido,
                                                        fecha_nacimiento: item.fecha_nacimiento,
                                                        sexo: item.sexo,
                                                        telefono: item.telefono,
                                                        direccion: item.direccion,
                                                        tipo_sangre: item.tipo_sangre,
                                                        alergias: item.alergias,
                                                    });
                                                    handleEliminarPaciente();
                                                }}
                                            >
                                                <Text style={styles.buttonActionText}>Eliminar</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )}
                            />
                        )}
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#F8F9FA",
    },
    tabContainer: {
        flexDirection: "row",
        backgroundColor: "#FFF",
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
        paddingHorizontal: 8,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: "center",
        borderBottomWidth: 3,
        borderBottomColor: "transparent",
    },
    tabActive: {
        borderBottomColor: "#3B82F6",
    },
    tabText: {
        fontSize: 12,
        fontWeight: "600",
        color: "#6B7280",
    },
    tabTextActive: {
        color: "#3B82F6",
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    formContainer: {
        backgroundColor: "#FFF",
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    formTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1F2937",
        marginBottom: 16,
    },
    infoText: {
        fontSize: 12,
        color: "#6B7280",
        marginBottom: 12,
        fontStyle: "italic",
    },
    input: {
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 12,
        fontSize: 14,
        color: "#1F2937",
        backgroundColor: "#FAFBFC",
    },
    inputMultiline: {
        height: 100,
        paddingTop: 10,
        textAlignVertical: "top",
    },
    button: {
        backgroundColor: "#3B82F6",
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: "center",
        marginTop: 16,
    },
    buttonRow: {
        flexDirection: "row",
        gap: 8,
        marginTop: 16,
    },
    buttonFlex: {
        flex: 1,
    },
    buttonDisabled: {
        backgroundColor: "#9CA3AF",
        opacity: 0.6,
    },
    buttonDelete: {
        backgroundColor: "#EF4444",
    },
    buttonText: {
        color: "#FFF",
        fontSize: 14,
        fontWeight: "700",
    },
    pacienteItem: {
        backgroundColor: "#F3F4F6",
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderLeftWidth: 4,
        borderLeftColor: "#3B82F6",
    },
    pacienteInfo: {
        flex: 1,
    },
    pacienteNombre: {
        fontSize: 14,
        fontWeight: "700",
        color: "#1F2937",
        marginBottom: 4,
    },
    pacienteSub: {
        fontSize: 12,
        color: "#6B7280",
        marginBottom: 2,
    },
    pacienteAcciones: {
        flexDirection: "row",
        gap: 8,
    },
    buttonAction: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 6,
        alignItems: "center",
    },
    editButton: {
        backgroundColor: "#10B981",
    },
    deleteButton: {
        backgroundColor: "#EF4444",
    },
    buttonActionText: {
        color: "#FFF",
        fontSize: 11,
        fontWeight: "600",
    },
    emptyText: {
        fontSize: 14,
        color: "#6B7280",
        textAlign: "center",
        marginTop: 32,
        fontStyle: "italic",
    },
});
