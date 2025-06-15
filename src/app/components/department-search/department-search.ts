import { Component } from '@angular/core';
import { Employee } from '../../Models/employee';
import { DepartmentService } from '../../services/department';
import { FormsModule } from '@angular/forms';
import { EmployeeList } from '../employee-list/employee-list';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-department-search',
  imports: [FormsModule,EmployeeList,CommonModule],
  templateUrl: './department-search.html',
  styleUrl: './department-search.css'
})
export class DepartmentSearch {
  departmentId: string = '';
  employees: Employee[] = [];
  constructor(private departmentService: DepartmentService) { }
  loadEmployees(): void {
    if(this.departmentId.trim() === '') {
      alert('Please enter Department ID');
      return;
    }
    this.departmentService.getEmployeesInDepartment(this.departmentId).subscribe({
      //next: (emps) => this.employees = emps || [],
      next: (emps: Employee[]) => {
        this.employees = emps || [];
      },
      error: () => alert('Department not found or error fetching employees')
    });
  }

}
