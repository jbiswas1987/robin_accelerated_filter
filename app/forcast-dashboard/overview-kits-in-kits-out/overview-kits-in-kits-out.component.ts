import { Component, OnInit ,OnDestroy,ViewChild,HostListener,AfterViewInit} from '@angular/core';
import { MatTableDataSource, MatTableModule,MatPaginator } from '@angular/material';
import { PAGE_DATA } from './data'
import { DashboardService } from "src/app/dashboard/dashboard.service";
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { Router } from "@angular/router";
import {DataService} from '../../common/data.service'
import {ExactaComponent} from '../exacta/exacta.component'
import {ExcelService} from '../excel.service';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalManager } from 'ngb-modal';
// import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Location} from '@angular/common'
import {InfoDetailsComponent} from '../../common/info-details/info-details.component'
@Component({
  selector: 'app-overview-kits-in-kits-out',
  templateUrl: './overview-kits-in-kits-out.component.html',
  styleUrls: ['./overview-kits-in-kits-out.component.less']
})
export class OverviewKitsInKitsOutComponent implements AfterViewInit,OnDestroy{
  @ViewChild('myModal') myModal;
  private modalRef;
  rows = new Array<any>();
  dataSource: any;
  displayedColumns = [];
  _moverViewKitsINOutSub : any;
  kitsInOUTOverViewData:any;
  kitsInOverViewData:any;
  kitsOutOverViewData:any;
  
  expanded : any;
  showLoading: boolean = false;

  buttonBGColorKitsIN: any;
  textColorKitsIN : any;
  textdecorationKitsIN:any;
  textUnderLinePosKitsIN : any;
  textUnderLineColorCodeKitsIN: any;
  underLineTicknessKitsIN : any;

  buttonBGColorKitsOut: any;
  buttonBGColorKitsOUT: any;
  textColorKitsOut : any;
  textdecorationKitsOut:any
  textUnderLinePosKitsOut : any;
  textUnderLineColorCodeKitsOut: any;
  underLineTicknessKitsOut : any;

  textunderlineoffsetKitsIN:any ;
  textunderlineoffsetKitsOut :any

  cursor : any;
  cursorType : any;

  padding : any;

  kitsINOut:any =[]

  value : any =0
  type : any;
  navUrl : any
  lengthObj:any
  objKitsInOverViewData:any;
  myFlagForSlideToggle: boolean = true;
  togglevalue : boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  valueAssign : any
  IsExacta : any;
  monthClickForExacata : any;

  download: any = this.getBaseUrl() + "/assets/icon/download.png";
  info : any = this.getBaseUrl()+"/assets/icon/info.png"
  info_dispay = this.getBaseUrl()+"/assets/pdf/Overview_Grid.pdf"
  _infoDisplay :any;
  _KOKITotalYear : any;
  _KOKITotalYearresponse : any
  _typeTotalYear:any
  _currentYear : any
  _totalValue :any
  _year : any
  _textDisplay : any
  _sponsorName :any
  _sponsorNameResponse:any
  sponsor:any;
  _click : any ='';
  _filterChangeState : any
  _filterChangeResponse :any
 constructor(private dataService: DashboardService,private excelService:ExcelService,
  private router: Router,private dataServices : DataService,private modalService: ModalManager,
  public dialog: MatDialog,){
//  this._sponsorNameResponse ='ROCHE'
    this._infoDisplay = false;
   this.type ='KitsOut'
   this.IsExacta = true
  this.buttonBGColorKitsIN = '#FFFFFF';
    this.buttonBGColorKitsOUT = '#D3D3D3'
    this.textColorKitsIN = '#000000'
    this.textColorKitsOut = '#4ba4be'
    this.textdecorationKitsIN ='none'
    this.textdecorationKitsOut = 'underline'

    this.textUnderLinePosKitsIN ='none'
    this.textUnderLineColorCodeKitsIN='none' 
    this.underLineTicknessKitsIN = 'none'

    this.textUnderLinePosKitsOut ='under';
    this.textUnderLineColorCodeKitsOut ='#005d78';
    this.underLineTicknessKitsOut ='3px'

    this.textunderlineoffsetKitsIN ='none' ;
    this.textunderlineoffsetKitsOut ='6px'

    this.cursor = 'not-allowed';
   
    localStorage.setItem('month','')
    localStorage.setItem('exactaMonth','')
    this.showLoading = true;

} 
TabledataPopulation(input) {
    this.rows = input; // Update your model
    this.displayedColumns = this.rows.length > 0 ? Object.keys(this.rows[0]) : [];
    this.dataSource = new MatTableDataSource(this.rows);
    this.dataSource.paginator = this.paginator;
    this.showLoading = false;
  }

