import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { AlertService } from "../_services/alert.service";
import { NotificationService } from "../common/error/error.notification.service";
import { AuthenticationService } from "../auth/auth.service";

@Component({
  templateUrl: "signin.component.html",
  styleUrls: ["signin.component.less"],
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  loginButtonText: string = "Sign In";
  //returnUrl: string;
  logo: any = this.getBaseUrl() + "/assets/icon/logo1.png";

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private notifService: NotificationService
  ) {}

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
    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.loginButtonText = "Signing In";
    this.authenticationService
      .authenticateUser(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.authenticationService.login();
        },
        (error) => {
          console.log(error);
          this.notifService.showError("Incorrect username or password");
          this.loading = false;
          this.loginButtonText = "Sign In";
        }
      );
  }
  getBaseUrl(): string {
    var currentAbsoluteUrl = window.location.href;
    var currentRelativeUrl = this.router.url;
    var index = currentAbsoluteUrl.indexOf(currentRelativeUrl);
    var baseUrl: string = currentAbsoluteUrl.substring(0, index);
    return baseUrl;
  }
}
