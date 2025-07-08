import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

import { Student } from '../../../core/interfaces/student';
import { StudentService } from '../../../core/services/student.service';
import { UbigeoService } from '../../../core/services/ubigeo.service';

@Component({
  selector: 'app-student-list',
  standalone: true,
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ]
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  allStudents: Student[] = [];

  // Filtros
  filter = {
    searchText: '',
    academicProgram: '',
    state: '',
    department: '',
    province: '',
    district: ''
  };

  departments: any[] = [];
  provinces: any[] = [];
  districts: any[] = [];

  academicPrograms: string[] = [];

  constructor(
    private studentService: StudentService,
    private ubigeoService: UbigeoService
  ) {}

  ngOnInit(): void {
    this.loadDepartments();
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getAllStudents().subscribe({
      next: (res) => {
        this.students = res;
        this.allStudents = res;
        this.academicPrograms = [...new Set(res.map(s => s.academicProgram))].sort();
      },
      error: () => Swal.fire('Error', 'No se pudieron cargar los estudiantes', 'error')
    });
  }

  loadDepartments(): void {
    this.ubigeoService.getDepartments().subscribe({
      next: (res) => this.departments = res,
      error: () => Swal.fire('Error', 'No se pudieron cargar los departamentos', 'error')
    });
  }

  onDepartmentChange(): void {
    this.filter.province = '';
    this.filter.district = '';
    this.provinces = [];
    this.districts = [];

    if (this.filter.department) {
      this.ubigeoService.getProvinces().subscribe({
        next: (res) => {
          this.provinces = res.filter(p => p.department_id === this.filter.department);
        },
        error: () => Swal.fire('Error', 'No se pudieron cargar las provincias', 'error')
      });

      const departmentName = this.departments.find(dep => dep.id === this.filter.department)?.name;
      if (departmentName) {
        this.studentService.getByDepartment(departmentName).subscribe({
          next: (res) => {
            this.students = res;
            this.allStudents = res;
            this.applyClientFilters();
          },
          error: () => Swal.fire('Error', 'Error al filtrar por departamento', 'error')
        });
      }
    } else {
      this.loadStudents();
    }
  }

  onProvinceChange(): void {
    this.filter.district = '';
    this.districts = [];

    if (this.filter.province) {
      this.ubigeoService.getDistricts().subscribe({
        next: (res) => {
          this.districts = res.filter(d =>
            d.department_id === this.filter.department &&
            d.province_id === this.filter.province
          );
        },
        error: () => Swal.fire('Error', 'No se pudieron cargar los distritos', 'error')
      });

      const provinceName = this.provinces.find(p => p.id === this.filter.province)?.name;
      if (provinceName) {
        this.studentService.getByProvince(provinceName).subscribe({
          next: (res) => {
            this.students = res;
            this.allStudents = res;
            this.applyClientFilters();
          },
          error: () => Swal.fire('Error', 'Error al filtrar por provincia', 'error')
        });
      }
    } else {
      this.onDepartmentChange();
    }
  }

  onDistrictChange(): void {
    if (this.filter.district) {
      const districtName = this.districts.find(d => d.id === this.filter.district)?.name;
      if (districtName) {
        this.studentService.getByDistrict(districtName).subscribe({
          next: (res) => {
            this.students = res;
            this.allStudents = res;
            this.applyClientFilters();
          },
          error: () => Swal.fire('Error', 'Error al filtrar por distrito', 'error')
        });
      }
    } else {
      this.onProvinceChange();
    }
  }

  onStateChange(): void {
    if (this.filter.state !== '') {
      const isActive = this.filter.state === 'true';
      this.studentService.getByState(isActive).subscribe({
        next: (res) => {
          this.students = res;
          this.allStudents = res;
          this.applyClientFilters();
        },
        error: () => Swal.fire('Error', 'Error al filtrar por estado', 'error')
      });
    } else {
      this.refreshStudents();
    }
  }

  onAcademicProgramChange(): void {
    if (this.filter.academicProgram) {
      this.studentService.getByAcademicProgram(this.filter.academicProgram).subscribe({
        next: (res) => {
          this.students = res;
          this.allStudents = res;
          this.applyClientFilters();
        },
        error: () => Swal.fire('Error', 'Error al filtrar por programa académico', 'error')
      });
    } else {
      this.refreshStudents();
    }
  }

  applyClientFilters(): void {
    const text = this.filter.searchText.toLowerCase();
    this.students = this.allStudents.filter(student =>
      student.name.toLowerCase().includes(text) ||
      student.lastName.toLowerCase().includes(text) ||
      student.dni.includes(text) ||
      student.email.toLowerCase().includes(text) ||
      student.code.toLowerCase().includes(text)
    );
  }

  onSearchTextChange(): void {
    this.applyClientFilters();
  }

  deleteStudent(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'El estudiante será marcado como inactivo.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.studentService.deleteStudent(id).subscribe(() => {
          Swal.fire('Eliminado', 'El estudiante fue desactivado.', 'success');
          this.refreshStudents();
        });
      }
    });
  }

  restoreStudent(id: number): void {
    Swal.fire({
      title: '¿Restaurar estudiante?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, restaurar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.studentService.restoreStudent(id).subscribe(() => {
          Swal.fire('Restaurado', 'El estudiante fue reactivado.', 'success');
          this.refreshStudents();
        });
      }
    });
  }

  refreshStudents(): void {
    if (this.filter.district) {
      this.onDistrictChange();
    } else if (this.filter.province) {
      this.onProvinceChange();
    } else if (this.filter.department) {
      this.onDepartmentChange();
    } else if (this.filter.state !== '') {
      this.onStateChange();
    } else if (this.filter.academicProgram) {
      this.onAcademicProgramChange();
    } else {
      this.loadStudents();
    }
  }

  reportPdf() {
    this.studentService.exportToPDF().subscribe(blob => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'reporte.pdf'; // nombre temporal
      link.click();
      URL.revokeObjectURL(url);
    });
  }
}
