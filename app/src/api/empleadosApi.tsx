import axios from 'axios';

// Ajusta la URL base según donde corra tu API

export const empleadosApi = axios.create({
	baseURL: 'http://192.168.86.243:3000',
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	}
});

export const getEmpleados = async () => {
	const res = await empleadosApi.get('/api/empleado');
	return res.data;
};

export const getEmpleado = async (id: number) => {
	const res = await empleadosApi.get(`/api/empleado/${id}`);
	return res.data;
};

export const createEmpleado = async (payload: any) => {
	try {
		console.log('[empleadosApi] createEmpleado payload:', payload);
		const res = await empleadosApi.post('/api/empleado', payload);
		return res.data;
	} catch (err: any) {
		console.error('[empleadosApi] createEmpleado error:', err?.response?.data || err.message || err);
		throw err;
	}
};

export const updateEmpleado = async (id: number, payload: any) => {
	const res = await empleadosApi.patch(`/api/empleado/${id}`, payload);
	return res.data;
};

export const deleteEmpleado = async (id: number) => {
	console.log('[empleadosApi] Intentando eliminar empleado:', id);
	try {
		const res = await empleadosApi.delete(`/api/empleado/${id}`);
		console.log('[empleadosApi] Respuesta del servidor (status):', res.status, res.statusText);
		try {
			console.log('[empleadosApi] Respuesta del servidor (data):', res.data);
		} catch (e) {
			console.log('[empleadosApi] No se pudo leer res.data:', e);
		}
		// Devolver el objeto completo para permitir comprobaciones en caller
		return res;
	} catch (error: any) {
		console.error('[empleadosApi] Error al eliminar:', error.response?.status, error.response?.data || error.message || error);
		throw error;
	}
};

export default empleadosApi;