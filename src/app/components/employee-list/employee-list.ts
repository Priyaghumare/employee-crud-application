import { Component ,Input } from '@angular/core';
import { DepartmentService } from '../../services/department';
import { Employee } from '../../Models/employee';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-employee-list',
  imports: [CommonModule],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css'
})
export class EmployeeList {
  @Input() employees: Employee[] = [];
  @Input() departmentId!: string;

  constructor(private router: Router, private departmentService: DepartmentService) { }

  viewEmployee(emp: Employee): void {
    this.router.navigate(['/employee-detail', this.departmentId, emp.id]);
  }

  deleteEmployee(emp: Employee, event: Event): void {
    event.stopPropagation();
    if (confirm(`Delete employee ${emp.name}?`)) {
      this.departmentService.deleteEmployee(this.departmentId, emp.id).subscribe({
        next: (updatedDept) => {
          // Remove employee from list
          this.employees = this.employees.filter(e => e.id !== emp.id);
        },
        error: () => alert('Failed to delete employee')
      });
    }
  }

}
