import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { element } from 'protractor';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employeeList: Employee[];
  constructor(private employeeService: EmployeeService, private toastr: ToastrService) { }

  ngOnInit() {
    const a = this.employeeService.getData();
    a.snapshotChanges().subscribe(item => {
      this.employeeList = [];
      item.forEach(elem => {
        const y = elem.payload.toJSON();
        y['$key'] = elem.key;
        this.employeeList.push(y as Employee);
      });
    });
  }
  onEdit(emp: Employee) {
    this.employeeService.selectedEmployee = Object.assign({}, emp);
  }
  onDelete(key: string) {
    if (confirm('Are you sure?') === true) {
      this.employeeService.deleteEmployee(key);
      this.toastr.warning('Deleted Succefully', 'Employee register');
    }
  }
}
