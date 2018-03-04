import { Component } from '@angular/core';
import { DataService } from'./data.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title= "Test MEAN App";
  students: Array<any>;
  constructor (private _dataservice: DataService){ 
    this._dataservice.getStudents().subscribe(response =>this.students=response);
  }
}
