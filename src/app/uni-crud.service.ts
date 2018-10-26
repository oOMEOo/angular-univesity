import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Student } from './student';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

const baseUrl = 'http://localhost:63718/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class UniCrudService {

  studentList = null;

  constructor(private http: HttpClient) { }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(baseUrl + 'api/student', httpOptions)
      .pipe(
        tap(n => console.log('getStudents(): I\'m emitting this value:', n)),
        catchError(this.handleError('getStudents', []))
      );
  }

  getStudent(id: number): Observable<Student> {
    return this.http.get<Student>(baseUrl + `api/student/${id}`, httpOptions)
      .pipe(
        tap(n => console.log('getStudent(Id): I\'m emitting this value:', n)),
        catchError(this.handleError<Student>(`getStudent id=${id}`))
      );
  }

  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(baseUrl + 'api/student', student, httpOptions)
      .pipe(
        catchError(this.handleError<Student>('addStudent'))
      );
  }

  updateStudent(student: Student): Observable<any> {
    return this.http.put<any>(baseUrl + `api/student/${student.id}`, student, httpOptions)
      .pipe(
        map ( response => {
            console.log('updateStudent(Student): I\'m emitting this value:', response);
            if (response.status !== 204) {
              throw new Error('Update Student request has failed with response: ' + response.status);
            }
        }),
        catchError(this.handleError<any>(`updateStudent id=${student.id}`))
      );
  }

  deleteStudent(id: number): Observable<Student> {
    return this.http.delete<Student>(baseUrl + `api/student/${id}`, httpOptions)
      .pipe(
        tap(n => console.log('deleteStudent: I\'m emitting this value:', n)),
        catchError(this.handleError<Student>(`updateStudent id=${id}`))
      );
  }

  private handleError<T>(operation, result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

