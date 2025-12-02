export interface PacientesActivos {
    id_paciente: number;
    nombre: string;
    apellido: string;
    fecha_nacimiento: string;
    sexo: string;
    telefono: string;
    direccion: string;
    tipo_sangre: string;
    alergias: string;
    activo: number;
}

export interface Pacientes {
    data: PacientesActivos[];
    next?: string;
}

export interface CreatePacienteDto {
    nombre: string;
    apellido: string;
    fecha_nacimiento: string;
    sexo: string;
    telefono: string;
    direccion: string;
    tipo_sangre: string;
    alergias: string;
}

export interface CitasPaciente {
    id_cita: number;
    id_paciente: number;
    fecha: string;
    hora: string;
    motivo: string;
    medico_asignado: string;
    estatus: string;
}

export interface Tratamientos {
    id_tratamiento: number;
    id_paciente: number;
    diagnostico: string;
    medicamento: string;
    dosis: string;
    fecha_inicio: string;
    fecha_fin: string;
    notas: string;
}

export interface Medicamentos {
    id_medicamento: number;
    id_paciente: number;
    medicamento: string;
    dosis: string;
    frecuencia: string;
    fecha_inicio: string;
    fecha_fin: string;
}

export interface CitasCanceladas {
    id_cita: number;
    id_paciente: number;
    fecha: string;
    razon_cancelacion: string;
}

export interface PacientesPorTipoSangre {
    id_paciente: number;
    nombre: string;
    apellido: string;
    tipo_sangre: string;
}

// ==================== HOOK RETURN TYPES ====================

export interface UsePacientesActivosReturn {
    pacientes: PacientesActivos[];
    isLoading: boolean;
    loadPacientes: (refresh?: boolean) => Promise<void>;
}

export interface UsePacienteCompletoReturn {
    paciente: any | null;
    isLoading: boolean;
    loadPacienteData: (idPaciente: number) => void;
}

export interface UseCitasPacienteReturn {
    citas: CitasPaciente[];
    isLoading: boolean;
    loadCitas: (idPaciente: number) => void;
}

export interface UseMedicamentosPacienteReturn {
    medicamentos: any[];
    isLoading: boolean;
    loadMedicamentos: (idPaciente: number) => void;
}

export interface UseTratamientosReturn {
    tratamientos: Tratamientos[];
    isLoading: boolean;
    loadTratamientos: (diagnostico: string) => void;
}

export interface UseCitasCanceladasReturn {
    total: number;
    isLoading: boolean;
    loadCitasCanceladas: () => void;
}

export interface UsePacientesPorTipoSangreReturn {
    pacientes: PacientesActivos[];
    isLoading: boolean;
    loadPacientes: (tipoSangre: string) => void;
}

export interface UseCitasPorFechaReturn {
    citas: CitasPaciente[];
    isLoading: boolean;
    loadCitas: (fecha: string) => void;
}