  //---------------------------------------------------------------
  ngAfterViewInit() {
      this._sponsorNameResponse =''
      this._sponsorName = this.dataService.sponsorNameRestDashB.subscribe((response) =>{
              this._sponsorNameResponse = response;
              // if(this._sponsorNameResponse[0] == 'ALL'){
              //   this._sponsorNameResponse =[]
              // }else{
              //   this._sponsorNameResponse = response
              // }
              // this.sponsor={
              //   ctprotocolId:this._sponsorNameResponse
              // }
               if(this._sponsorNameResponse != ''){
                // this.dataService.batchSecondLoadMethod('true')
                if(this._sponsorNameResponse == "ALL"){
                  this._sponsorNameResponse =[]
                }else{
                  this._sponsorNameResponse = response
                }

                this.sponsor={
                  ctprotocolId:this._sponsorNameResponse
                }
                this.showLoading = true; 
             //   this.getTotalValueLoad();               
                this._moverViewKitsINOutSub =  this.dataService.getOverViewKitsInOut(this.sponsor).subscribe((dataRows) => {
                  this.kitsInOUTOverViewData = dataRows;
                  this.kitsINOut=[]
                  this._click =''
                 // this.showLoading = true;
                this.getTotalValueLoad();
                if(this.type ='KitsOut'){
                  this.kitsOutOverView()
                 }else if(this.type ='KitsIn'){
                  this.kitsINOverView()
                 }
                                  
                })
              }
             
      });
     
     

  }

  //---------------------------------------------

  getTotalValueLoad(){
    this._KOKITotalYear = this.dataService.getkitforecastKOKITotalYear(this.sponsor).subscribe((response)=>{
      this.dataService.batchSecondLoadMethod('true')
      this._KOKITotalYearresponse = response
      
     if(this.type ='KitsOut'){
      this.kitsOutOverView()
     }else if(this.type ='KitsIn'){
      this.kitsINOverView()
     }
    
     this.getLoadData();

     this.dataService.batchfirstLoad('true')

    })
  }
  
  //----------------------------------------------------------
  
  over($event,element,event: MouseEvent){
    // console.log("Mouseover called" +$event + JSON.stringify(element ));
    if(element.Name == 'Global All' && $event != 'Global All' ){
      this.cursor = 'pointer'      
    }else if(element.Name == 'Prev. Month Actuals' && $event != 'Prev. Month Actuals' ){
          this.cursor = 'pointer'
    }else{
      this.cursor = 'not-allowed'    
    }
  }

  out(){
    this.cursor = 'not-allowed'
    //  console.log("Mouseout called");
  }
  //------------------------------------------------------------

