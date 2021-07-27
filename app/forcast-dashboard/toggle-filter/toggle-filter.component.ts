import { Component, OnInit } from '@angular/core';
import { DashboardService } from "../../dashboard/dashboard.service";

@Component({
  selector: 'app-toggle-filter',
  templateUrl: './toggle-filter.component.html',
  styleUrls: ['./toggle-filter.component.less']
})
export class ToggleFilterComponent implements OnInit {

  constructor(private dashService: DashboardService,) { }

  ngOnInit() {
  }

  changeAccelarateToggle(e){

   this.dashService.toggle(e)

  }

}
