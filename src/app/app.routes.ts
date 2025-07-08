import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { StudentListComponent } from './feature/student/student-list/student-list.component';
import { StudentFormComponent } from './feature/student/student-form/student-form.component';

export const routes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            { path: '', redirectTo: 'students', pathMatch: 'full' },
            { path: 'students', component: StudentListComponent },
            { path: 'students/new', component: StudentFormComponent },
            { path: 'students/edit/:id', component: StudentFormComponent }
        ]
    }
];