  getRecord(objname,element){
    
    this.navUrl =''
    localStorage.setItem('month','')
    // console.log(JSON.stringify(element.Name))
    for(let i=0 ;i<this.kitsInOverViewData.length; i++){
      let obj = this.kitsInOverViewData[i]
      Object.keys(obj).map(function(k){ 
        // console.log(obj[k])
      if(obj[k] == 'Global All' || obj[k] == '% Variance' || obj[k] == 'Prev. Month Actuals' 
      || obj[k] ==  'Unfulfilled Work Orders' || obj[k] ==  'TBD' || obj[k] ==  'Others' || obj[k].includes('Central')  || obj[k].includes('CLS'))   {
      }
    //   else if(element.Name == 'Prev. Month Actuals'){
    //     let keyValues = k
    //     let monthInfo = keyValues.substring(0,3)
    //     // console.log("key with value: "+monthInfo) 
    //     var exactaMon;
         
    // if(monthInfo == 'Jan'){

    //   exactaMon = monthInfo
    
    // }else if(monthInfo == 'Feb'){
    //   exactaMon = monthInfo    
    // }else if(monthInfo == 'Mar'){
    //   exactaMon= monthInfo
    // }else if(monthInfo == 'Apr'){
    //   exactaMon= monthInfo
    // }else if(monthInfo == 'May'){
    //   exactaMon = monthInfo
    // }else if(monthInfo == 'Jun'){
    //   exactaMon= monthInfo
    // }else if(monthInfo == 'Jul'){
    //   exactaMon = monthInfo
    // }else if(monthInfo == 'Aug'){
    //   exactaMon = monthInfo
    //  }else if(monthInfo == 'Sep'){
    //   exactaMon = monthInfo
    //  }else if(monthInfo == 'Oct'){
    //   exactaMon = monthInfo
    // }else if(monthInfo == 'Nov'){
    //   exactaMon= monthInfo
    // }else if(monthInfo == 'Dec'){
    //   exactaMon = monthInfo
    // }
    // localStorage.setItem('exactaMonth',exactaMon)
        
    //   }
      else if(objname == obj[k] && element.Name == 'Global All'){
        let keyValues = k
        var selectedYear =  keyValues.substring(4,6)
        let monthInfo = keyValues.substring(0,3)
        // console.log("key with value: "+monthInfo) 
        var formatMonth;
        // this.selectedMonth = this.monthFormat(monthSelected)
       
        //-------------------------
    
    
    if(monthInfo == 'Jan'){

     let month ='01'
     let Year = 20 + selectedYear
     formatMonth = Year +'-' + month+'-'+'01'
    
    }else if(monthInfo == 'Feb'){
      let month ='02'
      let Year = 20 + selectedYear
     formatMonth = Year +'-' + month+'-'+'01'
    
    }else if(monthInfo == 'Mar'){
     let month ='03'
     let Year = 20 + selectedYear
     formatMonth = Year +'-' + month+'-'+'01'
    
    }else if(monthInfo == 'Apr'){
     let month ='04'
     let Year = 20 + selectedYear
     formatMonth = Year +'-' + month+'-'+'01'
    
    }else if(monthInfo == 'May'){
     let month ='05'
     let Year = 20 + selectedYear
     formatMonth = Year +'-' + month+'-'+'01'
     
    }else if(monthInfo == 'Jun'){
     let month ='06'
     let Year = 20 + selectedYear
     formatMonth = Year +'-' + month+'-'+'01'
     
    }else if(monthInfo == 'Jul'){
     let month ='07'
     let Year = 20 + selectedYear
     formatMonth = Year +'-' + month+'-'+'01'
    
    }else if(monthInfo == 'Aug'){
     let month ='08'
     let Year = 20 + selectedYear
     formatMonth = Year +'-' + month+'-'+'01'
     }else if(monthInfo == 'Sep'){
     let month ='09'
     let Year = 20 + selectedYear
     formatMonth = Year +'-' + month+'-'+'01'
     }else if(monthInfo == 'Oct'){
     let month ='10'
     let Year = 20 + selectedYear
     formatMonth = Year +'-' + month+'-'+'01'
     
    }else if(monthInfo == 'Nov'){
     let month ='11'
     let Year = 20 + selectedYear
     formatMonth = Year +'-' + month+'-'+'01'
     
    }else if(monthInfo == 'Dec'){
     let month ='12'
     let Year = 20 + selectedYear
     formatMonth = Year +'-' + month+'-'+'01'
    //  this.router.navigate(["kitsInOutScattered", formatMonth, this.type]);
    }
    localStorage.setItem('month',formatMonth)
    localStorage.setItem('exactaMonth','')

      }
    
      })
    }
      let setMonth = localStorage.getItem('month')
      if(setMonth == '' || setMonth == null){

      }else{
     //   this.router.navigate(["kitsInOutScattered",setMonth, this.type]);
        localStorage.setItem('sponsorName',this._sponsorNameResponse)
        this.navUrl = setMonth +'/'+this.type;
        //navUrl = navUrl.replace("..", "home");
     
        var currentAbsoluteUrl = window.location.href;
        var currentRelativeUrl = this.router.url;
        var index = currentAbsoluteUrl.indexOf(currentRelativeUrl);
        var baseUrl = currentAbsoluteUrl.substring(0, index);
      
        const url = this.router.serializeUrl(this.router.createUrlTree([this.navUrl]));
        window.open(baseUrl +"/"+ 'kitsInOutScattered' + "/" +this.navUrl, "_blank");
    }

    // let exactaMonthClick = localStorage.getItem('exactaMonth')
    // if(exactaMonthClick == '' || exactaMonthClick == null){
    //   this.dataService.exactaDisplayTable('false')
    // }else if(this.type === 'KitsOut'){
    //   this.dataService.exactaDisplayTable('true')
    // }

  }
  kitsINOverView(){
    
    
    if(this._click == 'true'){
      this.type ='KitsIn'
    this.IsExacta = false
    // this.showLoading = true;
    this.expanded = true
    this.buttonBGColorKitsIN = '#D3D3D3';
    this.buttonBGColorKitsOUT = '#FFFFFF'

    this.textColorKitsIN = '#4ba4be'
    this.textColorKitsOut = '#000000'
    this.textdecorationKitsIN ='underline'
    this.textdecorationKitsOut = 'none'

    this.textUnderLinePosKitsIN ='under'
    this.textUnderLineColorCodeKitsIN='#005d78' 
    this.underLineTicknessKitsIN = '3px'

    this.textUnderLinePosKitsOut ='none';
    this.textUnderLineColorCodeKitsOut ='none';
    this.underLineTicknessKitsOut ='none'
  
    this.textunderlineoffsetKitsIN ='6px' ;
    this.textunderlineoffsetKitsOut ='none'
    
    this.kitsInOverViewData =  this.kitsInOUTOverViewData.KitsInOverview;
    this.objKitsInOverViewData = this.kitsInOverViewData[0]
    this.lengthObj = Object.keys(this.objKitsInOverViewData).length
    localStorage.setItem('overViewGridFirstRowLength', this.lengthObj)
    localStorage.setItem('kitsStatus','true')
    this.dataService.exactaDisplayTable('false')
    this._typeTotalYear = 'Total Kits-In'
    this._year = 'Current Year'
    this._currentYear = this._KOKITotalYearresponse[0].Year
    this._totalValue = this._KOKITotalYearresponse[0].TotalKI.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    this._textDisplay = 'Year:' +' ' + this._currentYear +' '+'Kits Volume' + ':'+' ' + this._totalValue;
    this.TabledataPopulation(this.kitsInOverViewData)
    }
    // this.TabledataPopulation(this.kitsInOverViewData)

  }

