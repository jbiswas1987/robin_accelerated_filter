import { Component, OnInit ,AfterViewInit,OnDestroy,HostListener,
  ViewChild, ViewChildren, ElementRef,   QueryList} from '@angular/core';
import { Router } from "@angular/router";
import {DialogSessionComponent} from '../../common/dialog-session/dialog-session.component'
import { MatDialog } from "@angular/material/dialog";
import { Subject } from 'rxjs';
import {DataService} from '../../common/data.service'
import { DashboardService } from "../../dashboard/dashboard.service";

@Component({
  selector: 'app-ko-supplier-home',
  templateUrl: './ko-supplier-home.component.html',
  styleUrls: ['./ko-supplier-home.component.less']
})
export class KoSupplierHomeComponent implements OnInit {
  interval :any =0;
  interValTimeOut;
  _forCastsessionTimeOut:any
  _stopSessionBackGroundServices : any;
  userInactive: Subject<any> = new Subject();
  Isexacta : any;
  private IsexactaTableDisplay : any;
  dynamicMessage :any
  messageResponse :any
  private _IsExacata :any;
  _messageReadExternalSource ;any;
  _externalSourceResponse:any
  @ViewChild('scrollframe',{static: false}  as any) scrollFrame: ElementRef;
  @ViewChildren('item') itemElements: QueryList<any>;
  constructor(private dataServices: DataService,private dashService: DashboardService,private route: Router,public dialog: MatDialog, ) {
    this.dashService.headerStatusKOSupplerFrom('true')  
    this.Isexacta = false;
    this.IsexactaTableDisplay = false
    this.startTime();
    this.userInactive.subscribe(() => 
    this.getDialog()
    );
   }

   @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.interval);
    this.startTime();
  }
  ngOnInit() {
    this._messageReadExternalSource = this.dashService.getMessageReadfromExternalSource().subscribe((response)=>{
     
      this._externalSourceResponse = response.ko_supplier
   })
  }
  getDialog(){
  
    let message = '';
    clearInterval(this.interval);
    let username = localStorage.getItem('UserName')
    if(username == '' || username == null){
      this.userInactive.unsubscribe();
    }else{
      const dialogRef = this.dialog.open(DialogSessionComponent, {
     
        disableClose: true,
        data: { message: 'message' },
      });
    }
   
 }

 startTime() {
  this.interval = setTimeout(() => this.userInactive.next(undefined), 6000000);     
}
  backButtonActivity(){
    this.dashService.headerStatusKOSupplerFrom('')
    this.dashService.forCastDate('')
    this.dashService.exactaDisplayTable('false')
    localStorage.removeItem('noOfClick')
    clearTimeout(this.interval);
    clearInterval(this.interval)
    localStorage.setItem('clearSession','true')
    localStorage.removeItem('noOfClick')
    // this.idle.clearInterrupts();
    // this.dashBoard.clearsessionTimeOut('true')
    this.dashService.updateSponsorNameRestDashboard('');
    this.userInactive.unsubscribe();

    this.route.navigate(["home/landing"]);
  }
  ngAfterViewInit() {
    this._IsExacata = this.dashService.exactaDisplay.subscribe((response) =>{   
}) 

this.dynamicMessage = this.dashService.dynamicMessageSection.subscribe((response)=>{
  let messageItem = response
  if(messageItem == '0'){
    this.messageResponse = 'No Record Found'
  }else {
    this.messageResponse = ''
  }
})

}

ngOnDestroy() {

if (this._IsExacata != undefined)
this._IsExacata.unsubscribe();
if(this.dynamicMessage != undefined)
this.dynamicMessage.unsubscribe();
if(this._messageReadExternalSource != undefined)
this._messageReadExternalSource.unsubscribe()
}
}
