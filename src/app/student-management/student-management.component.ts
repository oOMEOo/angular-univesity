import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Student } from '../student';
import { ActivatedRoute, Router } from '@angular/router';
import { UniCrudService } from '../uni-crud.service';


@Component({
  selector: 'app-student-management',
  templateUrl: './student-management.component.html',
  styleUrls: ['./student-management.component.css']
})
export class StudentManagementComponent implements OnInit {
  studentForm: FormGroup;
  currentStudent: Student;

  requestTypes = ['Edit', 'Create'];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uniCrudService: UniCrudService,
    private router: Router
  ) {
    this.studentForm = this.createFormGroupWithBuilderAndModel(formBuilder);
  }

  ngOnInit() {
    this.getStudent();
  }

  getStudent(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.uniCrudService.getStudent(id)
        .subscribe(student => {
          this.currentStudent = student;
          /*
           * Have issues with the subject registrations, as there is no corresponding formGroupControll that represents this object
           * Must instead allocate each field manually and exclude subject_registrations
           */
          // this.studentForm.get('studentData').setValue(this.currentStudent);
          this.studentForm.get('studentData').setValue({
            id: this.currentStudent.id,
            first_name: this.currentStudent.first_name,
            last_name: this.currentStudent.last_name
          });
        });

    } else if (this.currentStudent === undefined) {
      this.currentStudent = new Student();
    }
  }

  createFormGroupWithBuilderAndModel(formBuilder: FormBuilder) {
    return formBuilder.group({
      studentData: formBuilder.group({
        id: { value: -1, disabled: true },
        first_name: '',
        last_name: ''
      })
    });
  }

  onSubmit(studentForm) {
    this.currentStudent = studentForm.getRawValue().studentData;

    if (this.currentStudent.id === -1) {
      let submitValue;
      this.uniCrudService.addStudent(this.currentStudent).subscribe(_val => submitValue = _val);
      console.log(submitValue);
    } else {
      this.uniCrudService.updateStudent(this.currentStudent).subscribe();
    }

    this.router.navigate(['/student']);
  }

  revert() {
    // Resets to blank object
    this.studentForm.reset();

    // Resets to provided model
    this.studentForm.reset({ student: new Student(), requestType: '' });
  }
}
