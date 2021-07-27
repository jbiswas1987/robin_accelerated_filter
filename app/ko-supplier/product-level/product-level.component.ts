import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {ExcelService} from '../../forcast-dashboard/excel.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
 import {Location} from '@angular/common'
 import {InfoDetailsComponent} from '../../common/info-details/info-details.component'
 import { DashboardService } from "src/app/dashboard/dashboard.service";

@Component({
  selector: 'app-product-level',
  templateUrl: './product-level.component.html',
  styleUrls: ['./product-level.component.less']
})
export class ProductLevelComponent implements OnInit {

  buttonBGColorMonthly: any;
  textColorMonthly : any;
  textdecorationMonthly:any;
  textUnderLinePosMonthly : any;
  textUnderLineColorCodeMonthly: any;
  underLineTicknessMonthly : any;
  buttonBGColorQuarterly: any;
  textColorQuarterly : any;
  textdecorationQuarterly:any
  textUnderLinePosQuarterly : any;
  textUnderLineColorCodeQuarterly: any;
  underLineTicknesQuarterly : any;
  textunderlineoffsetMonthly:any ;
  textunderlineoffsetQuarterly :any
  underLineTicknessQuarterly : any
  cursor : any;
  cursorType : any;
  padding : any;

  _forecast:any =[]
  _actual : any =[]
  echartsIntance: any;
  _productLevel :any
  _productLevelresponse : any =[]
  _productID:any =[]
  _productDescription :any=[]
  _textDisplay:any;
  _productIDplot :any =[]
  _productIDPlotArr :any =[]
  _month : any =[];
  _forecastValue : any =[];
  _actualValue : any =[];

  _monthQuaterly : any =[];
  _forecastValueQuaterly : any =[];
  _actualValueQuaterly : any =[];
  radioItems: any =[];
  model   = {option: 'Product ID'};
  showLoading : boolean;
  _isDisplay :any;
  _monthCount:any

  _sponsorName :any
  _sponsorNameResponse:any
  sponsor:any;

  download: any = this.getBaseUrl() + "/assets/icon/download.png";
  info : any = this.getBaseUrl()+"/assets/icon/info.png"
  info_dispay = this.getBaseUrl()+"/assets/pdf/Product_Level.pdf"
  //  keywords = "ProductId";
  // keyword = "ProductDescription";
   keywordProduct :any;
   keywordProductDesc :any;
   _monthList : any =[]
   productID:any;
   productDescription:any
  constructor(private dataService: DashboardService,private excelService:ExcelService,
    private router: Router, public dialog: MatDialog) {
      this.radioItems = ['Product ID', 'Product Description'];
      this._isDisplay = 'Product ID'
      this.keywordProduct ='ProductId'
      this.keywordProductDesc ='ProductDescription'
    //   this.showLoading =true
    //   this.buttonBGColorMonthly = '#FFFFFF';
    //   this.buttonBGColorQuarterly = '#D3D3D3'
    //   this.textColorMonthly = '#000000'
    //   this.textColorQuarterly = '#4ba4be'
    //   this.textdecorationMonthly='none'
    //   this.textdecorationQuarterly = 'underline'
    //   this.textUnderLinePosMonthly ='none'
    //   this.textUnderLineColorCodeMonthly='none' 
    //   this.underLineTicknessMonthly = 'none'
    //   this.textUnderLinePosQuarterly ='under';
    //   this.textUnderLineColorCodeQuarterly ='#005d78';
    //   this.underLineTicknessQuarterly ='3px'
    //   this.textunderlineoffsetMonthly ='none' ;
    //   this.textunderlineoffsetQuarterly ='6px'  
    //   this._monthList =['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    //   this._productLevelresponse =[]
    //   this._productIDPlotArr =[]
    //   this._productID =[]
    //   this._productDescription =[]
    //   this._month =[]
    //   this._forecastValue =[]
    //   this._actualValue =[]

    //   this._monthQuaterly =[]
    //   this._forecastValueQuaterly =[]
    //   this._actualValueQuaterly =[]

    //   this._productLevel = this.dataService.getkitproductleveldemand().subscribe((response)=>{
    //   this._productLevelresponse = response
    //   for(let k=0;k<this._productLevelresponse.ProductList.length;k++){
    //     this._productID.push(this._productLevelresponse.ProductList[k])
    //   }

    //  this._productIDplot = this._productLevelresponse.ProductDemandFigures[0].ProductId;
    //   for(let i=0;i<this._productLevelresponse.CurrentYearDemand.length;i++){
    //     if(this._productIDplot == this._productLevelresponse.CurrentYearDemand[i].ProductId){
    //       this._textDisplay = 'Year:' +' ' + this._productLevelresponse.CurrentYearDemand[i].Year +', '+'Total Demand' + ': ' +' '+ this._productLevelresponse.CurrentYearDemand[i].TotalDemand.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    //     }
    //   }
    //   this.getPlotByMonthly(this._productIDplot)
    // })
}

