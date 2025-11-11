import { useReducer } from 'react';
import { useEmpleadoApi } from './useEmpleadoApi';

export interface FormEmpleadoData {
  id_empleado: number;
  nombre: string;
  curp: string;
  rfc: string;
  nss: string;
  fecha_nacimiento: string;
  direccion: string;
  telefono: string;
  correo: string;
  cargo: string;
  area: string;
  fecha_ingreso: string;
  cuenta_bancaria: string;
  contacto_exta: string;
  estado_civil: string;
  estudios: string;
  foto_perfil: string;
  ine_anversa: string;
  ine_reverso: string;
  comprobante_domicilio: string;
  constancia_fiscal: string;
  acta_nacimiento: string;
}

interface UseFormEmpleado {
  state: FormEmpleadoData;
  handleInputChange: (fieldName: keyof FormEmpleadoData, value: string | number) => void;
  handleSubmit: () => Promise<any>;
  handleDelete: () => Promise<any>;
}

export const useFormEmpleado = (): UseFormEmpleado => {
  const { createEmpleado, deleteEmpleado, updateEmpleado } = useEmpleadoApi();

  const initialForm: FormEmpleadoData = {
    id_empleado: 0,
    nombre: '',
    curp: '',
    rfc: '',
    nss: '',
    fecha_nacimiento: '',
    direccion: '',
    telefono: '',
    correo: '',
    cargo: '',
    area: '',
    fecha_ingreso: '',
    cuenta_bancaria: '',
    contacto_exta: '',
    estado_civil: '',
    estudios: '',
    foto_perfil: '',
    ine_anversa: '',
    ine_reverso: '',
    comprobante_domicilio: '',
    constancia_fiscal: '',
    acta_nacimiento: '',
  };

  type Action = { type: 'handleInputChange'; payload: { fieldName: keyof FormEmpleadoData; value: string | number } };

  const formReducer = (state: FormEmpleadoData, action: Action) => {
    switch (action.type) {
      case 'handleInputChange':
        return { ...state, [action.payload.fieldName]: action.payload.value } as FormEmpleadoData;
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(formReducer, initialForm);

  const handleInputChange = (fieldName: keyof FormEmpleadoData, value: string | number) => {
    dispatch({ type: 'handleInputChange', payload: { fieldName, value } });
  };

  const handleSubmit = async () => {
    // Convertir todos los campos a string antes de enviar
    const formattedData = Object.entries(state).reduce((acc, [key, value]) => ({
      ...acc,
      [key]: value === null || value === undefined ? '' : String(value)
    }), {});

    console.log('[useFormEmpleado] Datos formateados:', formattedData);

    if (state.id_empleado === 0) {
      return await createEmpleado(formattedData as FormEmpleadoData);
    }
    return await updateEmpleado(formattedData as FormEmpleadoData);
  };

  const handleDelete = async () => {
    if (!state.id_empleado || state.id_empleado === 0) {
      throw new Error('No se puede eliminar un empleado sin ID');
    }
    
    // Asegurarnos de que el ID esté presente y sea un número
    const formattedData = {
      ...state,
      id_empleado: Number(state.id_empleado)
    };

    console.log('[useFormEmpleado] Intentando eliminar empleado:', formattedData.id_empleado);
    return await deleteEmpleado(formattedData);
  };

  return { state, handleInputChange, handleSubmit, handleDelete };
};

export default useFormEmpleado;
