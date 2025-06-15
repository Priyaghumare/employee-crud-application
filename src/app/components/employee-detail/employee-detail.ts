import { Component,OnInit  } from '@angular/core';
import { Employee } from '../../Models/employee';
import { DepartmentService } from '../../services/department';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';





@Component({
  selector: 'app-employee-detail',
  imports: [FormsModule],
  templateUrl: './employee-detail.html',
  styleUrl: './employee-detail.css'
})
export class EmployeeDetail implements OnInit {
  //employee?: Employee;
  departmentId!: string;
  employeeId!: string;
  editMode = false;
  employee: Employee = {
    id: '',
    name: '',
    email: '',
    position: '',
    salary: 0
  };
  constructor(
  private route: ActivatedRoute,
    private router: Router,
    private departmentService: DepartmentService){}
    ngOnInit(): void {
      this.departmentId = this.route.snapshot.params['deptId'];
      this.employeeId = this.route.snapshot.params['empId'];
  
      this.departmentService.getEmployee(this.departmentId, this.employeeId).subscribe({
        next: (emp: Employee) => this.employee = emp,
        error: () => alert('Employee not found')
      });
    }
  
    save(): void {
      if (!this.employee) return;
  
      // To save, we delete the old employee and add updated one
      this.departmentService.deleteEmployee(this.departmentId, this.employeeId).subscribe({
        next: () => {
          this.departmentService.addEmployee(this.departmentId, this.employee!).subscribe({
            next: () => {
              alert('Employee updated!');
              this.router.navigate(['/']);
            },
            error: () => alert('Failed to update employee')
          });
        },
        error: () => alert('Failed to update employee')
      });
    }
  
    delete(): void {
      if (confirm('Are you sure to delete this employee?')) {
        this.departmentService.deleteEmployee(this.departmentId, this.employeeId).subscribe({
          next: () => {
            alert('Employee deleted!');
            this.router.navigate(['/']);
          },
          error: () => alert('Failed to delete employee')
        });
      }
    }
}
