import { useReducer } from "react";
import { useTareaApi } from "./useTareaApi";

export interface FormData {
    id_tarea: number;
    nombre: string;
    materia: string;
    fecha: string;
    prioridad: number;
}

export interface UseTareaForm {
    state: FormData;
    handleInputChange: (fieldName: keyof FormData, value: string | number) => void;
    handleSubmit: () => void;
    handleDelete: () => void;
}

export const useTareaForm = (): UseTareaForm => {

    const { createTarea, updateTarea, deleteTarea } = useTareaApi();

    const initialForm: FormData = {
        "id_tarea": 0,
        "nombre": "",
        "materia": "",
        "fecha": "",
        "prioridad": 0
    }

    type Action = { type: "handleInputChange", payload: { fieldName: keyof FormData, value: string | number } };

    const formReducer = (state: FormData, action: Action) => {
        switch (action.type) {
            case "handleInputChange":
                return {
                    ...state,
                    [action.payload.fieldName]: action.payload.value
                }
        }
    }

    const [state, dispatch] = useReducer(formReducer, initialForm);

    const handleInputChange = (fieldName: keyof FormData, value: string | number) => {
        dispatch({ type: "handleInputChange", payload: { fieldName, value } });
    }

    const handleSubmit = () => (state.id_tarea == 0) ? createTarea(state) : updateTarea(state);

    const handleDelete = () => deleteTarea(state);

    return { state, handleInputChange, handleSubmit, handleDelete };

}