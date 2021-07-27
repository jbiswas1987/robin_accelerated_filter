import { Component, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'

@Pipe({
  name: 'countryLevelTextFormat'
})
export class CountryLevelTextFormatPipe implements PipeTransform {
  changeFont: any;
  str:any
  strs :any

  constructor(private sanitized: DomSanitizer){

  }

  transform(value: any, args?: any): any {
    let result = value.replaceAll("[-+.^:,]","");

    console.log(value.length)
   
    
    if (value.includes("Protocols") || value.includes("Kits-In") || value.includes("Kits-Out")) {
      
      this.str = '<span style=\'font-weight: bold\'>' + value +':' + '</span>';
      
      this.changeFont = this.str;
    } else if(value.length == 5){
      this.str = '<span style=\'padding-left: 24px\'>' + value + '</span>';
      
      this.changeFont = this.str;
    }else if(value.length == 3 || value.length ==2 || value.length == 1){
      this.str = '<span style=\'margin-left: 18px\'>' + value + '</span>';
      
      this.changeFont = this.str;
      
    }  
    
    else{
      this.str = '<span style=\'color: black\'><span style=\'padding-left: 10px\'>' + value + '</span>'+'</span>';
      this.changeFont = this.str;
    }
    return this.sanitized.bypassSecurityTrustHtml(this.changeFont);
  
  }

}
