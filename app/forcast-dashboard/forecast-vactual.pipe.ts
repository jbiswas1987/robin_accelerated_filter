import { Component, Pipe, PipeTransform,AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'

@Pipe({
  name: 'forecastVactual'
})
export class ForecastVactualPipe implements PipeTransform {
  str:any
  strs :any
  changeFontColor: any;
  findValue : any = 0;
  constructor(private sanitized: DomSanitizer){

  }

  transform(value: any, args?: any): any {
    // let result = value.replaceAll("%","");
    if(value == "Variance"){
      this.findValue = 1
    }
    if (value <0 && (this.findValue>0 && this.findValue<7)) {
      this.str = '<span style=\'color: red\'><span style=\'font-weight: bold\'><span style=\'padding-left: 15px\'>' + value +'%'+'</span>'+'</span>'+ '</span>';
      this.findValue++
      this.changeFontColor = this.str;
    }
    else if((value > 0 || value == 0 )&& value <=100 && (this.findValue>0 && this.findValue<7)) {
      this.str = '<span style=\'color: green\'><span style=\'font-weight: bold\'><span style=\'padding-left: 15px\'>' + value +'%' +'</span>'+ '</span>'+'</span>';
      this.findValue++
      this.changeFontColor = this.str;
    } else if(value == "Forecast" || value == "Actuals" || value == "Variance"){
      this.str = '<span style=\'color: black\'>' + value + '</span>';   
      this.changeFontColor =this.str      
    }else {
      let newVa = value.toString
      let Invalue =Math.round(parseFloat(value)).toFixed(2)
      let parseF = parseFloat(Invalue)

      var a = parseInt("10")

      // let values = newval.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      
      this.changeFontColor ='<span style=\'margin-left: 10px\'>'+parseF.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")+'</span>'; 
      // this.changeFontColor ='<span style=\'margin-left: 10px\'>'+Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+'</span>';       
    }
    return this.sanitized.bypassSecurityTrustHtml(this.changeFontColor);
  }

}
