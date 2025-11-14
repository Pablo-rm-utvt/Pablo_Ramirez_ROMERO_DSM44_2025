import { useEffect, useState } from "react";
import { myApi } from "../api/myApi";
import { UseExample } from "../interfaces/exampleInterfaces";
import { FormDataExample } from "./useExampleForm";

interface UseExampleApi {
    isLoading: boolean;
    listExample: UseExample[];
    loadExample: () => void;
    createExample: (data: FormDataExample) => void;
    updateExample: (data: FormDataExample) => void;
    deleteExample: (data: FormDataExample) => void;
}

export const useExampleApi = (): UseExampleApi => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [listExample, setListExample] = useState<UseExample[]>([]);

    const apiUrl: string = "http://10.45.20.13:3000/api/tarea";

    const loadExample = async () => {
        setIsLoading(true);
        const response = await myApi.get<UseExample[]>(apiUrl);
        setListExample(response.data);
        setIsLoading(false);
    }

    useEffect(() => {
        loadExample();
    }, []);

    const createExample = async (data: FormDataExample) => {
        const dataBody = {
            correo_example: data.correo_example,
            nota_example: data.nota_example,
            ciudad_example: data.ciudad_example,
            proveedor_example: data.proveedor_example,
            image1_example: data.image1_example,
            image2_example: data.image2_example,
            image3_example: data.image3_example,
            prioridad_example: Number(data.prioridad_example),
        }
        await myApi.post(apiUrl, dataBody);
    }

    const updateExample = async (data: FormDataExample) => {
        const dataBody = {

            correo_example: data.correo_example,
            nota_example: data.nota_example,
            ciudad_example: data.ciudad_example,
            proveedor_example: data.proveedor_example,
            image1_example: data.image1_example,
            image2_example: data.image2_example,
            image3_example: data.image3_example,
            prioridad_example: Number(data.prioridad_example),

        }
        await myApi.patch(apiUrl + `/${data.id_example}`, dataBody);
    }

    const deleteExample = async (data: FormDataExample) => {
        await myApi.delete(apiUrl + `/${data.id_example}`);
    }

    return { isLoading, listExample, loadExample, createExample, updateExample, deleteExample };
}