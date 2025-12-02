import { useState, useEffect, useRef, useCallback } from 'react';
import { pacientesApi } from '../api/pacientesApi';
import {
  PacientesActivos,
  CitasPaciente,
  Tratamientos,
  UsePacientesActivosReturn,
  UsePacienteCompletoReturn,
  UseCitasPacienteReturn,
  UseMedicamentosPacienteReturn,
  UseTratamientosReturn,
  UseCitasCanceladasReturn,
  UsePacientesPorTipoSangreReturn,
  UseCitasPorFechaReturn,
} from '../interfaces/pacientesInterface';

export const usePacientesActivos = (): UsePacientesActivosReturn => {

  const [pacientes, setPacientes] = useState<PacientesActivos[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const nextPageUrl = useRef<string>("/pacientes/activos?page=1&limit=10");

  const loadPacientes = useCallback(async (refresh: boolean = true) => {
    if (isLoading && !refresh) return;
    setIsLoading(true);

    try {
      // Si es refresh, reinicia la paginación
      if (refresh) {
        nextPageUrl.current = "/pacientes/activos?page=1&limit=10";
      }

      const respuesta = await pacientesApi.get<any>(nextPageUrl.current);

      let data: PacientesActivos[] = [];
      if (Array.isArray(respuesta.data)) {
        data = respuesta.data;
      } else if (respuesta.data?.data) {
        data = respuesta.data.data;
      }

      // Si es refresh, reemplaza los datos; si no, agrega más
      if (refresh) {
        setPacientes(data);
      } else {
        setPacientes((prev) => [...prev, ...data]);
      }

      if (respuesta.data?.next_page_url) {
        nextPageUrl.current = respuesta.data.next_page_url;
      }
    } catch (error) {
      console.error("Error cargando pacientes:", error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  return { pacientes, isLoading, loadPacientes };

};

export const usePacienteCompleto = (): UsePacienteCompletoReturn => {

  const [paciente, setPaciente] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadPacienteData = async (idPaciente: number) => {
    if (isLoading) return;
    setIsLoading(true);

    const response = await pacientesApi.get(`/pacientes/${idPaciente}`);
    setPaciente(response.data);

    setIsLoading(false);
  };

  return { paciente, isLoading, loadPacienteData };

};

export const useCitasPaciente = (): UseCitasPacienteReturn => {

  const [citas, setCitas] = useState<CitasPaciente[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadCitas = async (idPaciente: number) => {
    if (isLoading) return;
    setIsLoading(true);

    const response = await pacientesApi.get<CitasPaciente[]>(`/pacientes/citas-paciente/${idPaciente}`);
    setCitas(response.data);

    setIsLoading(false);
  };

  return { citas, isLoading, loadCitas };

};

export const useMedicamentosPaciente = (): UseMedicamentosPacienteReturn => {

  const [medicamentos, setMedicamentos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadMedicamentos = async (idPaciente: number) => {
    if (isLoading) return;
    setIsLoading(true);

    const response = await pacientesApi.get(`/pacientes/medicamentos/${idPaciente}`);

    const meds = Array.isArray(response.data) ? response.data : response.data?.medicamentos || [];
    setMedicamentos(meds);

    setIsLoading(false);
  };

  return { medicamentos, isLoading, loadMedicamentos };

};

export const useTratamientosPorDiagnostico = (): UseTratamientosReturn => {

  const [tratamientos, setTratamientos] = useState<Tratamientos[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadTratamientos = async (diagnostico: string) => {
    if (isLoading) return;
    setIsLoading(true);

    const response = await pacientesApi.get(`/pacientes/tratamientos-diagnostico/${diagnostico}?page=1&limit=10`);

    const data = Array.isArray(response.data) ? response.data : response.data?.data || [];
    setTratamientos(data);

    setIsLoading(false);
  };

  return { tratamientos, isLoading, loadTratamientos };

};

export const useCitasCanceladas = (): UseCitasCanceladasReturn => {

  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadCitasCanceladas = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await pacientesApi.get('/pacientes/citas-canceladas');

      // Extraer solo el número, no el objeto completo
      let count = 0;
      if (typeof response.data === 'number') {
        count = response.data;
      } else if (response.data?.total !== undefined) {
        count = response.data.total;
      } else if (response.data?.totalCitasCanceladas !== undefined) {
        count = response.data.totalCitasCanceladas;
      }
      setTotal(count);
    } catch (error) {
      console.error("Error cargando citas canceladas:", error);
      setTotal(0);
    } finally {
      setIsLoading(false);
    }
  };

  return { total, isLoading, loadCitasCanceladas };

};

export const usePacientesPorTipoSangre = (): UsePacientesPorTipoSangreReturn => {

  const [pacientes, setPacientes] = useState<PacientesActivos[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadPacientes = async (tipoSangre: string) => {
    if (isLoading) return;
    setIsLoading(true);

    const response = await pacientesApi.get(`/pacientes/tipo-sangre/${tipoSangre}?page=1&limit=10`);

    const data = Array.isArray(response.data) ? response.data : response.data?.data || [];
    setPacientes(data);

    setIsLoading(false);
  };

  return { pacientes, isLoading, loadPacientes };

};

export const useCitasPorFecha = (): UseCitasPorFechaReturn => {

  const [citas, setCitas] = useState<CitasPaciente[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadCitas = async (fecha: string) => {
    if (isLoading) return;
    setIsLoading(true);

    const response = await pacientesApi.get(`/pacientes/citas-fecha/${fecha}?page=1&limit=10`);

    const data = Array.isArray(response.data) ? response.data : response.data?.data || [];
    setCitas(data);

    setIsLoading(false);
  };

  return { citas, isLoading, loadCitas };

};
