import { useState, useEffect, useRef } from "react";
import { empleadosApi } from "../../api/empleadosApi";
import { Welcome, Datum } from "../../interfaces/empleadosInterface";

interface UseEmpleadoPaginated {
    isLoading: boolean;
    loadEmployees: () => void;
    simpleEmpleadosList: Datum[];
}

export const useEmpleadoPaginated = (apiIp: string): UseEmpleadoPaginated => {

    const [isLoading, setIsLoading] = useState(false);
    const [simpleEmpleadosList, setSimpleEmpleadosList] = useState<Datum[]>([]);
    const urlSiguiente = useRef<string>("");
    useEffect(() => {
        urlSiguiente.current = `${apiIp}/api/empleados`;
        console.log("API IP en hook:", urlSiguiente.current);
    }, [apiIp]);
    const loadEmployees = async () => {
        setIsLoading(true);

        const response = await empleadosApi.get<Welcome>(urlSiguiente.current);

        urlSiguiente.current = response.data.next;
        agregarUnicos(response.data.data);

        setIsLoading(false);
    };
    const agregarUnicos = (lista: Datum[]) => {
        setSimpleEmpleadosList((prev) => {
            const merged = [...prev, ...lista];
            const unique = merged.filter(
                (item, index, self) =>
                    index === self.findIndex((x) => x.id_empleado === item.id_empleado)
            );
            return unique;
        });
    };
    useEffect(() => {
        loadEmployees();
    }, [apiIp]);

    return {
        isLoading,
        loadEmployees,
        simpleEmpleadosList,
    };
};
