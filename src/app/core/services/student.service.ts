import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../interfaces/student';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = `${environment.urlBackEnd}`;

  constructor(private http: HttpClient) {}

  // Obtener todos los estudiantes
  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.baseUrl);
  }

  // Obtener estudiante por ID
  getById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.baseUrl}/${id}`);
  }

  // Filtrar por programa académico
  getByAcademicProgram(program: string): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/academic-program/${program}`);
  }

  getBySearchText(text: string): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/search?text=${text}`);
  }


  // Filtrar por ciclo académico
  getByAcademicCycle(cycle: number): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/academic-cycle/${cycle}`);
  }

  // Filtrar por estado (activo/inactivo)
  getByState(state: boolean): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/state/${state}`);
  }

  // Filtrar por ubicación (cada uno por separado)
  getByDepartment(department: string): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/department/${department}`);
  }

  getByProvince(province: string): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/province/${province}`);
  }

  getByDistrict(district: string): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/district/${district}`);
  }

  // Obtener listas para selects de ubicación
  getAllDepartments(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/locations/departments`);
  }

  getProvincesByDepartment(department: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/locations/provinces?department=${department}`);
  }

  getDistrictsByDeptAndProv(department: string, province: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/locations/districts?department=${department}&province=${province}`);
  }

  // Crear nuevo estudiante
  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.baseUrl}/save`, student);
  }

  // Actualizar estudiante existente
  updateStudent(id: number, student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.baseUrl}/update/${id}`, student);
  }

  // Eliminar estudiante (lógico)
  deleteStudent(id: number): Observable<Student> {
    return this.http.post<Student>(`${this.baseUrl}/delete/${id}`, {});
  }

  // Restaurar estudiante
  restoreStudent(id: number): Observable<Student> {
    return this.http.post<Student>(`${this.baseUrl}/restore/${id}`, {});
  }

  // Exportar a PDF
  exportToPDF(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/pdf`, { responseType: 'blob' });
  }
}
