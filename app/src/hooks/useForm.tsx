
import { useState } from "react";

export interface FormData {
    tarea: string;
    fecha: string;
    prioridad: string;
    materia: string;
}

interface UseForm {
    form: FormData;
    formList: FormData[];
    handleInputChange: (fieldName: keyof FormData, value: string) => void;
    handleSubmit: () => void;
}

export const useForm = (): UseForm => {

    const initialForm: FormData = {
        tarea: "",
        materia: "",
        prioridad: "",
        fecha: ""
    }

    const [form, setForm] = useState<FormData>(initialForm);

    const [formList, setFormList] = useState<FormData[]>([]);

    const handleInputChange = (fieldName: keyof FormData, value: string) => {
        setForm((prevData) => ({
            ...prevData,
            [fieldName]: value
        }));
    }

    const handleSubmit = () => {
        setFormList((prevList) => [...prevList, form]);
        setForm(initialForm);
    }

    return { form, formList, handleInputChange, handleSubmit };

}
