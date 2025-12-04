import { useReducer, useEffect } from "react";
import { pacientesApi } from "../api/pacientesApi";
import { CreatePacienteDto, CitasPaciente, Tratamientos, Medicamentos, FormPacienteData, FormCitaData, FormTratamientoData, FormMedicamentoData } from "../interfaces/pacientesInterface";

export interface UseFormPaciente {
    state: FormPacienteData;
    isLoading: boolean;
    handleInputChange: (fieldName: keyof FormPacienteData, value: string | number) => void;
    handleSubmit: () => Promise<any>;
    resetForm: () => void;
    setFormData: (data: FormPacienteData) => void;
    handleDelete: () => Promise<any>;
}

export interface UseFormCita {
    state: FormCitaData;
    isLoading: boolean;
    handleInputChange: (fieldName: keyof FormCitaData, value: string | number) => void;
    handleSubmit: () => Promise<any>;
    resetForm: () => void;
    setFormData: (data: FormCitaData) => void;
    handleDelete: () => Promise<any>;
}

export interface UseFormTratamiento {
    state: FormTratamientoData;
    isLoading: boolean;
    handleInputChange: (fieldName: keyof FormTratamientoData, value: string | number) => void;
    handleSubmit: () => Promise<any>;
    resetForm: () => void;
    setFormData: (data: FormTratamientoData) => void;
    handleDelete: () => Promise<any>;
}

export interface UseFormMedicamento {
    state: FormMedicamentoData;
    isLoading: boolean;
    handleInputChange: (fieldName: keyof FormMedicamentoData, value: string | number) => void;
    handleSubmit: () => Promise<any>;
    resetForm: () => void;
    setFormData: (data: FormMedicamentoData) => void;
    handleDelete: () => Promise<any>;
}

