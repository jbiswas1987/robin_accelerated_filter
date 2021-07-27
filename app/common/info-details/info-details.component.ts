import { Component,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Location} from '@angular/common'
@Component({
  selector: 'app-info-details',
  templateUrl: './info-details.component.html',
  styleUrls: ['./info-details.component.less']
})
export class InfoDetailsComponent  {
  isAnimate: true;
  constructor(
    public dialogRef: MatDialogRef<InfoDetailsComponent>,
    public loc: Location,public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    document.getElementsByClassName("animate__animated")[0].classList.remove("animate__slideInLeft")
      document.getElementsByClassName("animate__animated")[0].classList.add("animate__slideOutRight");
      setTimeout(()=>{this.dialog.closeAll();}, 400);
    //this.dialogRef.close();
   
  }

}
export interface DialogData {
  message: string;
}