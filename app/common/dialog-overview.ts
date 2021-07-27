import { Component,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Location} from '@angular/common'
@Component({
    selector: 'dialog-overview',
    templateUrl: '../common/dialog-overview.html',
  })
  
  export class DialogOverviewExampleDialog {
  
    constructor(
      public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
      public loc: Location,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  
    onNoClick(): void {
      this.dialogRef.close();
      this.loc.back();
    }
  
  }
  export interface DialogData {
    message: string;
  }