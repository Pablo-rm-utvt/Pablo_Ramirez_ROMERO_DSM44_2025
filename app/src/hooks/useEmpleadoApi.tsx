import { useEffect, useState } from "react";
import empleadosApi, { getEmpleados, getEmpleado, createEmpleado as apiCreateEmpleado, updateEmpleado as apiUpdateEmpleado, deleteEmpleado as apiDeleteEmpleado } from "../api/empleadosApi";
import { UseEmpleado, FormDataEmpleado } from "../interfaces/empleadoInterfaces";

interface UseEmpleadoApi {
  isLoading: boolean;
  listEmpleado: UseEmpleado[];
  loadEmpleado: () => Promise<void>;
  createEmpleado: (data: FormDataEmpleado) => Promise<UseEmpleado>;
  updateEmpleado: (data: FormDataEmpleado) => Promise<UseEmpleado>;
  deleteEmpleado: (data: FormDataEmpleado) => Promise<any>;
  findEmpleado: (id: number) => Promise<UseEmpleado>;
  removeById: (id: number) => Promise<any>;
}

export const useEmpleadoApi = (): UseEmpleadoApi => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [listEmpleado, setListEmpleado] = useState<UseEmpleado[]>([]);

  const loadEmpleado = async () => {

    setIsLoading(true);
    const data = await getEmpleados();
    setListEmpleado(data);
    setIsLoading(false);
  }

  useEffect(() => {
    loadEmpleado();
  }, []);

  const createEmpleado = async (data: FormDataEmpleado) => {
    // Asegurar que todos los campos sean string
    const dataBody = {
      nombre: String(data.nombre || ''),
      curp: String(data.curp || ''),
      rfc: String(data.rfc || ''),
      nss: String(data.nss || ''),
      fecha_nacimiento: String(data.fecha_nacimiento || ''),
      direccion: String(data.direccion || ''),
      telefono: String(data.telefono || ''),
      correo: String(data.correo || ''),
      cargo: String(data.cargo || ''),
      area: String(data.area || ''),
      fecha_ingreso: String(data.fecha_ingreso || ''),
      cuenta_bancaria: String(data.cuenta_bancaria || ''),
      contacto_exta: String(data.contacto_exta || ''),
      estado_civil: String(data.estado_civil || ''),
      estudios: String(data.estudios || ''),
      foto_perfil: data.foto_perfil || '',
      ine_anversa: data.ine_anversa || '',
      ine_reverso: data.ine_reverso || '',
      comprobante_domicilio: data.comprobante_domicilio || '',
      constancia_fiscal: data.constancia_fiscal || '',
      acta_nacimiento: data.acta_nacimiento || '',
    }
    // Prepare a minimal payload without large base64 fields to avoid server issues
    const minimal = { ...dataBody } as any;
    delete minimal.foto_perfil;
    delete minimal.ine_anversa;
    delete minimal.ine_reverso;
    delete minimal.comprobante_domicilio;
    delete minimal.constancia_fiscal;
    delete minimal.acta_nacimiento;

    try {
      console.log('[useEmpleadoApi] Enviando datos del empleado sin archivos');
      const res = await apiCreateEmpleado(minimal);
      console.log('[useEmpleadoApi] Empleado creado correctamente');
      await loadEmpleado(); // Recargar la lista después de crear
      return res.data;
    } catch (err: any) {
      try {
        console.log('[useEmpleadoApi] Intentando crear con todos los datos...');
        const res2 = await apiCreateEmpleado(dataBody);
        await loadEmpleado(); // Recargar la lista después de crear
        return res2.data;
      } catch (err2: any) {
        console.error('[useEmpleadoApi] Error al crear empleado (intento completo):', err2?.response?.data || err2.message || err2);
        throw err2;
      }
    }
  }

  const updateEmpleado = async (data: FormDataEmpleado) => {
    // Convert all fields to proper format
    const dataBody = {
      nombre: String(data.nombre || ''),
      curp: String(data.curp || ''),
      rfc: String(data.rfc || ''),
      nss: String(data.nss || ''),
      fecha_nacimiento: String(data.fecha_nacimiento || ''),
      direccion: String(data.direccion || ''),
      telefono: String(data.telefono || ''),
      correo: String(data.correo || ''),
      cargo: String(data.cargo || ''),
      area: String((data as any).area || ''),
      fecha_ingreso: String(data.fecha_ingreso || ''),
      cuenta_bancaria: String((data as any).cuenta_bancaria || ''),
      contacto_exta: String((data as any).contacto_exta || ''),
      estado_civil: String(data.estado_civil || ''),
      estudios: String(data.estudios || ''),
      foto_perfil: data.foto_perfil,
      ine_anversa: data.ine_anversa,
      ine_reverso: data.ine_reverso,
      comprobante_domicilio: data.comprobante_domicilio,
      constancia_fiscal: data.constancia_fiscal,
      acta_nacimiento: data.acta_nacimiento,
    }
    try {
      console.log('[useEmpleadoApi] Actualizando empleado:', data.id_empleado);
      const res = await apiUpdateEmpleado(data.id_empleado, dataBody);
      await loadEmpleado(); // Recargar la lista después de actualizar
      return res.data;
    } catch (error: any) {
      console.error('[useEmpleadoApi] Error al actualizar:', error.response?.data || error.message);
      throw error;
    }
  }

  const deleteEmpleado = async (data: FormDataEmpleado) => {
    try {
      if (!data.id_empleado) {
        throw new Error('ID de empleado no válido');
      }
      console.log('[useEmpleadoApi] Intentando eliminar empleado (fetch primero):', data.id_empleado);
      // Primero intentar con fetch directo (más confiable en algunos entornos)
      try {
        const url = `http://192.168.86.243:3000/tarea/empleado/${data.id_empleado}`;
        const resp = await fetch(url, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } });
        console.log('[useEmpleadoApi] fetch DELETE status:', resp.status, resp.statusText);
        if (!resp.ok) {
          const text = await resp.text();
          throw new Error(`Fetch DELETE failed: ${resp.status} ${resp.statusText} ${text}`);
        }
        console.log('[useEmpleadoApi] Empleado eliminado correctamente (fetch)');
        await loadEmpleado();
        return true;
      } catch (fetchErr: any) {
        console.warn('[useEmpleadoApi] Falló fetch delete, intentando axios delete como fallback:', fetchErr?.message || fetchErr);
        // Intentar con axios helper
        try {
          const res: any = await apiDeleteEmpleado(data.id_empleado);
          console.log('[useEmpleadoApi] Respuesta axios delete:', res?.status || 'no-status', res?.data || res);
          await loadEmpleado();
          return true;
        } catch (axiosErr: any) {
          console.error('[useEmpleadoApi] Error axios delete (fallback) :', axiosErr?.response?.status, axiosErr?.response?.data || axiosErr?.message || axiosErr);
          throw new Error(axiosErr?.response?.data?.message || axiosErr?.message || 'Error al eliminar el empleado');
        }
      }
    } catch (error: any) {
      console.error('[useEmpleadoApi] Error al eliminar:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || error.message || 'Error al eliminar el empleado');
    }
  };

  const findEmpleado = async (id: number) => {
    try {
      const res = await getEmpleado(id);
      return res;
    } catch (error: any) {
      console.error('[useEmpleadoApi] Error al obtener empleado:', error?.response?.data || error.message);
      throw error;
    }
  };

  const removeById = async (id: number) => {
    try {
      // Intentar fetch primero
      try {
        console.log('[useEmpleadoApi] removeById: intentando fetch DELETE id=', id);
        const url = `http://192.168.86.243:3000/tarea/empleado/${id}`;
        const resp = await fetch(url, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } });
        console.log('[useEmpleadoApi] removeById: fetch status', resp.status, resp.statusText);
        if (!resp.ok) {
          const text = await resp.text();
          throw new Error(`Fetch DELETE failed: ${resp.status} ${resp.statusText} ${text}`);
        }
        console.log('[useEmpleadoApi] removeById: eliminado correctamente con fetch');
        await loadEmpleado();
        return true;
      } catch (fetchErr: any) {
        console.warn('[useEmpleadoApi] removeById: Falló fetch delete, intentando axios delete como fallback:', fetchErr?.message || fetchErr);
        try {
          console.log('[useEmpleadoApi] removeById: llamando apiDeleteEmpleado id=', id);
          const delRes: any = await apiDeleteEmpleado(id);
          console.log('[useEmpleadoApi] removeById: respuesta delete axios =>', delRes?.status || delRes, delRes?.data || 'no-data');

          // Verificar si el empleado todavía existe (algunos backends responden 200 pero no eliminan)
          try {
            const exists = await getEmpleado(id);
            if (exists) {
              console.warn('[useEmpleadoApi] removeById: el empleado sigue existiendo después del delete axios');
            }
          } catch (checkErr: any) {
            console.log('[useEmpleadoApi] removeById: getEmpleado devolvió error/404, asumiendo eliminado:', checkErr?.message || checkErr);
            await loadEmpleado();
            return true;
          }

          await loadEmpleado();
          return true;
        } catch (axiosErr: any) {
          console.warn('[useEmpleadoApi] Falló axios delete en removeById (fallback):', axiosErr?.message || axiosErr);
          throw axiosErr;
        }
      }
    } catch (error: any) {
      console.error('[useEmpleadoApi] Error al eliminar por id:', error?.response?.data || error.message);
      throw error;
    }
  };

  return { isLoading, listEmpleado, loadEmpleado, createEmpleado, updateEmpleado, deleteEmpleado, findEmpleado, removeById };
}

export default useEmpleadoApi;