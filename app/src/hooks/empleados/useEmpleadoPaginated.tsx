import { useState, useEffect, useRef } from "react";
import { empleadosApi } from "../../api/empleadosApi";
import { Welcome, Datum } from "../../interfaces/empleadosInterface";

interface UseEmpleadoPaginated {
    isLoading: boolean;
    loadEmpleados: () => void;
    simpleEmpleadosList: Datum[];
}

export const useEmpleadoPaginated = (): UseEmpleadoPaginated => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [simpleEmpleadosList, setSimpleEmpleadosList] = useState<Datum[]>([]);
    const nextPageUrl = useRef<string | null>("http://192.168.100.5:3000/api/empleados");

    const loadEmpleados = async () => {
        setIsLoading(true);
        const response = await empleadosApi.get<Welcome>(nextPageUrl.current || "");
        nextPageUrl.current = response.data.next || null;
        mapEmpleadosList(response.data.data || []);
    }

    const mapEmpleadosList = (empleadosList: Datum[]) => {
        setSimpleEmpleadosList((prevList) => {
            const merged = [...prevList, ...empleadosList];
            const unique = merged.filter(
                (item, index, self) => index === self.findIndex(t => t.id_empleado === item.id_empleado)
            );
            return unique;
        });
        setIsLoading(false);
    }

    useEffect(() => {
        loadEmpleados();
    }, []);

    return { isLoading, loadEmpleados, simpleEmpleadosList };

}