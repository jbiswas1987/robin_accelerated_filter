import { Component, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { OnInit } from "@angular/core";
import { ViewChild } from "@angular/core";
import { ElementRef } from "@angular/core";
import { DashboardService } from "../dashboard/dashboard.service";
import * as _ from "lodash";
import { Observable } from "rxjs";
import { AuthenticationService } from "../auth/auth.service";
import { ViewportScroller } from "@angular/common";
@Component({
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.less"],
})
export class MainComponent implements OnInit, OnDestroy {
  private userInput: any;
  isLoggedIn$: Observable<boolean>;

  sessionId: string;
  XSRFToken: string;
  private showhead: any;
  @ViewChild("body") body: ElementRef;
  constructor(
    private dashservice: DashboardService,
    private authService: AuthenticationService,
    private router: Router,
    readonly viewportScroller: ViewportScroller
  ) {}
  scrollTop(event) {
    console.log("scrolling to top of page", event);
    window.scrollTo(0, 0);
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  ngOnInit() {
    console.log("app component OnInit");
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  ngOnDestroy() {
    console.log("app component destroyed");
  }
}
