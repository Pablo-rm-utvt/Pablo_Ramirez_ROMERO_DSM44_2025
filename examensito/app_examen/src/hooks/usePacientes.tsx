import { useState, useEffect, useRef } from "react";
import { pacientesApi } from "../api/pacientesApi";
import { PacientesActivos } from "../interfaces/pacientesInterface";

interface UsePacientesReturn {
    isLoading: boolean;
    pacientes: PacientesActivos[];
    loadPacientes: () => void;
}

export const usePacientes = (): UsePacientesReturn => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [pacientes, setPacientes] = useState<PacientesActivos[]>([]);
    const nextPageUrl = useRef<string>("/pacientes/activos");

    const loadPacientes = async () => {
        if (isLoading) return;
        setIsLoading(true);

        const respuesta = await pacientesApi.get<PacientesActivos[]>(nextPageUrl.current);

        if (Array.isArray(respuesta.data) && respuesta.data.length > 0) {
            setPacientes((prevList) => [...prevList, ...respuesta.data]);
        }

        setIsLoading(false);
    }

    useEffect(() => {
        loadPacientes();
    }, []);

    return { isLoading, pacientes, loadPacientes };

}
