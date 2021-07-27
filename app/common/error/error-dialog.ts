import { Component, Inject } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/auth/auth.service";
@Component({
  selector: "error-dialog",
  styles: ["error-dialog.css"],
  templateUrl: "../error/error-dialog.html",
})
export class ErrorDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ErrorDialogComponent>,
    public loc: Location,
    private route: Router,
    private authService: AuthenticationService,
    @Inject(MAT_DIALOG_DATA) public data: ErrorDialogData
  ) {}

  onNoClick(): void {
    console.log("dialog onNoclick called");
    this.dialogRef.close();
    this.authService.logout();
  }
}
export interface ErrorDialogData {
  message: string;
  header: string;
}
