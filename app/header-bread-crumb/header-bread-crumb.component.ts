import { Component, OnInit ,AfterViewInit} from '@angular/core';
import {DashboardService} from '../../app/dashboard/dashboard.service'
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-header-bread-crumb',
  templateUrl: './header-bread-crumb.component.html',
  styleUrls: ['./header-bread-crumb.component.less']
})
export class HeaderBreadCrumbComponent implements OnInit {
  private pageName : any;
  private _pageName : any

  constructor(private router: Router,private dashBoard : DashboardService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
  this._pageName = this.dashBoard.currentPageName.subscribe((response)=>{
     this.pageName = response;     
  });
  }

  backButtonActivity(){
    this.router.navigate(["home/landing"]);
  }
}