export const useFormPaciente = (): UseFormPaciente => {

    const initialForm: FormPacienteData = {
        nombre: "",
        apellido: "",
        fecha_nacimiento: "",
        sexo: "",
        telefono: "",
        direccion: "",
        tipo_sangre: "",
        alergias: "",
    }

    type Action = {
        type: "handleInputChange",
        payload: { fieldName: keyof FormPacienteData, value: string | number }
    } | {
        type: "resetForm"
    } | {
        type: "setLoading",
        payload: boolean
    };

    const formReducer = (state: FormPacienteData & { isLoading: boolean }, action: Action) => {
        switch (action.type) {
            case "handleInputChange":
                return {
                    ...state,
                    [(action as any).payload.fieldName]: (action as any).payload.value
                }
            case "resetForm":
                return { ...initialForm, isLoading: false };
            case "setLoading":
                return { ...state, isLoading: (action as any).payload };
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(formReducer, { ...initialForm, isLoading: false });

    const handleInputChange = (fieldName: keyof FormPacienteData, value: string | number) => {
        dispatch({ type: "handleInputChange", payload: { fieldName, value } });
    }

    const handleSubmit = async () => {
        dispatch({ type: "setLoading", payload: true });
        try {
            const { id_paciente, ...pacienteData } = state;
            if (id_paciente) {
                const response = await pacientesApi.put(`/pacientes/${id_paciente}`, pacienteData);
                return response.data;
            } else {
                const response = await pacientesApi.post("/pacientes", pacienteData);
                dispatch({ type: "resetForm" });
                return response.data;
            }
        } catch (error) {
            console.error("Error al crear/actualizar paciente:", error);
            throw error;
        } finally {
            dispatch({ type: "setLoading", payload: false });
        }
    }

    const handleDelete = async () => {
        dispatch({ type: "setLoading", payload: true });
        try {
            if (state.id_paciente) {
                await pacientesApi.delete(`/pacientes/${state.id_paciente}`);
                dispatch({ type: "resetForm" });
            }
        } catch (error) {
            console.error("Error al eliminar paciente:", error);
            throw error;
        } finally {
            dispatch({ type: "setLoading", payload: false });
        }
    }

    const resetForm = () => {
        dispatch({ type: "resetForm" });
    }

    const setFormData = (data: FormPacienteData) => {
        dispatch({ type: "handleInputChange", payload: { fieldName: "nombre", value: data.nombre } });
        dispatch({ type: "handleInputChange", payload: { fieldName: "apellido", value: data.apellido } });
        dispatch({ type: "handleInputChange", payload: { fieldName: "fecha_nacimiento", value: data.fecha_nacimiento } });
        dispatch({ type: "handleInputChange", payload: { fieldName: "sexo", value: data.sexo } });
        dispatch({ type: "handleInputChange", payload: { fieldName: "telefono", value: data.telefono } });
        dispatch({ type: "handleInputChange", payload: { fieldName: "direccion", value: data.direccion } });
        dispatch({ type: "handleInputChange", payload: { fieldName: "tipo_sangre", value: data.tipo_sangre } });
        dispatch({ type: "handleInputChange", payload: { fieldName: "alergias", value: data.alergias } });
        if (data.id_paciente) {
            dispatch({ type: "handleInputChange", payload: { fieldName: "id_paciente", value: data.id_paciente } });
        }
    }

    return {
        state: state as FormPacienteData,
        isLoading: (state as any).isLoading,
        handleInputChange,
        handleSubmit,
        resetForm,
        setFormData,
        handleDelete
    };
}

export const useFormCita = (idPaciente: number): UseFormCita => {

    const initialForm: FormCitaData = {
        id_paciente: idPaciente,
        fecha: "",
        hora: "",
        motivo: "",
        medico_asignado: "",
        estatus: "pendiente",
    }

    type Action = {
        type: "handleInputChange",
        payload: { fieldName: keyof FormCitaData, value: string | number }
    } | {
        type: "resetForm"
    } | {
        type: "setLoading",
        payload: boolean
    } | {
        type: "setIdPaciente",
        payload: number
    };

    const formReducer = (state: FormCitaData & { isLoading: boolean }, action: Action) => {
        switch (action.type) {
            case "handleInputChange":
                return {
                    ...state,
                    [(action as any).payload.fieldName]: (action as any).payload.value
                }
            case "resetForm":
                return { ...initialForm, isLoading: false };
            case "setLoading":
                return { ...state, isLoading: (action as any).payload };
            case "setIdPaciente":
                return { ...state, id_paciente: (action as any).payload };
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(formReducer, { ...initialForm, isLoading: false });

    useEffect(() => {
        if (idPaciente && idPaciente > 0) {
            dispatch({ type: "setIdPaciente", payload: idPaciente });
        }
    }, [idPaciente]);

    const handleInputChange = (fieldName: keyof FormCitaData, value: string | number) => {
        dispatch({ type: "handleInputChange", payload: { fieldName, value } });
    }

    const handleSubmit = async () => {
        dispatch({ type: "setLoading", payload: true });
        try {
            const { id_cita, ...citaData } = state;
            if (id_cita) {
                const response = await pacientesApi.put(`/pacientes/citas/${id_cita}`, citaData);
                return response.data;
            } else {
                const response = await pacientesApi.post(`/pacientes/citas`, citaData);
                dispatch({ type: "resetForm" });
                return response.data;
            }
        } catch (error) {
            console.error("Error al crear/actualizar cita:", error);
            throw error;
        } finally {
            dispatch({ type: "setLoading", payload: false });
        }
    }

    const handleDelete = async () => {
        dispatch({ type: "setLoading", payload: true });
        try {
            if (state.id_cita) {
                await pacientesApi.delete(`/pacientes/citas/${state.id_cita}`);
                dispatch({ type: "resetForm" });
            }
        } catch (error) {
            console.error("Error al eliminar cita:", error);
            throw error;
        } finally {
            dispatch({ type: "setLoading", payload: false });
        }
    }

    const resetForm = () => {
        dispatch({ type: "resetForm" });
    }

    const setFormData = (data: FormCitaData) => {
        dispatch({ type: "handleInputChange", payload: { fieldName: "fecha", value: data.fecha } });
        dispatch({ type: "handleInputChange", payload: { fieldName: "hora", value: data.hora } });
        dispatch({ type: "handleInputChange", payload: { fieldName: "motivo", value: data.motivo } });
        dispatch({ type: "handleInputChange", payload: { fieldName: "medico_asignado", value: data.medico_asignado } });
        dispatch({ type: "handleInputChange", payload: { fieldName: "estatus", value: data.estatus } });
        if (data.id_cita) {
            dispatch({ type: "handleInputChange", payload: { fieldName: "id_cita", value: data.id_cita } });
        }
        if (data.id_paciente) {
            dispatch({ type: "handleInputChange", payload: { fieldName: "id_paciente", value: data.id_paciente } });
        }
    }

    return {
        state: state as FormCitaData,
        isLoading: (state as any).isLoading,
        handleInputChange,
        handleSubmit,
        resetForm,
        setFormData,
        handleDelete
    };
}

export const useFormTratamiento = (idPaciente: number): UseFormTratamiento => {

    const initialForm: FormTratamientoData = {
        id_paciente: idPaciente,
        diagnostico: "",
        medicamento: "",
        dosis: "",
        fecha_inicio: "",
        fecha_fin: "",
        notas: "",
    }

    type Action = {
        type: "handleInputChange",
        payload: { fieldName: keyof FormTratamientoData, value: string | number }
    } | {
        type: "resetForm"
    } | {
        type: "setLoading",
        payload: boolean
    } | {
        type: "setIdPaciente",
        payload: number
    };

    const formReducer = (state: FormTratamientoData & { isLoading: boolean }, action: Action) => {
        switch (action.type) {
            case "handleInputChange":
                return {
                    ...state,
                    [(action as any).payload.fieldName]: (action as any).payload.value
                }
            case "resetForm":
                return { ...initialForm, isLoading: false };
            case "setLoading":
                return { ...state, isLoading: (action as any).payload };
            case "setIdPaciente":
                return { ...state, id_paciente: (action as any).payload };
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(formReducer, { ...initialForm, isLoading: false });

    useEffect(() => {
        if (idPaciente && idPaciente > 0) {
            dispatch({ type: "setIdPaciente", payload: idPaciente });
        }
    }, [idPaciente]);

    const handleInputChange = (fieldName: keyof FormTratamientoData, value: string | number) => {
        dispatch({ type: "handleInputChange", payload: { fieldName, value } });
    }

    const handleSubmit = async () => {
        dispatch({ type: "setLoading", payload: true });
        try {
            const { id_tratamiento, ...tratamientoData } = state;
            if (id_tratamiento) {
                const response = await pacientesApi.put(`/pacientes/tratamientos/${id_tratamiento}`, tratamientoData);
                return response.data;
            } else {
                const response = await pacientesApi.post(`/pacientes/tratamientos`, tratamientoData);
                dispatch({ type: "resetForm" });
                return response.data;
            }
        } catch (error) {
            console.error("Error al crear/actualizar tratamiento:", error);
            throw error;
        } finally {
            dispatch({ type: "setLoading", payload: false });
        }
    }

    const handleDelete = async () => {
        dispatch({ type: "setLoading", payload: true });
        try {
            if (state.id_tratamiento) {
                await pacientesApi.delete(`/pacientes/tratamientos/${state.id_tratamiento}`);
                dispatch({ type: "resetForm" });
            }
        } catch (error) {
            console.error("Error al eliminar tratamiento:", error);
            throw error;
        } finally {
            dispatch({ type: "setLoading", payload: false });
        }
    }

    const resetForm = () => {
        dispatch({ type: "resetForm" });
    }

    const setFormData = (data: FormTratamientoData) => {
        dispatch({ type: "handleInputChange", payload: { fieldName: "diagnostico", value: data.diagnostico } });
        dispatch({ type: "handleInputChange", payload: { fieldName: "medicamento", value: data.medicamento } });
        dispatch({ type: "handleInputChange", payload: { fieldName: "dosis", value: data.dosis } });
        dispatch({ type: "handleInputChange", payload: { fieldName: "fecha_inicio", value: data.fecha_inicio } });
        dispatch({ type: "handleInputChange", payload: { fieldName: "fecha_fin", value: data.fecha_fin } });
        dispatch({ type: "handleInputChange", payload: { fieldName: "notas", value: data.notas } });
        if (data.id_tratamiento) {
            dispatch({ type: "handleInputChange", payload: { fieldName: "id_tratamiento", value: data.id_tratamiento } });
        }
        if (data.id_paciente) {
            dispatch({ type: "handleInputChange", payload: { fieldName: "id_paciente", value: data.id_paciente } });
        }
    }

    return {
        state: state as FormTratamientoData,
        isLoading: (state as any).isLoading,
        handleInputChange,
        handleSubmit,
        resetForm,
        setFormData,
        handleDelete
    };
}

export const useFormMedicamento = (idPaciente: number): UseFormMedicamento => {

    const initialForm: FormMedicamentoData = {
        id_paciente: idPaciente,
        medicamento: "",
        dosis: "",
        frecuencia: "",
        fecha_inicio: "",
        fecha_fin: "",
        id_medicamento: undefined,
    }

    type Action = {
        type: "handleInputChange",
        payload: { fieldName: keyof FormMedicamentoData, value: string | number }
    } | {
        type: "resetForm"
    } | {
        type: "setLoading",
        payload: boolean
    } | {
        type: "setIdPaciente",
        payload: number
    };

    const formReducer = (state: FormMedicamentoData & { isLoading: boolean }, action: Action) => {
        switch (action.type) {
            case "handleInputChange":
                return {
                    ...state,
                    [(action as any).payload.fieldName]: (action as any).payload.value
                }
            case "resetForm":
                return { ...initialForm, isLoading: false };
            case "setLoading":
                return { ...state, isLoading: (action as any).payload };
            case "setIdPaciente":
                return { ...state, id_paciente: (action as any).payload };
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(formReducer, { ...initialForm, isLoading: false });

    useEffect(() => {
        if (idPaciente && idPaciente > 0) {
            dispatch({ type: "setIdPaciente", payload: idPaciente });
        }
    }, [idPaciente]);

    const handleInputChange = (fieldName: keyof FormMedicamentoData, value: string | number) => {
        dispatch({ type: "handleInputChange", payload: { fieldName, value } });
    }

    const handleSubmit = async () => {
        dispatch({ type: "setLoading", payload: true });
        try {
            console.warn("Los medicamentos solo se pueden ver, no crear/actualizar desde la API actual");
            return null;
        } catch (error) {
            console.error("Error al crear/actualizar medicamento:", error);
            throw error;
        } finally {
            dispatch({ type: "setLoading", payload: false });
        }
    }

    const handleDelete = async () => {
        dispatch({ type: "setLoading", payload: true });
        try {
            if (state.id_medicamento) {
                await pacientesApi.delete(`/pacientes/medicamentos/${state.id_medicamento}`);
                dispatch({ type: "resetForm" });
            }
        } catch (error) {
            console.error("Error al eliminar medicamento:", error);
            throw error;
        } finally {
            dispatch({ type: "setLoading", payload: false });
        }
    }

    const resetForm = () => {
        dispatch({ type: "resetForm" });
    }

    const setFormData = (data: FormMedicamentoData) => {
        dispatch({ type: "handleInputChange", payload: { fieldName: "medicamento", value: data.medicamento } });
        dispatch({ type: "handleInputChange", payload: { fieldName: "dosis", value: data.dosis } });
        dispatch({ type: "handleInputChange", payload: { fieldName: "frecuencia", value: data.frecuencia } });
        dispatch({ type: "handleInputChange", payload: { fieldName: "fecha_inicio", value: data.fecha_inicio } });
        dispatch({ type: "handleInputChange", payload: { fieldName: "fecha_fin", value: data.fecha_fin } });
        if (data.id_medicamento) {
            dispatch({ type: "handleInputChange", payload: { fieldName: "id_medicamento", value: data.id_medicamento } });
        }
        if (data.id_paciente) {
            dispatch({ type: "handleInputChange", payload: { fieldName: "id_paciente", value: data.id_paciente } });
        }
    }

    return {
        state: state as FormMedicamentoData & { isLoading: boolean },
        isLoading: (state as any).isLoading,
        handleInputChange,
        handleSubmit,
        resetForm,
        setFormData,
        handleDelete
    };
}
