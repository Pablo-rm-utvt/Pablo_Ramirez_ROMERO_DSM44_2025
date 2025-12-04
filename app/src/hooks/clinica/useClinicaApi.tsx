import { useEffect, useState } from 'react';
import axios from 'axios';
import { clinicaApi } from '../../api/clinicaApi';
import { Clinica, ClinicaResponse } from '../../interfaces/clinicaInterfaces';

export const useClinicaApi = () => {
    const [estaCargando, setEstaCargando] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pacientes, setPacientes] = useState<Clinica[]>([]);

    const cargarPacientes = async () => {
        setEstaCargando(true);
        setError(null);
        try {
            const response = await clinicaApi.get<Clinica[]>('/api/pacientes');
            setPacientes(response.data);
        } catch (err) {
            const msg = axios.isAxiosError(err)
                ? err.response?.data?.message || err.message
                : 'Error al cargar los pacientes';
            setError(msg);
        } finally {
            setEstaCargando(false);
        }
    };

    const createPaciente = async (paciente: Omit<Clinica, 'id'>) => {
        setEstaCargando(true);
        try {
            const response = await clinicaApi.post<ClinicaResponse>('/api/pacientes', paciente);
            setPacientes(prev => [...prev, response.data]);
            return { success: true, data: response.data };
        } catch (err) {
            const msg = axios.isAxiosError(err)
                ? err.response?.data?.message || err.message
                : '';
            setError(msg);
            return { success: false, error: msg };
        } finally {
            setEstaCargando(false);
        }
    };

    const updatePaciente = async (id: number, paciente: Partial<Clinica>) => {
        setEstaCargando(true);
        try {
            const response = await clinicaApi.put<ClinicaResponse>(`/api/pacientes/${id}`, paciente);
            setPacientes(prev => prev.map(p => p.id === id ? response.data : p));
            return { success: true, data: response.data };
        } catch (err) {
            const msg = axios.isAxiosError(err)
                ? err.response?.data?.message || err.message
                : '';
            setError(msg);
            return { success: false, error: msg };
        } finally {
            setEstaCargando(false);
        }
    };

    const deletePaciente = async (id: number) => {
        setEstaCargando(true);
        try {
            await clinicaApi.delete(`/api/pacientes/${id}`);
            setPacientes(prev => prev.filter(p => p.id !== id));
            return { success: true };
        } catch (err) {
            const msg = axios.isAxiosError(err)
                ? err.response?.data?.message || err.message
                : 'Error al eliminar el paciente';
            setError(msg);
            return { success: false, error: msg };
        } finally {
            setEstaCargando(false);
        }
    };

    useEffect(() => {
        cargarPacientes();
    }, []);

    return {
        estaCargando,
        error,
        pacientes,
        cargarPacientes,
        createPaciente,
        updatePaciente,
        deletePaciente
    };
};