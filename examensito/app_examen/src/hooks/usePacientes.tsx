import { useState, useEffect, useRef } from "react";
import { pacientesApi } from "../api/pacientesApi";
import { PacientesActivos } from "../interfaces/pacientesInterface";

interface UsePacientesReturn {
    isLoading: boolean;
    pacientes: PacientesActivos[];
    cargarPacientes: () => void;
}

export const usePacientes = (): UsePacientesReturn => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [pacientes, setPacientes] = useState<PacientesActivos[]>([]);
    const urlSiguiente = useRef<string>("/pacientes/activos");

    const cargarPacientes = async () => {
        if (isLoading) return;
        setIsLoading(true);

        const respuesta = await pacientesApi.get<PacientesActivos[]>(urlSiguiente.current);

        if (Array.isArray(respuesta.data) && respuesta.data.length > 0) {
            setPacientes((prevList) => [...prevList, ...respuesta.data]);
        }

        setIsLoading(false);
    }

    useEffect(() => {
        cargarPacientes();
    }, []);

    return { isLoading, pacientes, cargarPacientes };

}
