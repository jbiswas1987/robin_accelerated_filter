import { Component, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'

@Pipe({
  name: 'textPadding'
})
export class TextPaddingPipe implements PipeTransform {

  changeFontColor: any;
  str:any
  strs :any
  constructor(private sanitized: DomSanitizer) { 

  

  }
  transform(value: any, args?: any): any {  
   
    
    if(value >10){
      this.str = '<span style=\'padding-left: 25px\'><span style=\'color: green\'><span style=\'font-weight: bold\'>' + value + '</span>' +  '</span>' + '</span>';
      
      this.changeFontColor = this.str;
    }  else if(value>= 0 && value <= 10 ){
      this.str = '<span style=\'padding-left: 33px\'><span style=\'color: green\'><span style=\'font-weight: bold\'>' + value + '</span>' +'</span>' + '</span>';
      
      this.changeFontColor = this.str;
    }  else if(value < -9){
      this.str = '<span style=\'padding-left: 24px\'><span style=\'color: red\'><span style=\'font-weight: bold\'>' + value + '</span>' + '</span>' + '</span>';
      
      this.changeFontColor = this.str;
    }  else if(value < 0 ){
      this.str = '<span style=\'padding-left: 30px\'><span style=\'color: red\'><span style=\'font-weight: bold\'>' + value + '</span>' + '</span>' + '</span>';
      
      this.changeFontColor = this.str;
    } 
    
    else{
      this.str = '<span style=\'color: black\'>' + value + '</span>';
      this.changeFontColor = this.str;
    }
    return this.sanitized.bypassSecurityTrustHtml(this.changeFontColor);
  }


}
