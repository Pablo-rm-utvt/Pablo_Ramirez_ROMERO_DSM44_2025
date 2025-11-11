import { useEffect, useState } from 'react';
import {
    getEmpleados,
    getEmpleado,
    createEmpleado as apiCreateEmpleado,
    updateEmpleado as apiUpdateEmpleado,
    deleteEmpleado as apiDeleteEmpleado,
} from '../api/empleadosApi';
import { Empleado, EmpleadoCreate, EmpleadoUpdate, EmpleadoResponse } from '../interfaces/empleadoInterfaces';

interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

export const useEmpleadosApi = () => {
    const [empleados, setEmpleados] = useState<Empleado[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchAll = async (): Promise<ApiResponse<Empleado[]>> => {
        setLoading(true);
        try {
            const data = await getEmpleados();
            setEmpleados(data || []);
            setError(null);
            return { success: true, data };
        } catch (err: any) {
            const errorMessage = err?.response?.data?.message || err.message || 'Error al cargar empleados';
            console.error('fetchAll empleados error:', errorMessage);
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAll();
    }, []);

    const create = async (payload: EmpleadoCreate): Promise<ApiResponse<EmpleadoResponse>> => {
        setLoading(true);
        try {
            const res = await apiCreateEmpleado(payload);
            await fetchAll();
            setError(null);
            return { success: true, data: res };
        } catch (err: any) {
            const errorMessage = err?.response?.data?.message || err.message || 'Error al crear empleado';
            console.error('create empleado error:', errorMessage);
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const update = async (id: number, payload: EmpleadoUpdate): Promise<ApiResponse<EmpleadoResponse>> => {
        setLoading(true);
        try {
            const res = await apiUpdateEmpleado(id, payload);
            await fetchAll();
            setError(null);
            return { success: true, data: res };
        } catch (err: any) {
            const errorMessage = err?.response?.data?.message || err.message || 'Error al actualizar empleado';
            console.error('update empleado error:', errorMessage);
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const find = async (id: number): Promise<ApiResponse<EmpleadoResponse>> => {
        setLoading(true);
        try {
            const res = await getEmpleado(id);
            setError(null);
            return { success: true, data: res };
        } catch (err: any) {
            const errorMessage = err?.response?.data?.message || err.message || 'Error al buscar empleado';
            console.error('find empleado error:', errorMessage);
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const remove = async (id: number): Promise<ApiResponse<void>> => {
        setLoading(true);
        try {
            await apiDeleteEmpleado(id);
            await fetchAll();
            setError(null);
            return { success: true };
        } catch (err: any) {
            const errorMessage = err?.response?.data?.message || err.message || 'Error al eliminar empleado';
            console.error('delete empleado error:', errorMessage);
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    return { empleados, loading, error, fetchAll, create, update, find, remove };
};

export default useEmpleadosApi;
