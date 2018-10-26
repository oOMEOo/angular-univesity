import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { UniCrudService } from '../uni-crud.service';
import { Student } from '../student';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  @Input() studentList: Student[];

  constructor(private uniCrudService: UniCrudService, private chg: ChangeDetectorRef) { }

  ngOnInit() {
    this.getStudents();
  }

  getStudents(): void {
    this.uniCrudService.getStudents()
      .subscribe(_studentList => this.studentList = _studentList);
  }

  deleteStudent(id: number) {
    this.uniCrudService.deleteStudent(id)
      .subscribe(res => {
        console.log(`deleteStudent: ${JSON.stringify(res)}`);
        this.getStudents();
      });
  }
}
