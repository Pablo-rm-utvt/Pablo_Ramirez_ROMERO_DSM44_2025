export const VALID_SEX = ['M', 'F', 'Otro'] as const;
export type ValidSex = typeof VALID_SEX[number];

export const VALID_CIVIL_STATUS = ['Soltero/a', 'Casado/a', 'Divorciado/a', 'Viudo/a', 'Otro'] as const;
export type ValidCivilStatus = typeof VALID_CIVIL_STATUS[number];

export const VALID_BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as const;
export type ValidBloodType = typeof VALID_BLOOD_TYPES[number];

export const isValidDate = (date: string): boolean => {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
};

export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

export const isValidCURP = (curp: string): boolean => {
    const curpRegex = /^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[0-9A-Z][0-9]$/;
    return curpRegex.test(curp);
};

export const isNumericString = (value: string): boolean => {
    return /^\d+$/.test(value);
};

export const formatErrors = (errors: Record<string, string>): string => {
    return Object.entries(errors)
        .map(([field, error]) => `${field}: ${error}`)
        .join('\n');
};