export interface Student {
    id: number;
    code: string;
    name: string;
    lastName: string;
    dni: string;
    gender: 'M' | 'F';
    phone: string;
    email: string;
    address: string;
    department: string;
    province: string;
    district: string;
    academicProgram: string;
    academicCycle: number;
    dateRegistration: string; // YYYY-MM-DD
    state: boolean;
}
