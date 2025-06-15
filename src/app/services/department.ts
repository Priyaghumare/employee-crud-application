import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from '../Models/department';
import { Employee } from '../Models/employee';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService  {


  private baseUrl = 'http://localhost:8080/departments';

  constructor(private http: HttpClient) { }

  getAllDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.baseUrl);
  }

  getEmployeesInDepartment(deptId: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/${deptId}/employees`);
  }

  addEmployee(deptId: string, employee: Employee): Observable<Department> {
    return this.http.post<Department>(`${this.baseUrl}/${deptId}/employees`, employee);
  }

  deleteEmployee(deptId: string, empId: string): Observable<Department> {
    return this.http.delete<Department>(`${this.baseUrl}/${deptId}/employees/${empId}`);
  }

  getEmployee(deptId: string, empId: string): Observable<Employee> {
    // Since backend does not have a single employee endpoint,
    // we fetch all employees in the dept and find the employee here
    return new Observable(observer => {
      this.getEmployeesInDepartment(deptId).subscribe(employees => {
        const emp = employees.find(e => e.id === empId);
        observer.next(emp!);
        observer.complete();
      });
    });
  }
}
