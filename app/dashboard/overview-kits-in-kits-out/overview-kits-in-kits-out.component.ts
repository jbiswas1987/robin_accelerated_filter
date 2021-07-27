import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material';
import { PAGE_DATA } from './data'

@Component({
  selector: 'app-overview-kits-in-kits-out',
  templateUrl: './overview-kits-in-kits-out.component.html',
  styleUrls: ['./overview-kits-in-kits-out.component.less']
})
export class OverviewKitsInKitsOutComponent{

  rows = new Array<any>();
  dataSource: any;
  displayedColumns = [];
constructor(){
  this.yourFunction(PAGE_DATA)
} 
 yourFunction(input) {
    this.rows = input; // Update your model
    this.displayedColumns = this.rows.length > 0 ? Object.keys(this.rows[0]) : [];
    console.log(this.displayedColumns);
    this.dataSource = new MatTableDataSource(this.rows);
  }
}