import { Component, Pipe, PipeTransform,AfterViewInit } from '@angular/core';
import { DashboardService } from "src/app/dashboard/dashboard.service";

import { DomSanitizer } from '@angular/platform-browser'
@Pipe({
  name: 'textColor'
})
export class TextColorPipe implements PipeTransform {

  changeFontColor: any;
  str:any
  strs :any
  count :any =0;
  countPrvMonth : any = 0;
  _objLength :any;
  kitsStatus:any;
  globalAllLevel:any
  prevMonthLevel : any;
  result:any
  
  constructor(private sanitized: DomSanitizer,private dataService: DashboardService) { 
  
  }

  transform(value: any, args?: any): any {  

    this._objLength = localStorage.getItem('overViewGridFirstRowLength')

    this.kitsStatus = localStorage.getItem('kitsStatus')
    if(this.kitsStatus == 'true'){
      
      this.count = 1;
      this.countPrvMonth = 1;
      this.globalAllLevel = false
      this.prevMonthLevel = false;
      localStorage.setItem('kitsStatus','false')
      
    }
    if(value != undefined){
      this.result = value.replaceAll("%","");

      if (value.includes("%") && this.result <0 ) {
        this.str = '<span style=\'color: red\'><span style=\'font-weight: bold\'><span style=\'padding-left: 20px\'>' + value +'</span>'+'</span>'+ '</span>';
        this.changeFontColor = this.str;
      }
      else if(value.includes("%") && (this.result > 0 || this.result == 0)) {
        this.str = '<span style=\'color: green\'><span style=\'font-weight: bold\'><span style=\'padding-left: 20px\'>' + value +'</span>'+ '</span>'+'</span>';
        this.changeFontColor = this.str;
      }else if(value.length == 1){
        this.str = '<span style=\'padding-left: 27px\'>' + value + '</span>';
        
        this.changeFontColor = this.str;
      } 
      else if(value.length == 2){
        this.str = '<span style=\'padding-left: 20px\'>' + value + '</span>';
        
        this.changeFontColor = this.str;
      }  else if(value.length == 3){
        this.str = '<span style=\'padding-left: 17px\'>' + value + '</span>';
        
        this.changeFontColor = this.str;
      } else if(value.length == 5){
        this.str = '<span style=\'padding-left: 10px\'>' + value + '</span>';
        
        this.changeFontColor = this.str;
      }
      else if(value == 'Global All'){
        this.globalAllLevel = true;
        this.str = '<span style=\'text-decoration: none\'>'  + value   +'</span>' + '</span>';
        
        this.changeFontColor = this.str;
       
      }else if(this.globalAllLevel == true && this.count < this._objLength && value != '% Variance'){
       
        this.count++; 
        this.str = '<span style=\'text-decoration: underline\'><span style=\'text-underline-position: under\'><span style=\'font-weight: bold\'>'  + value + '</span>'  +'</span>'  +'</span>' + '</span>';
        
        this.changeFontColor = this.str;
      }
    
      else if(this.prevMonthLevel == true && this.countPrvMonth < this._objLength -1 && value != 'Unfulfilled Work Orders'){
        this.count++; 
        this.str = '<span style=\'text-decoration: underline\'><span style=\'text-underline-position: under\'><span style=\'font-weight: bold\'>'  + value + '</span>'  +'</span>'  +'</span>' + '</span>';
        this.changeFontColor = this.str;
      }
      
      else{
        this.str = '<span style=\'color: black\'>' + value + '</span>';
        this.changeFontColor = this.str;
      }
      
      return this.sanitized.bypassSecurityTrustHtml(this.changeFontColor);
    }

    }
    
  //   if (value.includes("%") && this.result <0 ) {
  //     this.str = '<span style=\'color: red\'><span style=\'font-weight: bold\'><span style=\'padding-left: 20px\'>' + value +'</span>'+'</span>'+ '</span>';
  //     this.changeFontColor = this.str;
  //   }
  //   else if(value.includes("%") && (this.result > 0 || this.result == 0)) {
  //     this.str = '<span style=\'color: green\'><span style=\'font-weight: bold\'><span style=\'padding-left: 20px\'>' + value +'</span>'+ '</span>'+'</span>';
  //     this.changeFontColor = this.str;
  //   }else if(value.length == 1){
  //     this.str = '<span style=\'padding-left: 27px\'>' + value + '</span>';
      
  //     this.changeFontColor = this.str;
  //   } 
  //   else if(value.length == 2){
  //     this.str = '<span style=\'padding-left: 20px\'>' + value + '</span>';
      
  //     this.changeFontColor = this.str;
  //   }  else if(value.length == 3){
  //     this.str = '<span style=\'padding-left: 17px\'>' + value + '</span>';
      
  //     this.changeFontColor = this.str;
  //   } else if(value.length == 5){
  //     this.str = '<span style=\'padding-left: 10px\'>' + value + '</span>';
      
  //     this.changeFontColor = this.str;
  //   }
  //   else if(value == 'Global All'){
  //     this.globalAllLevel = true;
  //     this.str = '<span style=\'text-decoration: none\'>'  + value   +'</span>' + '</span>';
      
  //     this.changeFontColor = this.str;
     
  //   }else if(this.globalAllLevel == true && this.count < this._objLength && value != '% Variance'){
     
  //     this.count++; 
  //     this.str = '<span style=\'text-decoration: underline\'><span style=\'text-underline-position: under\'><span style=\'font-weight: bold\'>'  + value + '</span>'  +'</span>'  +'</span>' + '</span>';
      
  //     this.changeFontColor = this.str;
  //   }
  
  //   else if(this.prevMonthLevel == true && this.countPrvMonth < this._objLength -1 && value != 'Unfulfilled Work Orders'){
  //     this.count++; 
  //     this.str = '<span style=\'text-decoration: underline\'><span style=\'text-underline-position: under\'><span style=\'font-weight: bold\'>'  + value + '</span>'  +'</span>'  +'</span>' + '</span>';
  //     this.changeFontColor = this.str;
  //   }
    
  //   else{
  //     this.str = '<span style=\'color: black\'>' + value + '</span>';
  //     this.changeFontColor = this.str;
  //   }
    
  //   return this.sanitized.bypassSecurityTrustHtml(this.changeFontColor);
  // }


}
