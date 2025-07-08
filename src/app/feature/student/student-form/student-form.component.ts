import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { StudentService } from '../../../core/services/student.service';
import { UbigeoService } from '../../../core/services/ubigeo.service';
import { Student } from '../../../core/interfaces/student';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private studentService = inject(StudentService);
  private ubigeoService = inject(UbigeoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  studentForm!: FormGroup;
  isEdit = false;
  studentId: number | null = null;

  departments: any[] = [];
  provinces: any[] = [];
  districts: any[] = [];
  allProvinces: any[] = [];
  allDistricts: any[] = [];

  programs: string[] = ['Ingeniería de Sistemas', 'Administración', 'Contabilidad'];
  cycles: number[] = [1, 2, 3, 4, 5, 6];

  ngOnInit(): void {
    this.initForm();
    this.loadUbigeo();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true;
        this.studentId = +id;
        this.loadStudent(this.studentId);
      }
    });
  }

  initForm(): void {
    this.studentForm = this.fb.group({
      code: [{ value: '', disabled: true }],
      dni: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{8}$/)
        ]
      ],
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]{2,50}$/)
        ]
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]{2,50}$/)
        ]
      ],
      gender: ['', Validators.required],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^9[0-9]{8}$/)
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(100)
        ]
      ],
      address: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100)
        ]
      ],
      department: ['', Validators.required],
      province: ['', Validators.required],
      district: ['', Validators.required],
      academicProgram: ['', Validators.required],
      academicCycle: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(6)
        ]
      ],
      dateRegistration: [
        new Date(),
        [
          Validators.required,
          this.noFutureDateValidator
        ]
      ],
      state: [true]
    });

  }

  noFutureDateValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(value);
    selectedDate.setHours(0, 0, 0, 0);

    return selectedDate > today ? { futureDate: true } : null;
  }

  loadUbigeo(): void {
    this.ubigeoService.getDepartments().subscribe(data => this.departments = data);
    this.ubigeoService.getProvinces().subscribe(data => this.allProvinces = data);
    this.ubigeoService.getDistricts().subscribe(data => this.allDistricts = data);
  }

  onDepartmentChange(): void {
    const selectedDepName = this.studentForm.get('department')?.value;
    const dep = this.departments.find(d => d.name === selectedDepName);
    if (!dep) return;

    this.provinces = this.allProvinces.filter(p => p.department_id === dep.id);
    this.districts = [];
    this.studentForm.patchValue({ province: '', district: '' });
  }

  onProvinceChange(): void {
    const selectedProvName = this.studentForm.get('province')?.value;
    const prov = this.allProvinces.find(p => p.name === selectedProvName);
    if (!prov) return;

    this.districts = this.allDistricts.filter(d => d.province_id === prov.id);
    this.studentForm.patchValue({ district: '' });
  }


  loadStudent(id: number): void {
    this.studentService.getById(id).subscribe(student => {
      this.studentForm.patchValue({
        code: student.code,
        dni: student.dni,
        name: student.name,
        lastName: student.lastName,
        gender: student.gender,
        phone: student.phone,
        email: student.email,
        address: student.address,
        department: student.department,
        province: student.province,
        district: student.district,
        academicProgram: student.academicProgram,
        academicCycle: student.academicCycle,
        dateRegistration: new Date(student.dateRegistration),
        state: student.state
      });

      const dep = this.departments.find(d => d.name === student.department);
      const prov = this.allProvinces.find(p => p.name === student.province);

      this.provinces = dep ? this.allProvinces.filter(p => p.department_id === dep.id) : [];
      this.districts = prov ? this.allDistricts.filter(d => d.province_id === prov.id) : [];
    });
  }

  onSubmit(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }

    const formValue = this.studentForm.getRawValue();
    const student: Student = {
      ...formValue,
      dateRegistration: this.formatDate(formValue.dateRegistration)
    };

    if (this.isEdit && this.studentId !== null) {
      this.studentService.updateStudent(this.studentId, student).subscribe(() => {
        Swal.fire('Actualizado', 'El estudiante ha sido actualizado.', 'success');
        this.router.navigate(['/students']);
      });
    } else {
      this.studentService.createStudent(student).subscribe(() => {
        Swal.fire('Registrado', 'El estudiante ha sido creado.', 'success');
        this.router.navigate(['/students']);
      });
    }
  }

  formatDate(date: any): string {
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  goBack(): void {
    this.router.navigate(['/students']);
  }
}