  ngOnInit() {
  }

  ngAfterViewInit() {
    this._sponsorName = this.dataService.sponsorNameRestDashB.subscribe((response) =>{
      this._sponsorNameResponse = response;
      this.sponsor={
        sponsor:this._sponsorNameResponse
      }
      if(this._sponsorNameResponse != ''){
        this.showLoading =true
        this.buttonBGColorMonthly = '#FFFFFF';
        this.buttonBGColorQuarterly = '#D3D3D3'
        this.textColorMonthly = '#000000'
        this.textColorQuarterly = '#4ba4be'
        this.textdecorationMonthly='none'
        this.textdecorationQuarterly = 'underline'
        this.textUnderLinePosMonthly ='none'
        this.textUnderLineColorCodeMonthly='none' 
        this.underLineTicknessMonthly = 'none'
        this.textUnderLinePosQuarterly ='under';
        this.textUnderLineColorCodeQuarterly ='#005d78';
        this.underLineTicknessQuarterly ='3px'
        this.textunderlineoffsetMonthly ='none' ;
        this.textunderlineoffsetQuarterly ='6px'  
        this._monthList =['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        this._productLevelresponse =[]
        this._productIDPlotArr =[]
        this._productID =[]
        this._productDescription =[]
        this._month =[]
        this._forecastValue =[]
        this._actualValue =[]
  
        this._monthQuaterly =[]
        this._forecastValueQuaterly =[]
        this._actualValueQuaterly =[]
        this.productID = ''
        this.productDescription = ''
  
        this._productLevel = this.dataService.getkitproductleveldemand(this.sponsor).subscribe((response)=>{
        this._productLevelresponse = response
        for(let k=0;k<this._productLevelresponse.ProductList.length;k++){
          this._productID.push(this._productLevelresponse.ProductList[k])
        }

        this.productID = this._productID[0].ProductId
        this.productDescription = this._productID[0].ProductDescription
  
       this._productIDplot = this._productLevelresponse.ProductDemandFigures[0].ProductId;
        for(let i=0;i<this._productLevelresponse.CurrentYearDemand.length;i++){
          if(this._productIDplot == this._productLevelresponse.CurrentYearDemand[i].ProductId){
            this._textDisplay = 'Year:' +' ' + this._productLevelresponse.CurrentYearDemand[i].Year +', '+'Total Demand' + ': ' +' '+ this._productLevelresponse.CurrentYearDemand[i].TotalDemand.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
          }
        }
        
        this.getPlotByMonthly(this._productIDplot)
      })
      }
    })
}


  koSupplierMonthly(){
      this.showLoading = true;
      this._month =[]
      this._forecastValue =[]
      this._actualValue =[]

      this.buttonBGColorMonthly = '#FFFFFF';
      this.buttonBGColorQuarterly = '#D3D3D3'
      this.textColorMonthly = '#000000'
      this.textColorQuarterly = '#4ba4be'
      this.textdecorationMonthly='none'
      this.textdecorationQuarterly = 'underline'
      this.textUnderLinePosMonthly ='none'
      this.textUnderLineColorCodeMonthly='none' 
      this.underLineTicknessMonthly = 'none'
      this.textUnderLinePosQuarterly ='under';
      this.textUnderLineColorCodeQuarterly ='#005d78';
      this.underLineTicknessQuarterly ='3px'
      this.textunderlineoffsetMonthly ='none' ;
      this.textunderlineoffsetQuarterly ='6px'

    this.getPlotByMonthly(this._productIDplot)
  }

  koSupplierQuaertly(){
    // this.showLoading =true

      this.buttonBGColorMonthly = '#D3D3D3';
      this.buttonBGColorQuarterly = '#FFFFFF'
      this.textColorMonthly = '#4ba4be'
      this.textColorQuarterly = '#000000'
      this.textdecorationMonthly='underline'
      this.textdecorationQuarterly = 'none'
      this.textUnderLinePosMonthly ='under'
      this.textUnderLinePosQuarterly ='none';
      this.textUnderLineColorCodeMonthly='#005d78'
      this.textUnderLineColorCodeQuarterly ='none';
      this.underLineTicknessMonthly = '3px'
      this.underLineTicknessQuarterly ='none'
      this.textunderlineoffsetMonthly ='6px' ;
      this.textunderlineoffsetQuarterly ='none'  

  this._monthQuaterly =[]
  this._forecastValueQuaterly =[]
  this._actualValueQuaterly =[]    
   for(let j=0;j<4;j++){
     if(j ==0){
      this._monthQuaterly.push({
        value :'Q1'
      })
      var foreCast = this._forecastValue[0].value+ this._forecastValue[1].value+ this._forecastValue[2].value
      var actual = this._actualValue[0].value+ this._actualValue[1].value+ this._actualValue[2].value

      this._forecastValueQuaterly.push({
        value :foreCast,
        productID : this._forecastValue[0].productID,
        ProductDescription:this._forecastValue[0].ProductDescription
        
      })

      this._actualValueQuaterly.push({
        value :actual,
        productID : this._actualValue[0].productID,
        ProductDescription:this._actualValue[0].ProductDescription
      })

     }else if(j ==1){
      this._monthQuaterly.push({
        value :'Q2'
      })
      var foreCast = this._forecastValue[3].value+ this._forecastValue[4].value+ this._forecastValue[5].value
      var actual = this._actualValue[3].value+ this._actualValue[4].value+ this._actualValue[5].value

      this._forecastValueQuaterly.push({
        value :foreCast,
        productID : this._forecastValue[0].productID,
        ProductDescription:this._forecastValue[0].ProductDescription
      })

      this._actualValueQuaterly.push({
        value :actual,
        productID : this._actualValue[0].productID,
        ProductDescription:this._actualValue[0].ProductDescription
      })
     }else if(j ==2){
      this._monthQuaterly.push({
        value :'Q3'
      })
      var foreCast = this._forecastValue[6].value+ this._forecastValue[7].value+ this._forecastValue[8].value
      var actual = this._actualValue[6].value+ this._actualValue[7].value+ this._actualValue[8].value

      this._forecastValueQuaterly.push({
        value :foreCast,
        productID : this._forecastValue[0].productID,
        ProductDescription:this._forecastValue[0].ProductDescription
      })

      this._actualValueQuaterly.push({
        value :actual,
        productID : this._actualValue[0].productID,
        ProductDescription:this._actualValue[0].ProductDescription
      })
     }else if(j ==3){
      this._monthQuaterly.push({
        value :'Q4'
      })
      var foreCast = this._forecastValue[9].value+ this._forecastValue[10].value+ this._forecastValue[11].value
      var actual = this._actualValue[9].value+ this._actualValue[10].value+ this._actualValue[11].value

      this._forecastValueQuaterly.push({
        value :foreCast,
        productID : this._forecastValue[0].productID,
        ProductDescription:this._forecastValue[0].ProductDescription
      })

      this._actualValueQuaterly.push({
        value :actual,
        productID : this._actualValue[0].productID,
        ProductDescription:this._actualValue[0].ProductDescription
      })
     }
   }
  //  this.showLoading =false
   this._month =[]
   this._forecastValue =[]
   this._actualValue =[]
   this.chartOption.xAxis.data = this._monthQuaterly
   this.chartOption.series[0].data = this._forecastValueQuaterly;
   this.chartOption.series[1].data = this._actualValueQuaterly;
  
   if(this.echartsIntance != undefined){
     this.echartsIntance.setOption(this.chartOption)

   }
   
  }

  getPlotByMonthly(_productIDplot){
    this._monthCount =0
    for(let i=0;i< this._productLevelresponse.ProductDemandFigures.length;i++){
      if(this._month.length <12){
        if((_productIDplot == this._productLevelresponse.ProductDemandFigures[i].ProductId) || (_productIDplot == this._productLevelresponse.ProductDemandFigures[i].ProductDescription)){
       //   this._productIDPlotArr.push(this._productLevelresponse.ProductDemandFigures[i].ProductId)
          var month = this.formatDatePartcularDate(this._productLevelresponse.ProductDemandFigures[i].ForecastMonth)
          var year = month.substring(4,8)
          console.log(year)

          if(month.includes(this._monthList[this._monthCount])){
            this._month.push({value : month})
            var forecast ,actual;
            if(this._productLevelresponse.ProductDemandFigures[i].ComponentForecast == 0){
              forecast = ''
            }else{
              forecast = this._productLevelresponse.ProductDemandFigures[i].ComponentForecast
            }
            
  
            this._forecastValue.push({
              forecaseMonth : month,
              value : forecast,
              productID : this._productLevelresponse.ProductDemandFigures[i].ProductId,
              ProductDescription:this._productLevelresponse.ProductDemandFigures[i].ProductDescription
            })
  
            if(this._productLevelresponse.ProductDemandFigures[i].ComponentActuals == 0){
              actual = ''
            }else{
              actual = this._productLevelresponse.ProductDemandFigures[i].ComponentActuals
            }
  
            this._actualValue.push({
              forecaseMonth : month,
              value : actual,
              productID : this._productLevelresponse.ProductDemandFigures[i].ProductId,
              ProductDescription:this._productLevelresponse.ProductDemandFigures[i].ProductDescription
            })
            this._monthCount++;
          }else{

            for(let k=0;k<this._monthList.length;k++){
              if(month.includes(this._monthList[this._monthCount])){
                this._month.push({value : month})
            var forecast ,actual;
            if(this._productLevelresponse.ProductDemandFigures[i].ComponentForecast == 0){
              forecast = ''
            }else{
              forecast = this._productLevelresponse.ProductDemandFigures[i].ComponentForecast
            }
            
  
            this._forecastValue.push({
              forecaseMonth : month,
              value : forecast,
              productID : this._productLevelresponse.ProductDemandFigures[i].ProductId,
              ProductDescription:this._productLevelresponse.ProductDemandFigures[i].ProductDescription
            })
  
            if(this._productLevelresponse.ProductDemandFigures[i].ComponentActuals == 0){
              actual = ''
            }else{
              actual = this._productLevelresponse.ProductDemandFigures[i].ComponentActuals
            }
  
            this._actualValue.push({
              forecaseMonth : month,
              value : actual,
              productID : this._productLevelresponse.ProductDemandFigures[i].ProductId,
              ProductDescription:this._productLevelresponse.ProductDemandFigures[i].ProductDescription
            })
                this._monthCount++;
                break;

              }else{
                
                this._month.push({value : this._monthList[this._monthCount]+'-'+year})
                this._forecastValue.push({
                  forecaseMonth : this._monthList[this._monthCount]+'-'+year,
                  value : 0,
                  productID : this._productLevelresponse.ProductDemandFigures[i].ProductId,
                  ProductDescription:this._productLevelresponse.ProductDemandFigures[i].ProductDescription
                })
                this._actualValue.push({
                  forecaseMonth : this._monthList[this._monthCount]+'-'+year,
                  value : 0,
                  productID : this._productLevelresponse.ProductDemandFigures[i].ProductId,
                  ProductDescription:this._productLevelresponse.ProductDemandFigures[i].ProductDescription
                })
              }
              this._monthCount++;
            }

              
            
          }
          

          // this._month.push({value : month})
          // var forecast ,actual;
          // if(this._productLevelresponse.ProductDemandFigures[i].ComponentForecast == 0){
          //   forecast = ''
          // }else{
          //   forecast = this._productLevelresponse.ProductDemandFigures[i].ComponentForecast
          // }
          

          // this._forecastValue.push({
          //   forecaseMonth : month,
          //   value : forecast,
          //   productID : this._productLevelresponse.ProductDemandFigures[i].ProductId,
          //   ProductDescription:this._productLevelresponse.ProductDemandFigures[i].ProductDescription
          // })

          // if(this._productLevelresponse.ProductDemandFigures[i].ComponentActuals == 0){
          //   actual = ''
          // }else{
          //   actual = this._productLevelresponse.ProductDemandFigures[i].ComponentActuals
          // }

          // this._actualValue.push({
          //   forecaseMonth : month,
          //   value : actual,
          //   productID : this._productLevelresponse.ProductDemandFigures[i].ProductId,
          //   ProductDescription:this._productLevelresponse.ProductDemandFigures[i].ProductDescription
          // })
        }
      }
     
    }
    this.chartOption.xAxis.data = this._month
    this._forecastValue
    this.chartOption.series[0].data = this._forecastValue;
    this.chartOption.series[1].data = this._actualValue;
   
    if(this.echartsIntance != undefined){
      this.echartsIntance.setOption(this.chartOption)

    }
    this.showLoading =false
  }

  formatDate(date) {
    var strArray=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    var d = new Date(date),
    month = '' + strArray[d.getMonth()],
    day = '' + d.getDate(),
    year = d.getFullYear();
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
      
        let a = [year, month, day].join('-');
        let m =[month, year].join('-');;
        let monthYear ={
         formatYear : m,
         formatMonth : date
        }

    return monthYear;
  }
  formatDatePartcularDate(date) {
    var strArray=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    var d = new Date(date),
    month = '' + strArray[d.getMonth()],
    day = '' + d.getDate(),
    year = d.getFullYear();
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
      
        let a = [year, month, day].join('-');
        let m =[month, year].join('-');;
       

    return m;
  }

  formatNumber (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}
getRadioClick(selectedValue){
  this._isDisplay = selectedValue
  // if(this._isDisplay == 'Product ID'){
  //   this.keywordProduct = "ProductId";
   
  // }else if(this._isDisplay == 'Product Description'){
  //   this.keywordProductDesc = "ProductDescription"
  // }
}

onChangeProductID(inputChnageValue){
  // console.log(inputChnageValue)
  let productID = inputChnageValue.ProductId
  this.showLoading = true;
  this._month =[]
  this._forecastValue =[]
  this._actualValue =[]
  this._monthQuaterly =[]
  this._forecastValueQuaterly =[]
  this._actualValueQuaterly =[]
  this._productIDplot = productID;
  
  this.productDescription = inputChnageValue.ProductDescription

      this.buttonBGColorMonthly = '#FFFFFF';
      this.buttonBGColorQuarterly = '#D3D3D3'
      this.textColorMonthly = '#000000'
      this.textColorQuarterly = '#4ba4be'
      this.textdecorationMonthly='none'
      this.textdecorationQuarterly = 'underline'
      this.textUnderLinePosMonthly ='none'
      this.textUnderLineColorCodeMonthly='none' 
      this.underLineTicknessMonthly = 'none'
      this.textUnderLinePosQuarterly ='under';
      this.textUnderLineColorCodeQuarterly ='#005d78';
      this.underLineTicknessQuarterly ='3px'
      this.textunderlineoffsetMonthly ='none' ;
      this.textunderlineoffsetQuarterly ='6px'

  for(let i=0;i<this._productLevelresponse.CurrentYearDemand.length;i++){
    if(this._productIDplot == this._productLevelresponse.CurrentYearDemand[i].ProductId){
      this._textDisplay = 'Year:' +' ' + this._productLevelresponse.CurrentYearDemand[i].Year +', '+'Total Demand' + ': ' +' '+ this._productLevelresponse.CurrentYearDemand[i].TotalDemand.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

    }
  }

  this.getPlotByMonthly(this._productIDplot)
}

onChangeProductDescription(inputChnageValue){
  this.buttonBGColorMonthly = '#FFFFFF';
  this.buttonBGColorQuarterly = '#D3D3D3'
  this.textColorMonthly = '#000000'
  this.textColorQuarterly = '#4ba4be'
  this.textdecorationMonthly='none'
  this.textdecorationQuarterly = 'underline'
  this.textUnderLinePosMonthly ='none'
  this.textUnderLineColorCodeMonthly='none' 
  this.underLineTicknessMonthly = 'none'
  this.textUnderLinePosQuarterly ='under';
  this.textUnderLineColorCodeQuarterly ='#005d78';
  this.underLineTicknessQuarterly ='3px'
  this.textunderlineoffsetMonthly ='none' ;
  this.textunderlineoffsetQuarterly ='6px'
  let productDescription = inputChnageValue.ProductDescription
  this.productID = inputChnageValue.ProductId
  this.showLoading = true;
  this._month =[]
  this._forecastValue =[]
  this._actualValue =[]
  this._monthQuaterly =[]
  this._forecastValueQuaterly =[]
  this._actualValueQuaterly =[]
  this._productIDplot = productDescription;

  for(let i=0;i<this._productLevelresponse.CurrentYearDemand.length;i++){
    if(this._productIDplot == this._productLevelresponse.CurrentYearDemand[i].ProductDescription){
      this._textDisplay = 'Year:' +' ' + this._productLevelresponse.CurrentYearDemand[i].Year +', '+'Total Demand' + ': ' +' '+ this._productLevelresponse.CurrentYearDemand[i].TotalDemand.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

    }
  }

  this.getPlotByMonthly(this._productIDplot)
}

chartOption = {

  tooltip: {
    trigger: "axis",

    formatter: function (params) {

      console.log(params)

      let returnType;
      if(params.length ==1){        
        returnType =  `
        <b style="margin-left:35%;"> ${params[0].axisValue}</b><br/>
        ------------------------------------------------------------------------<br/>
        Product ID: ${params[0].data.productID}<br />
        Product Description: ${params[0].data.ProductDescription}<br />
        #${params[0].seriesName}: ${params[0].value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}<br />`  
       
      }else if(params.length ==2){
        if(params[0].value == 0){
          returnType =  `
          <b> ${params[0].axisValue}</b><br/>
          -------------------------------------------------------------------------<br/>
          Product ID: ${params[0].data.productID}<br />
          Product Description: ${params[0].data.ProductDescription}<br />
          #${params[1].seriesName}: ${params[1].value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}<br />`
        }else if(params[1].value == 0){
          returnType =  `
          <b> ${params[0].axisValue}</b><br/>
          -------------------------------------------------------------------------<br/>
          Product ID: ${params[0].data.productID}<br />
          Product Description: ${params[0].data.ProductDescription}<br />
          #${params[0].seriesName}: ${params[0].value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}<br />`
        }else{
          returnType =  `
          <b> ${params[0].axisValue}</b><br/>
          ---------------------------------------------------------------------------<br/>
          Product ID: ${params[0].data.productID}<br />
          Product Description:${params[0].data.ProductDescription}<br />
          #${params[0].seriesName}: ${params[0].value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}<br />
          #${params[1].seriesName}: ${params[1].value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}<br />`
        }
        
      }

     
      
      return returnType;
    },

  },
  legend: {
    data: ["Actual","Forecast"],
    // selectedMode: false,
  },
  toolbox: {
    language: "en",
    right: "3%",
    show: true,
    feature: {
      // dataView: {
      //   title: "Data View",
      //   readOnly: false,
      //   lang: ["Data View", "Close", "Refresh"],
      // },
      // magicType: {
      //   show: true,
      //   type: ["line", "bar"],
      //   title: {
      //     line: "Line",
      //     bar: "Bar",
      //   },
      // },
      // saveAsImage: { show: false, title: "save" },
    },
  },

  calculable: true,

  grid: {
    left: "3%",
    right: "4%",
    bottom: "9%",
    top: "15%",
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    data: [],
   // boundaryGap: false,
    // reverse: true,
          axisLabel: {
      interval: 0,
      name: "Months",
      nameLocation: "middle"
},

  },
  yAxis: {
    type: 'value',
    // axisTick: {
    //   alignWithLabel: true
    // },
    // nameRotate: 90,
    //  nameLocation: "center",
      // drawAxisLineEnabled : 'no',
      // drawGridLinesEnabled : 'no',
    // name :'Total Demand',
    padding:15
  },
  nameTextStyle:{
    fontSize : 14,
    padding :28,
    
  } ,
  series: [
    {
      name: 'Forecast',
      type: 'bar',
      barGap: 0,
      data: [],
      itemStyle: {
            color: '#005d78'
          },
    
    },
    {
      name: 'Actual',
      type:'line',
      areaStyle: {},
        stack: 'one',
        data:[],
        // emphasis: {
        //   focus: [],
         
        // },
        itemStyle: { color: "#FFA771" },
    },


  ]
};

  onChartInit(ec) {
    this.echartsIntance = ec;
  }

  infoDetails(content){
    // this._infoDisplay = true
    const dialogRef = this.dialog.open(InfoDetailsComponent, {
       
      disableClose: true,
      data: { message: this.info_dispay},
      panelClass:['animate__animated','animate__slideInLeft','my-class'] 
      
    });
  }
  getBaseUrl(): string {
    var currentAbsoluteUrl = window.location.href;
    var currentRelativeUrl = this.router.url;
    var index = currentAbsoluteUrl.indexOf(currentRelativeUrl);
    var baseUrl: string = currentAbsoluteUrl.substring(0, index);
    return baseUrl;
  }

  downloadexcel(){
    this.excelService.exportAsExcelFile(this._productLevelresponse.ProductList,  'product-level-KO Supplier');
   }
   ngOnDestroy() {
    if (this._productLevel != undefined)
    this._productLevel.unsubscribe();
    if(this._sponsorName !=undefined)
    this._sponsorName.unsubscribe();
  }
}
