import { useState } from "react";
import { pacientesApi } from "../api/pacientesApi";

export const useReporteAsistencia = () => {
    const [data, setData] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const loadData = async (id_empleado: number, fechaInicio: string, fechaFin: string) => {
        setIsLoading(true);
        // const response = await empleadosApi.get<ReporteAsistencia>(
        //     `${BASE_URL}/reporte-asistencia-empleado?id_empleado=${id_empleado}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
        // );
        // setData(response.data);
        setIsLoading(false);
    };

    return { data, isLoading, loadData };
};

export const useAsistenciaEmpleado = () => {
    const [data, setData] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const loadData = async (id_empleado: number, fechaInicio: string, fechaFin: string) => {
        setIsLoading(true);
        // const response = await empleadosApi.get<AsistenciaEmpleado>(
        //     `${BASE_URL}/asistencia-empleado?id_empleado=${id_empleado}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
        // );
        // setData(response.data);
        setIsLoading(false);
    };

    return { data, isLoading, loadData };
};

export const useNomina = () => {
    const [data, setData] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const loadData = async (id_empleado: number, fechaInicio: string, fechaFin: string) => {
        setIsLoading(true);
        // const response = await empleadosApi.get<Nomina>(
        //     `${BASE_URL}/nomina?id_empleado=${id_empleado}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
        // );
        // setData(response.data);
        setIsLoading(false);
    };

    return { data, isLoading, loadData };
};

export const useDiasTrabajados = () => {
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const loadData = async (id_empleado: number, fechaInicio: string, fechaFin: string) => {
        setIsLoading(true);
        // const response = await empleadosApi.get<DiasTrabajados[]>(
        //     `${BASE_URL}/dias-trabajados?id_empleado=${id_empleado}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
        // );
        // setData(response.data);
        setIsLoading(false);
    };

    return { data, isLoading, loadData };
};

export const useReporteProduccion = () => {
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const loadData = async (id_empleado: number, fechaInicio: string, fechaFin: string) => {
        setIsLoading(true);
        // const response = await empleadosApi.get<ReporteProduccion[]>(
        //     `${BASE_URL}/reporte-produccion?id_empleado=${id_empleado}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
        // );
        // setData(response.data);
        setIsLoading(false);
    };

    return { data, isLoading, loadData };
};

export const useHorasTrabajadas = () => {
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const loadData = async (id_empleado: number, fechaInicio: string, fechaFin: string) => {
        setIsLoading(true);
        // const response = await empleadosApi.get<HorasTrabajadas[]>(
        //     `${BASE_URL}/horas-trabajadas?id_empleado=${id_empleado}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
        // );
        // setData(response.data);
        setIsLoading(false);
    };

    return { data, isLoading, loadData };
};

export const useUnidadesProducidas = () => {
    const [data, setData] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const loadData = async (id_empleado: number, fechaInicio: string, fechaFin: string) => {
        setIsLoading(true);
        // const response = await empleadosApi.get<UnidadesProducidas>(
        //     `${BASE_URL}/unidades-producidas?id_empleado=${id_empleado}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
        // );
        // setData(response.data);
        setIsLoading(false);
    };

    return { data, isLoading, loadData };
};
