import axios from "axios";

const BASE_URL = "http://192.168.100.12:3000/api/empleados";

export const empleadosApi = axios.create();

// Rutas de empleados
export const empleadosEndpoints = {
    // Obtener lista de empleados
    getAllEmpleados: () => `${BASE_URL}`,

    // Obtener empleado por ID
    getEmpleadoById: (id_empleado: number) => `${BASE_URL}/${id_empleado}`,

    // Obtener asistencia de un empleado
    getAsistenciaEmpleado: (id_empleado: number, fechaInicio: string, fechaFin: string) =>
        `${BASE_URL}/asistencia-empleado?id_empleado=${id_empleado}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`,

    // Obtener nómina
    getNomina: () => `${BASE_URL}/nomina`,

    // Obtener días trabajados
    getDiasTrabajados: () => `${BASE_URL}/dias-trabajados`,

    // Obtener reporte de asistencia por empleado
    getReporteAsistenciaEmpleado: (id_empleado: number, fechaInicio: string, fechaFin: string) =>
        `${BASE_URL}/reporte-asistencia-empleado?id_empleado=${id_empleado}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`,

    // Obtener reporte de producción
    getReporteProduccion: () => `${BASE_URL}/reporte-produccion`,

    // Obtener horas trabajadas
    getHorasTrabajadas: () => `${BASE_URL}/horas-trabajadas`,

    // Obtener unidades producidas
    getUnidadesProducidas: () => `${BASE_URL}/unidades-producidas`,
};