  kitsOutOverView(){
    this.type ='KitsOut'
    this.IsExacta = false
    // this.showLoading = true;
    this.expanded = true
    this.buttonBGColorKitsIN = '#FFFFFF';
    this.buttonBGColorKitsOUT = '#D3D3D3'
    this.textColorKitsIN = '#000000'
    this.textColorKitsOut = '#4ba4be'
    this.textdecorationKitsIN ='none'
    this.textdecorationKitsOut = 'underline'

    this.textUnderLinePosKitsIN ='none'
    this.textUnderLineColorCodeKitsIN='none' 
    this.underLineTicknessKitsIN = 'none'

    this.textUnderLinePosKitsOut ='under';
    this.textUnderLineColorCodeKitsOut ='#005d78';
    this.underLineTicknessKitsOut ='3px'

    this.textunderlineoffsetKitsIN ='none' ;
    this.textunderlineoffsetKitsOut ='6px'
    

    this.kitsInOverViewData =  this.kitsInOUTOverViewData.KitsOutOverview;
    this.objKitsInOverViewData = this.kitsInOverViewData[0]
    this.lengthObj = Object.keys(this.objKitsInOverViewData).length
    localStorage.setItem('overViewGridFirstRowLength', this.lengthObj)
    localStorage.setItem('kitsStatus','true')
    this.dataService.exactaDisplayTable('false')
    this.getLoadData();
    // this._typeTotalYear = 'Total Kits-Out'
    // this._year = 'Current Year'
    // this._currentYear = this._KOKITotalYearresponse[0].Year
    // this._totalValue = this._KOKITotalYearresponse[0].TotalKO.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    // this._textDisplay = 'Year:' +' ' + this._currentYear +' '+'Kits Volume' + ':'+' ' + this._totalValue;
    this.TabledataPopulation(this.kitsInOverViewData)
    

  }

  getLoadData(){
    this._click = 'true'
     this._typeTotalYear = 'Total Kits-Out'
    this._year = 'Current Year'
    this._currentYear = this._KOKITotalYearresponse[0].Year
    this._totalValue = this._KOKITotalYearresponse[0].TotalKO.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    this._textDisplay = 'Year:' +' ' + this._currentYear +' '+'Kits Volume' + ':'+' ' + this._totalValue;
    // this.showLoading = false;
  }
  ngOnDestroy() {
    if (this._moverViewKitsINOutSub != undefined)
    this._moverViewKitsINOutSub.unsubscribe();
    if (this._KOKITotalYear != undefined)
    this._KOKITotalYear.unsubscribe();
    if (this._sponsorName != undefined)
    this._sponsorName.unsubscribe();
    if(this._filterChangeState != undefined)
    this._filterChangeState.unsubscribe();
    
  }

  downloadexcel(){
    this.excelService.exportAsExcelFile(this.kitsInOverViewData,  this.type);
  }

  infoDetails(content){
    // this._infoDisplay = true
    const dialogRef = this.dialog.open(InfoDetailsComponent, {
       
      disableClose: false,
      data: { message: this.info_dispay},
      panelClass:['animate__animated','animate__slideInLeft','my-class'],
      
      
    });
  }

  getBaseUrl(): string {
    var currentAbsoluteUrl = window.location.href;
    var currentRelativeUrl = this.router.url;
    var index = currentAbsoluteUrl.indexOf(currentRelativeUrl);
    var baseUrl: string = currentAbsoluteUrl.substring(0, index);
    return baseUrl;
  }
}