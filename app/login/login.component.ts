import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DashboardService } from "../dashboard/dashboard.service";
import { AuthenticationService } from "./../auth/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  private userInput: any;
  sessionId: string;
  XSRFToken: string;
  showHead: any;
  isloggedInstatus: boolean = false;
  loginstatusMessage: string;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dashservice: DashboardService,
    private authService: AuthenticationService
  ) {
    localStorage.removeItem("showhead");
    this.showHead = false;
    localStorage.setItem("showhead", this.showHead);
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.userInput = {
      UserName: this.loginForm.value.username,
      Password: this.loginForm.value.password,
    };

    this.dashservice.getToken(this.userInput).subscribe(
      (res) => {
        if (res.IsAuthenticated == true) {
          this.isloggedInstatus = true;
          this.sessionId = res.JSessionId;
          this.XSRFToken = res.XSRFToken;

          localStorage.setItem("sessionID", this.sessionId);
          localStorage.setItem("XSRFToken", this.XSRFToken);
          localStorage.setItem("UserName", res.UserName);
        } else {
          this.loginstatusMessage =
            "Incorrect login credentials. Please try again";
          this.isloggedInstatus = false;
        }
        this.authService.login();
      },
      (err: any) => {
        this.loginstatusMessage =
          "Incorrect login credentials. Please try again";
        this.isloggedInstatus = false;
      }
    );
  }
}
