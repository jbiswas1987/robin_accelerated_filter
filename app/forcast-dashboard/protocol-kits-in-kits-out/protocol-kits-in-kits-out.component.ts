import { Component, OnInit,ViewChild } from '@angular/core';

import{ForcastKitsInBarGraphComponent} from '../../forcast-dashboard/forcast-kits-in-bar-graph/forcast-kits-in-bar-graph.component'
import{ForcastKitsOutbarGraphComponent} from '../../forcast-dashboard/forcast-kits-outbar-graph/forcast-kits-outbar-graph.component'
import { Router } from "@angular/router";
import {DataService} from '../../common/data.service'
import { HostListener } from "@angular/core";

@Component({
  selector: 'app-protocol-kits-in-kits-out',
  templateUrl: './protocol-kits-in-kits-out.component.html',
  styleUrls: ['./protocol-kits-in-kits-out.component.less']
})
export class ProtocolKitsInKitsOutComponent  {
@ViewChild("forCastKitsIN") forCastKitsIN: ForcastKitsInBarGraphComponent;
@ViewChild("forCastKitsOUT") forCastKitsOUT: ForcastKitsOutbarGraphComponent;
myFlagForSlideToggle: boolean = true;
togglevalue : boolean = false;
toggleDataGrid : boolean = false;
toggleBar : boolean = false;
tooltipText : any;
barImage: any = this.getBaseUrl() + "/assets/icon/bar-chart.png";
dataGridImage: any = this.getBaseUrl() + "/assets/icon/spreadsheet.png";
// screenHeight: number;
// screenWidth: number;
// IsHighScreenRes : boolean = false;
// IsMidScreenRes : boolean = false;

constructor(private router: Router,private dataShareServices :DataService){
  this.toggleDataGrid = true;
  this.toggleBar = false;
 // this.getScreenSize();
}

toggle(myFlagForSlideToggle){
  this.togglevalue = myFlagForSlideToggle;
}

//-----------------------------------
// @HostListener('window:resize', ['$event'])
//     getScreenSize(event?) {
//           this.screenHeight = window.innerHeight;
//           this.screenWidth = window.innerWidth;
//           console.log(this.screenHeight, this.screenWidth);
         
//           if(this.screenHeight === 2160){
//             this.IsHighScreenRes = true;
//             this.IsMidScreenRes = false
//           }else if(this.screenHeight === 1080){
//             this.IsMidScreenRes = true;
//             this.IsHighScreenRes = false;
//           }else{
//             this.IsMidScreenRes = false
//             this.IsHighScreenRes = false;
//           }
//     }

//-------------------------------------


gridKitscastData(){
  
  this.toggleDataGrid = true;
  this.toggleBar = false;
  this.dataShareServices.setBarGridClick(this.toggleBar)
  this.tooltipText = 'Bar'
}

tableKitscastData(){
  this.toggleDataGrid = false;
  this.toggleBar = true;
  this.dataShareServices.setBarGridClick(this.toggleBar)
  this.tooltipText = 'Data Grid'
}
getBaseUrl(): string {
  var currentAbsoluteUrl = window.location.href;
  var currentRelativeUrl = this.router.url;
  var index = currentAbsoluteUrl.indexOf(currentRelativeUrl);
  var baseUrl: string = currentAbsoluteUrl.substring(0, index);
  return baseUrl;
}
}
