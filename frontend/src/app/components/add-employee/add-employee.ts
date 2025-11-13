import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee';
import { Employee } from '../../models/employee.model';


@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-employee.html',
  styleUrls: ['./add-employee.css']
})
export class AddEmployeeComponent {
  employee: Employee = {
    name: '',
    email: '',
    position: ''
  };

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  saveEmployee() {
    this.employeeService.create(this.employee).subscribe({
      next: (res) => {
        alert('Employee added successfully!');
        this.router.navigateByUrl('/', { skipLocationChange: false }).then(() => {
        this.router.navigate(['/']);
      });
      },
      error: (err) => {
        console.error('Error adding employee:', err);
        alert('Something went wrong!');
      }
    });
  }
}
