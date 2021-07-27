import { Injectable, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { LoginResponse } from "../_models/loginresponse";
import { BehaviorSubject, throwError } from "rxjs";
import { Router } from "@angular/router";
import { DashboardService } from "../dashboard/dashboard.service";

@Injectable({ providedIn: "root" })
export class AuthenticationService implements OnDestroy {
  selectedSponsor: string = "ROCHE"
  sponsorListResponse =[]
  list :any =[]
  flags = [];
  flagsTralType =[]
  outputCleanSponsor = [];
  outputTrialListType =[];
  outputProtocolName =[]
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private dashService: DashboardService
  ) {}
  ngOnDestroy(): void {
    console.log("auth service destroyed");
  }

  authenticateUser(username, password) {
    return this.http
      .post<any>(
        "https://qa.pharmacuity.healthcare/PharmAcuityApi/Auth/Login",
        { username, password }
      )
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          //localStorage.setItem("currentUser", JSON.stringify(user));
          localStorage.setItem("sessionID", user.JSessionId);
          localStorage.setItem("XSRFToken", user.XSRFToken);
          localStorage.setItem("UserName", user.UserName);
          //setting values for filters applied on the dashboard page
          localStorage.setItem("robin_protocols", "");
          localStorage.setItem("robin_filters", "");
          localStorage.setItem("robin_PSfilters", "");
          localStorage.setItem("robin_PId", "");
          localStorage.setItem("protoColID", "");

          return user;
        })
      );
  }

  login() {
    this.loggedIn.next(true);
    //Since the service doesnot get destroyed on component destroy
    //setting the sponsor default on login
    localStorage.setItem("sponsor_name",'ROCHE');
    this.dashService.updateSponsor("ROCHE");
    this.dashService.updateGoogleMapdata("");
    this.dashService.protolNumberUpdate("");
    this.dashService.refreshMapInformationValue("")
    this.dashService.forCastDate('')
    // localStorage.setItem("sponsor_name",this.selectedSponsor)
    // this.sponsorListResponse = []
    // this.list =[]
    // this.dashService.getsponsor().subscribe((responseSponsor)=>{
    //   this.sponsorListResponse = responseSponsor;
    //   for(let i=0;i<this.sponsorListResponse.length;i++){
    //     // this.sponsorList.push(this.sponsorListResponse[i].Sponsor)
    //     this.list.push({name:this.sponsorListResponse[i].Sponsor})
    //   }  
      
    //   localStorage.setItem('sponsorList', JSON.stringify(this.list))

    // })
    // this.dashService.getAccelarateFilterExternalSource().subscribe((response)=>{
      
    //   for (let i = 0; i <response.length; i++) {
    //     if (this.flags[response[i].CleanSponsor])
    //       continue;
    //     this.flags[response[i].CleanSponsor] = true;
    //   //  this.flagsTralType[response[i].TrialListType] = true;
    //     this.outputCleanSponsor.push({CleanSponsor:response[i].CleanSponsor})
    //     //this.outputTrialListType.push({TrialListType:response[i].TrialListType})
    //   } 
    //   for (let i = 0; i <response.length; i++) {
    //     if (this.flags[response[i].TrialListType])
    //       continue;
    //     this.flags[response[i].TrialListType] = true;
    //     this.outputTrialListType.push({TrialListType:response[i].TrialListType})
    //   } 

    //   for(let i= 0; i<response.length;i++){
    //     this.outputProtocolName.push({protocolName :response[i].ProtocolName })
    //   }

    //   localStorage.setItem('disticntTrialListType',JSON.stringify(this.outputTrialListType))
    //   localStorage.setItem('disticntSponsorList',JSON.stringify(this.outputCleanSponsor))
    //   localStorage.setItem('disticntprotolColName',JSON.stringify(this.outputProtocolName))
    //   localStorage.setItem('accelarateFilterRes',JSON.stringify(response))
    // })

    this.router.navigate(["home/landing"]);
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem("sessionID");
    localStorage.removeItem("XSRFToken");
    localStorage.removeItem("UserName");
    localStorage.removeItem("robin_protocols");
    localStorage.removeItem("robin_filters");
    localStorage.removeItem("robin_PSfilters");
    localStorage.removeItem("robin_PId");
    localStorage.removeItem("protoColID");
    localStorage.removeItem("totalCount");
    localStorage.removeItem('visibleLink')
    localStorage.removeItem('sponsor_name')
    localStorage.removeItem('noOfClick')
    localStorage.removeItem('sessionStatus')
    localStorage.removeItem('sponsorList')
    localStorage.removeItem('selectedSponsor')
    localStorage.removeItem('dashBoardActiveType')
    this.loggedIn.next(false);
    this.router.navigate([""]);
  }
}
