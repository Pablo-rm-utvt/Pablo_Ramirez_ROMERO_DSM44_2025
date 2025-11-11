import { Clinica } from '../interfaces/clinicaInterfaces';

export type RootStackParamList = {
    HomeClinica: undefined;
    FormPaciente: { pacienteId?: number };
    PacienteDetail: { paciente: Clinica };
};