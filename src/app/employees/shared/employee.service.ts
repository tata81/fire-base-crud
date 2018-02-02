import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { AngularFireDatabaseModule, AngularFireList, AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class EmployeeService {
  // Collection of employees that are inserted into firebase
  employeeList: AngularFireList<any>;
  // To store currently active employee
  selectedEmployee: Employee = new Employee();
  constructor( private firebase: AngularFireDatabase ) { }
  getData() {
    this.employeeList = this.firebase.list('employee');
    return this.employeeList;
  }
  insertEmployee(employee: Employee ) {
    this.employeeList.push({
      name: employee.name,
      position: employee.position,
      office: employee.office,
      salary: employee.salary
    });
  }
  updateEmployee( employee: Employee) {
    this.employeeList.update(employee.$key,
      {
        name: employee.name,
        position: employee.position,
        office: employee.office,
        salary: employee.salary
      });
  }
  deleteEmployee( $key: string)  {
    this.employeeList.remove($key);
  }

}
