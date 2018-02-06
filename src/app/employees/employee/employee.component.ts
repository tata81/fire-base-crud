import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { EmployeeService } from '../shared/employee.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService: EmployeeService, private toastrService: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }
  onSubmit(employeeForm: NgForm)  {
    if (employeeForm.value.$key == null) {
      this.employeeService.insertEmployee(employeeForm.value);
    } else {
      this.employeeService.updateEmployee(employeeForm.value);
    }
    this.resetForm();
    this.toastrService.success('Submitted Successfully', 'Employee');
  }
  resetForm(employeeForm?: NgForm) {
    if (employeeForm != null) {
      employeeForm.reset();
    }
    this.employeeService.selectedEmployee = {
      $key: null,
      name: null,
      position: null,
      office: null,
      salary: 0
    };
  }
}
