import { Component,Inject,AfterViewInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Location} from '@angular/common'
import { AuthenticationService } from "../../auth/auth.service";
import {DashboardService} from '../../dashboard/dashboard.service'
import { Idle, DEFAULT_INTERRUPTSOURCES } from "@ng-idle/core";

@Component({
  selector: 'app-dialog-session',
  templateUrl: './dialog-session.component.html',
  styleUrls: ['./dialog-session.component.less']
})
export class DialogSessionComponent implements AfterViewInit {
  interval;
  noOfClick :any;
  noClick:any;
  timed: boolean = false;
  idleState = "Your session will time out soon. Please click 'Ok' to continue.";
  timedOut = false;
  lastPing?: Date = null;
  countdown: any;
  _forCastClearsessionTimeOut
  constructor(
    public dialogRef: MatDialogRef<DialogSessionComponent>,
    public loc: Location,
    private authService: AuthenticationService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private dashBoardServices : DashboardService,
    private idle: Idle
    ) {
      this.idle.watch();
      let sessionStatus = localStorage.getItem('clearSession')
      if(sessionStatus == 'true'){
          //this.idle.clearInterrupts();
          this.idle.stop();
          localStorage.removeItem('clearSession')
        }
      
      idle.setIdle(1);
      // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
      idle.setTimeout(10);
      // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
      idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
  
      idle.onIdleEnd.subscribe(() => (this.idleState = "No longer idle."));
      idle.onTimeout.subscribe(() => {
        this.idleState = "Session timed out.. Please login again.";
        this.timedOut = true;
      });
  
      idle.onIdleStart.subscribe(() => (this.idleState = "You've gone idle!"));
      idle.onTimeoutWarning.subscribe(countdown => {
        this.idleState =  'Your session will time out in '+ countdown + " seconds!";
        // this.idleState = "You will timevxc out in " + countdown + " seconds!";
        console.log(countdown);
        // if(sessionStatus == 'true'){
        //   this.idle.clearInterrupts();
        //   localStorage.removeItem('clearSession')
        // }
        if (countdown == 1) {
          // if(sessionStatus != 'true'){
            this.timedOut = true;
          this.authService.logout();
          // }else{
          //   this.idle.clearInterrupts();
          //   this.timedOut = false;
          //   localStorage.removeItem('sessionStatus')
          // }
          
         
        // }else{
        //   this.idle.clearInterrupts();
        //   this.timedOut = false;
        //   localStorage.removeItem('sessionStatus')
        }
      });
    
     // this.resumeTime();
    }

  onNoClick(): void {
    //  this.idle.watch();
    // this.idle.clearInterrupts();
    this.idle.stop();
    this.idle.onTimeout.subscribe(() => {
      // this.idleState = "Timed out!";
      this.timedOut = true;
    });

    this.idleState = "Started.";
    this.timedOut = false;
    // this.noOfClick++;
    this.noClick = localStorage.getItem('noOfClick')
    if(this.noClick == ''){
      this.noClick =1
      localStorage.setItem('noOfClick',this.noClick)
    }else{
      this.noClick++;
      localStorage.setItem('noOfClick',this.noClick)
    }
    this.dialogRef.close();
    clearInterval(this.interval);
   

    if(this.noClick > 3){  
      this.authService.logout();
    }else{
      this.dashBoardServices.sessionTimeOut('true')

    }
    // this.dashBoardServices.sessionTimeOut('true')

  //  this.forcastCom.startTime();
  }

  ngAfterViewInit() {
    // this._forCastClearsessionTimeOut =  this.dashBoardServices.clearSessionValue.subscribe((response) =>{
      
    //   if(response == 'true'){
    //     this.idle.clearInterrupts();
    //     this.timedOut = false;
    //   }

    // })
  }

//   ngOnDestroy() {
//     if (this._forCastClearsessionTimeOut != undefined)
//     this._forCastClearsessionTimeOut.unsubscribe();
   
// }

  // resumeTime(){
  //   this.interval = setTimeout(() => {
  //     console.log('@@@@@@@@@@@@@' + this.interval)
  //     if(this.interval == 55){
  //       this.dialogRef.close();
  //       this.authService.logout();
  //     }
  //  }, 20000);
  // }

}
export interface DialogData {
  message: string;

}
