import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { CookieService } from 'ngx-cookie-service';
import { EmployeeService } from '../shared/services/employee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userName = '';
  record: any = {};
  alertText = '';
  addRecordForm: FormGroup | any;
  duplicateData: any = {};
  tempDuplicateData: any = {};
  isVisible = false;
  isSuccess = false;

  displayedColumns: string[] = [
    'id',
    'userId',
    'title',
    'body',
    'update',
    'delete',
  ];
  dataList = new MatTableDataSource<any>();

  @ViewChild(MatPaginator, { static: false })
  set paginator(value: MatPaginator) {
    if (this.dataList) {
      this.dataList.paginator = value;
    }
  }

  @ViewChild(MatSort, { static: false })
  set sort(value: MatSort) {
    if (this.dataList) {
      this.dataList.sort = value;
    }
  }

  constructor(
    private cookieService: CookieService,
    private route: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.userName = this.cookieService.get('fname');
    this.dataList.paginator = this.paginator;
    this.dataList.sort = this.sort;

    this.addRecordForm = new FormGroup({
      userId: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required),
    });

    this.fetchData();
  }

  applyFilter(filterValue: any) {
    filterValue = filterValue.value.trim();
    filterValue = filterValue.toLowerCase();
    this.dataList.filter = filterValue;
  }

  fetchData(): any {
    this.employeeService.fetchData().subscribe((res: any[]) => {
      this.dataList.data = res;
    });
  }

  addData(): any {
    this.employeeService
      .addData(this.addRecordForm.value)
      .subscribe((res: any) => {
        if (res) {
          this.addRecordForm.reset();
          this.alertText = `Record added with Id ${res.id}`;
          this.isSuccess = true;
          this.isVisible = true;
          setTimeout(() => (this.isVisible = false), 4000);
        } else {
          this.alertText = 'Unable to add Record';
          this.isSuccess = false;
          this.isVisible = true;
          setTimeout(() => (this.isVisible = false), 4000);
        }
      });
  }

  updateData(data: any): any {
    this.duplicateData = { ...data };
    this.tempDuplicateData = { ...data };
  }

  updateFormReset(): any {
    this.duplicateData = this.tempDuplicateData;
  }

  confirmUpdateData(updatedData: any): any {
    updatedData.id = +updatedData.id;
    this.employeeService.updateData(updatedData).subscribe((res: any) => {
      console.log(res);
      if (res) {
        this.alertText = `Record updated with Id ${res.id}`;
        this.isSuccess = true;
        this.isVisible = true;
        setTimeout(() => (this.isVisible = false), 4000);
      } else {
        this.alertText = 'Unable to update Record';
        this.isSuccess = false;
        this.isVisible = true;
        setTimeout(() => (this.isVisible = false), 4000);
      }
    });
  }

  deleteData(data: any): any {
    this.record = data;
  }

  confirmDeleteData(id: number): any {
    this.employeeService.deleteData(id).subscribe((res: any) => {
      if (res) {
        this.alertText = 'Record Deleted';
        this.isSuccess = true;
        this.isVisible = true;
        setTimeout(() => (this.isVisible = false), 4000);
      } else {
        this.alertText = 'Unable to delete record';
        this.isSuccess = false;
        this.isVisible = true;
        setTimeout(() => (this.isVisible = false), 4000);
      }
    });
  }

  logout() {
    localStorage.clear();
    this.route.navigate(['/home']);
  }
}
