import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentManagementComponent } from './student-management/student-management.component';
import { StudentsComponent } from './students/students.component';

const routes: Routes = [
  { path: 'student/:id', component: StudentManagementComponent },
  { path: 'student/create', component: StudentManagementComponent },
  { path: 'student', component: StudentsComponent },
  { path: '', redirectTo: '/student', pathMatch: 'full' }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
