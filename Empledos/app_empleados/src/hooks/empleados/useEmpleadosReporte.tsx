import React, { useState } from "react";
import { empleadosApi } from "../../api/empleadosApi";

import {
    ReporteAsistencia,
    AsistenciaEmpleado,
    Nomina,
    DiasTrabajados,
    ReporteProduccion,
    HorasTrabajadas,
    UnidadesProducidas,
} from "../../interfaces/empleadosInterface";

export const useReporteAsistencia = (apiIp: string) => {
    const BASE_URL = `${apiIp}/api/empleados`;
    const [data, setData] = useState<ReporteAsistencia | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadData = async (id_empleado: number,) => {
        setIsLoading(true);
        setError(null);

        const response = await empleadosApi.get<ReporteAsistencia>(
            `${BASE_URL}/reporte-asistencia-empleado?id_empleado=${id_empleado}&fechaInicio=01/01/2025&fechaFin=31/12/2025`
        );

        setData(response.data);
        setIsLoading(false);
    };

    return { data, isLoading, error, loadData };
};
export const useAsistenciaEmpleado = (apiIp: string) => {
    const BASE_URL = `${apiIp}/api/empleados`;


    const [data, setData] = useState<AsistenciaEmpleado | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadData = async (id_empleado: number) => {
        setIsLoading(true);
        setError(null);

        const response = await empleadosApi.get<AsistenciaEmpleado>(
            `${BASE_URL}/asistencia-empleado?id_empleado=${id_empleado}&fechaInicio=01/01/2025&fechaFin=31/12/2025`
        );

        setData(response.data);
        setIsLoading(false);
    };

    return { data, isLoading, error, loadData };
};

export const useNomina = (apiIp: string) => {
    const BASE_URL = `${apiIp}/api/empleados`;

    const [data, setData] = useState<Nomina | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadData = async (id_empleado: number) => {
        setIsLoading(true);
        setError(null);
        const response = await empleadosApi.get<Nomina>(
            `${BASE_URL}/nomina?id_empleado=${id_empleado}&fechaInicio=31/12/2025&fechaFin=02/01/2026`
        );

        setData(response.data);
        setIsLoading(false);
    };

    return { data, isLoading, error, loadData };
};

export const useDiasTrabajados = (apiIp: string) => {
    const BASE_URL = `${apiIp}/api/empleados`;

    const [data, setData] = useState<DiasTrabajados[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadData = async (id_empleado: number) => {
        setIsLoading(true);
        setError(null);

        const response = await empleadosApi.get<DiasTrabajados[]>(
            `${BASE_URL}/dias-trabajados?id_empleado=${id_empleado}&fechaInicio=01/01/2025&fechaFin=31/12/2025`
        );

        setData(response.data);
        setIsLoading(false);
    };

    return { data, isLoading, error, loadData };
};

export const useReporteProduccion = (apiIp: string) => {
    const BASE_URL = `${apiIp}/api/empleados`;

    const [data, setData] = useState<ReporteProduccion[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadData = async (id_empleado: number) => {
        setIsLoading(true);
        setError(null);

        const response = await empleadosApi.get<ReporteProduccion[]>(
            `${BASE_URL}/reporte-produccion?id_empleado=${id_empleado}&fechaInicio=01/01/2025&fechaFin=31/12/2025`
        );

        setData(response.data);
        setIsLoading(false);
    };

    return { data, isLoading, error, loadData };
};
export const useHorasTrabajadas = (apiIp: string) => {
    const BASE_URL = `${apiIp}/api/empleados`;

    const [data, setData] = useState<HorasTrabajadas[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadData = async (id_empleado: number) => {
        setIsLoading(true);
        setError(null);

        const response = await empleadosApi.get<HorasTrabajadas[]>(
            `${BASE_URL}/horas-trabajadas?id_empleado=${id_empleado}&fechaInicio=01/01/2025&fechaFin=31/12/2025`
        );

        setData(response.data);
        setIsLoading(false);
    };

    return { data, isLoading, error, loadData };
};

export const useUnidadesProducidas = (apiIp: string) => {
    const BASE_URL = `${apiIp}/api/empleados`;

    const [data, setData] = useState<UnidadesProducidas | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadData = async (id_empleado: number) => {
        setIsLoading(true);
        setError(null);

        const response = await empleadosApi.get<UnidadesProducidas>(
            `${BASE_URL}/unidades-producidas?id_empleado=${id_empleado}&fechaInicio=01/01/2025&fechaFin=31/12/2025`
        );

        setData(response.data);
        setIsLoading(false);
    };

    return { data, isLoading, error, loadData };
};
