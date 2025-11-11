import { Clinica } from '../interfaces/clinicaInterfaces';

export type RootStackParamList = {
    HomeClinica: undefined;
    PacienteDetail: {
        paciente: Clinica;
    };
    FormPaciente: {
        pacienteId?: string | number;
    };
};