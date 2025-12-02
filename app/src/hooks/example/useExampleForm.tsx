
import { useState } from "react";

export interface FormDataExample {
    id_example: number;
    correo_example: string;
    nota_example: string;
    ciudad_example: string;
    proveedor_example: string;
    image1_example: string;
    image2_example: string;
    image3_example: string;
    prioridad_example: number;
    updaate: string;
}

interface UseFormE {
    form: FormDataExample;
    formList: FormDataExample[];
    handleInputChange: (fieldName: keyof FormDataExample, value: string) => void;
    handleSubmit: () => void;
}

export const useFormE = (): UseFormE => {

    const initialForm: FormDataExample = {
        id_example: 0,
        correo_example: "",
        nota_example: "",
        ciudad_example: "",
        proveedor_example: "",
        image1_example: "",
        image2_example: "",
        image3_example: "",
        prioridad_example: 0,
        updaate: new Date().toISOString(),
    }

    const [form, setForm] = useState<FormDataExample>(initialForm);
    const [formList, setFormList] = useState<FormDataExample[]>([]);

    const handleInputChange = (fieldName: keyof FormDataExample, value: string) => {
        setForm((prevData) => {
            if (fieldName === 'prioridad_example') {
                return {
                    ...prevData,
                    [fieldName]: parseInt(value) || 0
                }
            }
            return {
                ...prevData,
                [fieldName]: value
            }
        });
    }

    const handleSubmit = () => {
        const newForm = {
            ...form,
            updaate: new Date().toISOString()
        };
        setFormList((prevList) => [...prevList, newForm]);
        setForm(initialForm);
    }

    return { form, formList, handleInputChange, handleSubmit };

}


