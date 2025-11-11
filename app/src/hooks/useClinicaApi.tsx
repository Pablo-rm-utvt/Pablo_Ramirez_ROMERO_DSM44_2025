import { useEffect, useState } from 'react';
import axios from 'axios';
import { clinicaApi } from '../api/clinicaApi';
import { Clinica, ClinicaResponse } from '../interfaces/clinicaInterfaces';

export const useClinicaApi = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pacientes, setPacientes] = useState<Clinica[]>([]);

    const loadPacientes = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await clinicaApi.get<Clinica[]>('/api/clinica');
            setPacientes(response.data);
            return { success: true, data: response.data };
        } catch (error) {
            let errorMessage = 'Error al cargar los pacientes';
            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || error.message;
            }
            return { success: false, error: errorMessage };
        } finally {
            setIsLoading(false);
        }
    };

    const createPaciente = async (paciente: Omit<Clinica, 'id'>) => {
        setIsLoading(true);
        setError(null);
        try {
            // Añadimos los campos requeridos por el backend aunque no los pidamos en el formulario
            const pacienteConCamposRequeridos = {
                ...paciente,
                peso: 0,
                estatura: 0
            };
            const response = await clinicaApi.post<ClinicaResponse>('/api/clinica', pacienteConCamposRequeridos);
            setPacientes(prevPacientes => [...prevPacientes, response.data]);
            return { success: true, data: response.data };
        } catch (error) {
            let errorMessage = 'Error al crear el paciente';
            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || error.message;
            }
            setError(errorMessage);
            console.error('Error creating paciente:', errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setIsLoading(false);
        }
    };

    const updatePaciente = async (id: number, paciente: Partial<Clinica>) => {
        setIsLoading(true);
        setError(null);
        try {
            // Añadimos los campos requeridos por el backend aunque no los pidamos en el formulario
            const pacienteConCamposRequeridos = {
                ...paciente,
                peso: 0,
                estatura: 0
            };
            const response = await clinicaApi.put<ClinicaResponse>(`/api/clinica/${id}`, pacienteConCamposRequeridos);
            setPacientes(prevPacientes =>
                prevPacientes.map(p => p.id === id ? response.data : p)
            );
            return { success: true, data: response.data };
        } catch (error) {
            let errorMessage = 'Error al actualizar el paciente';
            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || error.message;
            }
            setError(errorMessage);
            console.error('Error updating paciente:', errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setIsLoading(false);
        }
    };

    const deletePaciente = async (id: number) => {
        setIsLoading(true);
        setError(null);
        try {
            await clinicaApi.delete(`/api/clinica/${id}`);
            setPacientes(prevPacientes =>
                prevPacientes.filter(p => p.id !== id)
            );
            return { success: true };
        } catch (error) {
            let errorMessage = 'Error al eliminar el paciente';
            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || error.message;
            }
            setError(errorMessage);
            console.error('Error deleting paciente:', errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadPacientes();
    }, []);

    return {
        isLoading,
        error,
        pacientes,
        loadPacientes,
        createPaciente,
        updatePaciente,
        deletePaciente
    };
};