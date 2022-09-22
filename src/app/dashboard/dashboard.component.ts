import { ApiService } from './../shared/api.service';
import { EmployeeModel } from './../employee-dashboard.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  fromValue!: FormGroup;
  employeemodelobj: EmployeeModel = new EmployeeModel();

  employeeData!: any;

  showAdd!: boolean;
  showUpdate!: boolean;

  constructor(private formbuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.fromValue = this.formbuilder.group({
      firstname: [''],
      lastname: [''],
      email: [''],
    });
    this.getAllEmployee();
  }

  postEmployeeDetails() {
    this.employeemodelobj.firstName = this.fromValue.value.firstname;
    this.employeemodelobj.LastName = this.fromValue.value.lastname;
    this.employeemodelobj.email = this.fromValue.value.email;

    this.api.postEmployee(this.employeemodelobj).subscribe(
      (res) => {
        console.log(res);
        alert('Employee added Successfully');
        this.fromValue.reset();
        let ref = document.getElementById('cancel');
        ref?.click();
        this.getAllEmployee();
      },
      (err) => {
        alert('something worng happen');
      }
    );
  }

  getAllEmployee() {
    this.api.getEmployee().subscribe((res) => {
      this.employeeData = res;
    });
  }

  deleteEmployee(row: any) {
    this.api.deleteEmployee(row.id).subscribe((res) => {
      alert('Employee Deleted Sucessfully');
      this.getAllEmployee();
    });
  }
  onEdit(row: any) {
    this.employeemodelobj.id = row.id;
    this.fromValue.controls['firstname'].setValue(row.firstName);
    this.fromValue.controls['lastname'].setValue(row.LastName);
    this.fromValue.controls['email'].setValue(row.email);
    this.showAdd = false;
    this.showUpdate = true;
  }
  updateEmployeeDetails() {
    this.employeemodelobj.firstName = this.fromValue.value.firstname;
    this.employeemodelobj.LastName = this.fromValue.value.lastname;
    this.employeemodelobj.email = this.fromValue.value.email;
    this.api
      .updateEmployee(this.employeemodelobj, this.employeemodelobj.id)
      .subscribe((res) => {
        alert('update done');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.getAllEmployee();
      });
  }

  clickAddEmployee() {
    this.fromValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
}
