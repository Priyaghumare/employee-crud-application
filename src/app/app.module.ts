import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { EmployeeList } from './components/employee-list/employee-list';
import { DepartmentSearch } from './components/department-search/department-search';
import { App } from './app';

@NgModule({
    // No declarations needed for standalone components
    imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      App,
      EmployeeList,
      DepartmentSearch
    ],
    providers: [],
    bootstrap: [App]
  })
  export class AppModule { }