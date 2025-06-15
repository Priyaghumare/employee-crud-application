import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DepartmentSearch } from './components/department-search/department-search';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,DepartmentSearch],
  templateUrl: './app.html',
  styleUrls: ['./app.css']


})
export class App {
  protected title = 'crud';
}
