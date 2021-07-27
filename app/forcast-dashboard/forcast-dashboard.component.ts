import {
  Component, OnInit, AfterViewInit, OnDestroy, HostListener,
  ViewChild, ViewChildren, ElementRef, QueryList
} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { DashboardService } from '../dashboard/dashboard.service'
import { DialogOverviewExampleDialog } from "../common/dialog-overview";
import { DialogSessionComponent } from '../common/dialog-session/dialog-session.component'
import { MatDialog } from "@angular/material/dialog";
import { AuthenticationService } from "./../auth/auth.service";
import { Idle, DEFAULT_INTERRUPTSOURCES } from "@ng-idle/core";
import { Subject } from 'rxjs';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { DataService } from '../../app/common/data.service'
import {ConfirmationService} from 'primeng/api';
import {Message} from 'primeng/api';
import {MatSidenav} from '@angular/material/sidenav';


@Component({
  selector: 'app-forcast-dashboard',
  templateUrl: './forcast-dashboard-bread-feedback.component.html',
  styleUrls: ['./forcast-dashboard-bread.component.less'],
  styles: [`
  :host ::ng-deep button {
      margin-right: .85em;
  }
`],
  providers: [ConfirmationService],
  animations: [
    trigger('slide_in_out', [
      state('slide_in', style({
        width: '350px',
        // css styles when the element is in slide_in
      })),
      state('slide_out', style({
        width: '0px'
        // css styles when the element is in slide_out
      })),
      // animation effect when transitioning from one state to another
      transition('slide_in <=> slide_out', animate(300))
    ]),
  ]
})
export class ForcastDashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  breadcrumb: any = this.getBaseUrl() + "/assets/icon/breadcrum.png";
  cancel: any = this.getBaseUrl() + "/assets/icon/cancel.png";
  close :any =this.getBaseUrl() + "/assets/icon/close.png"
  pageName: any;
  interval: any = 0;
  interValTimeOut;
  _forCastsessionTimeOut: any
  _stopSessionBackGroundServices: any;
  userInactive: Subject<any> = new Subject();
  Isexacta: any;
  private IsexactaTableDisplay: any;
  private _IsExacata: any;
  _messageReadExternalSource; any;
  _externalSourceResponse: any
  @ViewChild('scrollframe', { static: false } as any) scrollFrame: ElementRef;
  @ViewChildren('item') itemElements: QueryList<any>;
  @ViewChild('autoComplete') autoComplete;
  @ViewChild('drawer') drawer: MatSidenav;

  private itemContainer: any;
  private scrollContainer: any;
  private items = [];
  private isNearBottom = true;
  private list = []
  _sponsorAPIResponse: any
  sponsorName: any;
  sponsorSelect: any;
  isBooleanSideDrawer: any = ''
  _sponsorList: any
  _sponsorListResponse
  _selectType: any;
  slider_state: string = "slide_in";
  _responseType: any = ''
  _ctProtocolID: any
  _selectedType: any;
  _tempSelectedSponsor: any
  checkboxes = [{
    name: 'Value 1',
    value: 'value-1'
  }, {
    name: 'Value 2',
    value: 'value-2'
  }, {
    name: 'Value 3',
    value: 'value-3'
  }, {
    name: 'Value 1',
    value: 'value-1'
  }, {
    name: 'Value 2',
    value: 'value-2'
  }, {
    name: 'Value 3',
    value: 'value-3'
  }, {
    name: 'Value 1',
    value: 'value-1'
  }, {
    name: 'Value 2',
    value: 'value-2'
  }, {
    name: 'Value Demo 3',
    value: 'value Demo-3'
  }, {
    name: 'Memo 3',
    value: 'Memo-3'
  }];
   msgs: Message[] = [];
  _allAccebratefilterResponse: any
  _trailTypeFilterResponse: any
  _sponsorfilterResponse: any
  _protocolNameFilterResponse: any
  _tempCIProtocolIDForSponsor: any
  _tempCIProtocolIDForProtocolName: any
  _tempCIProtocolIDForTrailType: any
  searchText: string;
  selectedSponsor: any
  IsDrawerState :any;
  IsDrawerAPIState :any
  _selectFilterLength:any
  _accelarateFilterType :any

  constructor(private router: Router, private authService: AuthenticationService, private dashBoardServices: DataService,
    private dashBoard: DashboardService, public dialog: MatDialog, private idle: Idle,private confirmationService: ConfirmationService,
   
  ) {
    // this.dashBoard.headerStatusValue('true') 
    localStorage.removeItem('dashBoardActiveType')
    this.dashBoard.headerStatusValue('forecasting')
    this.dashBoard.accelarateFilter('true')
   // this.IsDrawerState = 'false'
    this.sponsorName = [
      "ROCHE",
      "ABBVIE",
      "ASTRAZENECA",
      "BAYER",
      "BOEHRINGER INGELHEIM",
      "BRISTOL-MYERS SQUIBB",
      "CELGENE",
      "ELI LILLY",
      "GILEAD",
      "JANSSEN",
      "MERCK",
      "NOVARTIS",
      "PFIZER",
      "SANOFI",
    ];

    // this.sponsorSelect = this.sponsorName[0]
    this.Isexacta = false;
    this.IsexactaTableDisplay = false
    this.startTime();
    this.userInactive.subscribe(() =>
      this.getDialog()
    );
  }
  getDialog() {
    let message = '';
    clearInterval(this.interval);
    let username = localStorage.getItem('UserName')
    if (username == '' || username == null) {
      this.userInactive.unsubscribe();
    } else {
      const dialogRef = this.dialog.open(DialogSessionComponent, {
        disableClose: true,
        data: { message: 'message' },
      });
    }
  }

  startTime() {
    this.interval = setTimeout(() => this.userInactive.next(undefined), 6000000);
  }
  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.interval);
    this.startTime();
  }
  ngOnInit() {
    this._messageReadExternalSource = this.dashBoard.getMessageReadfromExternalSource().subscribe((response) => {
      this._externalSourceResponse = response.forecast_dashboard
    })
    this.IsexactaTableDisplay = false
    this.pageName = 'foreCastingDashBoard'
    this.dashBoard.currentPage(this.pageName)
  }

  ngAfterViewInit() {
  
    this._sponsorAPIResponse = this.dashBoard.sponsorNameRestDashB.subscribe((response) => {
      let sponsorName = response;
      if (sponsorName != '') {
        this.isBooleanSideDrawer = 'true'
      }
    })
    // this._sponsorList = this.dashBoard.sponsorListUpdate.subscribe((response)=>{

    //   if(response.length>0){
    //     this._sponsorListResponse =[]
    //     // this._sponsorListResponse = JSON.parse(response)
    //     this._sponsorListResponse = JSON.parse(response)
    //     this.selectedSponsor = this._sponsorListResponse[0].CleanSponsor
    //     // for(let i=0;i< this._sponsorListResponse.length;i++){
    //     //   this.list.push({name:this._sponsorListResponse[i].CleanSponsor})

    //     // }

    //     this.selectedSponsor =[{
    //       'name':'Trail Type',
    //       },{
    //       'name':'Sponsor',
    //     },{
    //       'name' : 'Protocol Name'
    //     }]
    //   }
    // })

    // this.scrollContainer = this.scrollFrame.nativeElement;
    this._IsExacata = this.dashBoard.exactaDisplay.subscribe((response) => {
      this.IsexactaTableDisplay = response;
      // this.scrollContainer = this.scrollFrame.nativeElement;
      // this.scrollToBottom();  
      // this.isUserNearBottom(); 
    })
    this._selectType = this.dashBoard.selectedTypeForDashbaord.subscribe((response) => {
      this._responseType = response
      if (this._responseType == 'true') {
       // this.selectedSponsor =[]
        this.selectedSponsor = JSON.parse(localStorage.getItem('dashBoardActiveType'))
        console.log(JSON.stringify(this.selectedSponsor))
      }
    })

    this.IsDrawerAPIState = this.dashBoard.drawerOpen.subscribe((response)=>{
      
      if(response == 'true'){
        this.IsDrawerState = 'false'
        this.closeDrawer('')
      }
      
    })
  }

  // revertDashBoard(){
    
  //   this.confirmationService.confirm({
  //     message: 'Do you want to load the default forecasting dashbaord?',
  //     header: 'Confirmation',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //         this.msgs = [{severity:'info', summary:'Confirmed', detail:'You have accepted'}];
  //         this.revertHomePage();
  //     },
  //     reject: () => {
  //         this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
  //     }
  // });
  // }

  revertHomeDashBoard(deletedItem) {
    this.deleteFilter(deletedItem)

  //   this.confirmationService.confirm({
  //     message: 'Do you want to delete' + '-:' + deletedItem +"?",
  //     header: 'Confirmation',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //         this.msgs = [{severity:'info', summary:'Confirmed', detail:'You have accepted'}];
  //         this.deleteFilter(deletedItem)
  //     },
  //     reject: () => {
  //         this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
  //     }
  // });

    // this._ctProtocolID = []
    // this._tempCIProtocolIDForSponsor = []
    // this._tempCIProtocolIDForProtocolName = []
    // this._tempCIProtocolIDForTrailType = []  
    // if (this.selectedSponsor.length == 1) {
    //   this._ctProtocolID = ['ALL']
    //   this.dashBoardServices.set_city_protocolID(this._ctProtocolID)
    //   this._responseType = 'false'
     
    //   this.selectedSponsor = [{
    //     name: ''
    //   }]
    // } else if (this.selectedSponsor.length == 2) {
    //   this._tempSelectedSponsor = []
    //   for (let i = 0; i < this.selectedSponsor.length; i++) {
    //     if (this.selectedSponsor[i].name == deletedItem) {

    //     } else {
    //       this._tempSelectedSponsor = [{
    //         name: this.selectedSponsor[i].name
    //       }]

    //       this.selectedSponsor = []
    //      // this.selectedSponsor = this._tempSelectedSponsor;

    //       if (this._tempSelectedSponsor[0].name == 'Trial Type List') {
    //         this._allAccebratefilterResponse = this.dashBoardServices.get_accerateFilterALLResponse();
    //         this._trailTypeFilterResponse = this.dashBoardServices.get_TrailTypeSetFilterElement();

    //         for (let i = 0; i < this._trailTypeFilterResponse.length; i++) {
    //           for (const allListTrailType of this._allAccebratefilterResponse) {
    //             if (allListTrailType.TrialListType == this._trailTypeFilterResponse[i].TrialListType) {
    //               this._ctProtocolID.push(allListTrailType.CTProtocolID)
    //             }
    //           }
    //         }

    //         this._responseType = 'true'
    //         this.selectedSponsor = this._tempSelectedSponsor
           
    //       } else if (this._tempSelectedSponsor[0].name == 'Sponsor') {
    //         this._allAccebratefilterResponse = this.dashBoardServices.get_accerateFilterALLResponse();
    //         this._sponsorfilterResponse = this.dashBoardServices.get_SponTypeSetFilterElement();
    //         for (let i = 0; i < this._sponsorfilterResponse.length; i++) {
    //           for (const allList of this._allAccebratefilterResponse) {
    //             if (allList.CleanSponsor === this._sponsorfilterResponse[i].CleanSponsor) {
    //               this._ctProtocolID.push(allList.CTProtocolID)
    //             }
    //           }
    //         }
    //         this._responseType = 'true'
    //         this._selectedType = this._tempSelectedSponsor
    //       } else if (this._tempSelectedSponsor[0].name == 'Protocol Name') {
    //         this._allAccebratefilterResponse = this.dashBoardServices.get_accerateFilterALLResponse();
    //         this._protocolNameFilterResponse = this.dashBoardServices.get_ProtocolTypeFilterElement();
    //         for (let i = 0; i < this._protocolNameFilterResponse.length; i++) {
    //           for (const allListProtocolName of this._allAccebratefilterResponse) {
    //             if (allListProtocolName.ProtocolName === this._protocolNameFilterResponse[i].protocolName) {
    //               this._ctProtocolID.push(allListProtocolName.CTProtocolID)
    //             }
    //           }
    //         }
    //         this._responseType = 'true'
    //         this.selectedSponsor = this._tempSelectedSponsor
    //       }
    //     }
    //   }


    // } else if (this.selectedSponsor.length == 3) {
    //   if (deletedItem == 'Trial Type List') {

    //     this._allAccebratefilterResponse = this.dashBoardServices.get_accerateFilterALLResponse();
    //     this._sponsorfilterResponse = this.dashBoardServices.get_SponTypeSetFilterElement();
    //     this._protocolNameFilterResponse = this.dashBoardServices.get_ProtocolTypeFilterElement();

    //     for (let i = 0; i < this._sponsorfilterResponse.length; i++) {
    //       for (const allList of this._allAccebratefilterResponse) {
    //         if (allList.CleanSponsor === this._sponsorfilterResponse[i].CleanSponsor) {
    //           this._tempCIProtocolIDForSponsor.push(allList.CTProtocolID)
    //         }
    //       }
    //     }
    //     for (let i = 0; i < this._protocolNameFilterResponse.length; i++) {
    //       for (const allListProtocolName of this._allAccebratefilterResponse) {
    //         if (allListProtocolName.ProtocolName === this._protocolNameFilterResponse[i].protocolName) {
    //           this._tempCIProtocolIDForProtocolName.push(allListProtocolName.CTProtocolID)
    //         }
    //       }
    //     }
    //     for (const _tempCTPIDForSponsor of this._tempCIProtocolIDForSponsor) {
    //       for (const _tempCTPIDForProtocolName of this._tempCIProtocolIDForProtocolName) {
    //         if (_tempCTPIDForSponsor == _tempCTPIDForProtocolName) {
    //           this._ctProtocolID.push(_tempCTPIDForSponsor)
    //         }
    //       }
    //     }

    //     // this._ctProtocolID = ['ALL']
    //     // this.dashBoardServices.set_city_protocolID(this._ctProtocolID)
    //     this._responseType = 'true'
    //     this.selectedSponsor = [{
    //       name: 'Sponsor'
    //     },
    //     {
    //       name: 'Protocol Name'
    //     }]

    //   } else if (deletedItem == 'Sponsor') {
    //     this._allAccebratefilterResponse = this.dashBoardServices.get_accerateFilterALLResponse();
    //     this._trailTypeFilterResponse = this.dashBoardServices.get_TrailTypeSetFilterElement();
    //     this._protocolNameFilterResponse = this.dashBoardServices.get_ProtocolTypeFilterElement();

    //     for (let i = 0; i < this._trailTypeFilterResponse.length; i++) {
    //       for (const allListTrailType of this._allAccebratefilterResponse) {
    //         if (allListTrailType.TrialListType == this._trailTypeFilterResponse[i].TrialListType) {
    //           this._tempCIProtocolIDForTrailType.push(allListTrailType.CTProtocolID)
    //         }
    //       }
    //     }

    //     for (let i = 0; i < this._protocolNameFilterResponse.length; i++) {
    //       for (const allListSponsorList of this._allAccebratefilterResponse) {
    //         if (allListSponsorList.ProtocolName == this._protocolNameFilterResponse[i].protocolName) {
    //           this._tempCIProtocolIDForProtocolName.push(allListSponsorList.CTProtocolID)
    //         }
    //       }
    //     }

    //     for (const _tempCTPIDForTrailType of this._tempCIProtocolIDForTrailType) {
    //       for (const _tempCTPIDForProtocolName of this._tempCIProtocolIDForProtocolName) {
    //         if (_tempCTPIDForTrailType == _tempCTPIDForProtocolName) {
    //           this._ctProtocolID.push(_tempCTPIDForTrailType)
    //         }
    //       }
    //     }

    //     this._responseType = 'true'
    //     this.selectedSponsor = [{
    //       name: 'Trial Type List'
    //     },
    //     {
    //       name: 'Protocol Name'
    //     }]

    //   } else if (deletedItem == 'Protocol Name') {

    //     this._allAccebratefilterResponse = this.dashBoardServices.get_accerateFilterALLResponse();
    //     this._trailTypeFilterResponse = this.dashBoardServices.get_TrailTypeSetFilterElement();
    //     this._sponsorfilterResponse = this.dashBoardServices.get_SponTypeSetFilterElement();

    //     for (let i = 0; i < this._trailTypeFilterResponse.length; i++) {
    //       for (const allListTrailType of this._allAccebratefilterResponse) {
    //         if (allListTrailType.TrialListType == this._trailTypeFilterResponse[i].TrialListType) {
    //           this._tempCIProtocolIDForTrailType.push(allListTrailType.CTProtocolID)
    //         }
    //       }
    //     }

    //     for (let i = 0; i < this._sponsorfilterResponse.length; i++) {
    //       for (const allListSponsorList of this._allAccebratefilterResponse) {
    //         if (allListSponsorList.CleanSponsor == this._sponsorfilterResponse[i].CleanSponsor) {
    //           this._tempCIProtocolIDForSponsor.push(allListSponsorList.CTProtocolID)
    //         }
    //       }
    //     }

    //     for (const _tempCTPIDForTrailType of this._tempCIProtocolIDForTrailType) {
    //       for (const _tempCTPIDForSponsor of this._tempCIProtocolIDForSponsor) {
    //         if (_tempCTPIDForTrailType == _tempCTPIDForSponsor) {
    //           this._ctProtocolID.push(_tempCTPIDForTrailType)
    //         }
    //       }
    //     }
    //     this._responseType = 'true'
    //     this.selectedSponsor = [{
    //       name: 'Trial Type List'
    //     },
    //     {
    //       name: 'Sponsor'
    //     }]
    //   }
    // }
    // localStorage.setItem('dashBoardActiveType',JSON.stringify(this.selectedSponsor))
    // this.dashBoard.selectType(this._responseType)
    // this.dashBoard.updateSponsorNameRestDashboard(this._ctProtocolID);
  }
  revertHomePage(){
  
      this._ctProtocolID = ['ALL']
      this.dashBoardServices.set_city_protocolID(this._ctProtocolID)
      this._responseType = 'false'
     
      this.selectedSponsor = [{
        name: ''
      }]

    localStorage.setItem('dashBoardActiveType',JSON.stringify(this.selectedSponsor))
    this.dashBoard.selectType(this._responseType)
    this.dashBoard.updateSponsorNameRestDashboard(this._ctProtocolID);
  }
  deleteFilter(deletedItem){
    this._ctProtocolID = []
    this._tempCIProtocolIDForSponsor = []
    this._tempCIProtocolIDForProtocolName = []
    this._tempCIProtocolIDForTrailType = []  
    if (this.selectedSponsor.length == 1) {

      this._accelarateFilterType = this.dashBoardServices.get_AccelarateFilterType();
      if(this._accelarateFilterType.length>1){
        this._ctProtocolID = ['ALL']
        this.dashBoardServices.set_city_protocolID(this._ctProtocolID)
        this._responseType = 'false'     
        this.selectedSponsor = [{
          name: ''
        }]
      }else {
        this._allAccebratefilterResponse = this.dashBoardServices.get_accerateFilterALLResponse();
        for(const _accelarateFilterTypes of this._allAccebratefilterResponse){
          if(_accelarateFilterTypes.TrialListType == this._accelarateFilterType[0]){
            this._ctProtocolID.push(_accelarateFilterTypes.CTProtocolID)
          }
        }
        this.dashBoardServices.set_city_protocolID(this._ctProtocolID)
        this._responseType = 'false'     
        this.selectedSponsor = [{
          name: ''
        }]
      }


      // this._ctProtocolID = ['ALL']
      // this.dashBoardServices.set_city_protocolID(this._ctProtocolID)
      // this._responseType = 'false'     
      // this.selectedSponsor = [{
      //   name: ''
      // }]
    } else if (this.selectedSponsor.length == 2) {
      this._tempSelectedSponsor = []
      for (let i = 0; i < this.selectedSponsor.length; i++) {
        if (this.selectedSponsor[i].name == deletedItem) {

        } else {
          this._tempSelectedSponsor = [{
            name: this.selectedSponsor[i].name
          }]

          this.selectedSponsor = []
         // this.selectedSponsor = this._tempSelectedSponsor;

          if (this._tempSelectedSponsor[0].name == 'Trial Type List') {
            this._allAccebratefilterResponse = this.dashBoardServices.get_accerateFilterALLResponse();
            this._trailTypeFilterResponse = this.dashBoardServices.get_TrailTypeSetFilterElement();

            // for (let i = 0; i < this._trailTypeFilterResponse.length; i++) {
              for (const allListTrailType of this._allAccebratefilterResponse) {
                if (allListTrailType.TrialListType == this._trailTypeFilterResponse) {
                  this._ctProtocolID.push(allListTrailType.CTProtocolID)
                }
              }
            // }

            this._responseType = 'true'
            this.selectedSponsor = this._tempSelectedSponsor
           
          } else if (this._tempSelectedSponsor[0].name == 'Sponsor') {
            this._allAccebratefilterResponse = this.dashBoardServices.get_accerateFilterALLResponse();
            this._sponsorfilterResponse = this.dashBoardServices.get_SponTypeSetFilterElement();
            for (let i = 0; i < this._sponsorfilterResponse.length; i++) {
              for (const allList of this._allAccebratefilterResponse) {
                if (allList.CleanSponsor === this._sponsorfilterResponse[i].CleanSponsor) {
                  this._ctProtocolID.push(allList.CTProtocolID)
                }
              }
            }
            this._responseType = 'true'
            this._selectedType = this._tempSelectedSponsor
          } else if (this._tempSelectedSponsor[0].name == 'Protocol Name') {
            this._allAccebratefilterResponse = this.dashBoardServices.get_accerateFilterALLResponse();
            this._protocolNameFilterResponse = this.dashBoardServices.get_ProtocolTypeFilterElement();
            for (let i = 0; i < this._protocolNameFilterResponse.length; i++) {
              for (const allListProtocolName of this._allAccebratefilterResponse) {
                if (allListProtocolName.ProtocolName === this._protocolNameFilterResponse[i].protocolName) {
                  this._ctProtocolID.push(allListProtocolName.CTProtocolID)
                }
              }
            }
            this._responseType = 'true'
            this.selectedSponsor = this._tempSelectedSponsor
          }
        }
      }


    } else if (this.selectedSponsor.length == 3) {
      if (deletedItem == 'Trial Type List') {

        this._allAccebratefilterResponse = this.dashBoardServices.get_accerateFilterALLResponse();
        this._sponsorfilterResponse = this.dashBoardServices.get_SponTypeSetFilterElement();
        this._protocolNameFilterResponse = this.dashBoardServices.get_ProtocolTypeFilterElement();

        for (let i = 0; i < this._sponsorfilterResponse.length; i++) {
          for (const allList of this._allAccebratefilterResponse) {
            if (allList.CleanSponsor === this._sponsorfilterResponse[i].CleanSponsor) {
              this._tempCIProtocolIDForSponsor.push(allList.CTProtocolID)
            }
          }
        }
        for (let i = 0; i < this._protocolNameFilterResponse.length; i++) {
          for (const allListProtocolName of this._allAccebratefilterResponse) {
            if (allListProtocolName.ProtocolName === this._protocolNameFilterResponse[i].protocolName) {
              this._tempCIProtocolIDForProtocolName.push(allListProtocolName.CTProtocolID)
            }
          }
        }
        for (const _tempCTPIDForSponsor of this._tempCIProtocolIDForSponsor) {
          for (const _tempCTPIDForProtocolName of this._tempCIProtocolIDForProtocolName) {
            if (_tempCTPIDForSponsor == _tempCTPIDForProtocolName) {
              this._ctProtocolID.push(_tempCTPIDForSponsor)
            }
          }
        }

        // this._ctProtocolID = ['ALL']
        // this.dashBoardServices.set_city_protocolID(this._ctProtocolID)
        this._responseType = 'true'
        this.selectedSponsor = [{
          name: 'Sponsor'
        },
        {
          name: 'Protocol Name'
        }]

      } else if (deletedItem == 'Sponsor') {
        this._allAccebratefilterResponse = this.dashBoardServices.get_accerateFilterALLResponse();
        this._trailTypeFilterResponse = this.dashBoardServices.get_TrailTypeSetFilterElement();
        this._protocolNameFilterResponse = this.dashBoardServices.get_ProtocolTypeFilterElement();

        // for (let i = 0; i < this._trailTypeFilterResponse.length; i++) {
          for (const allListTrailType of this._allAccebratefilterResponse) {
            if (allListTrailType.TrialListType == this._trailTypeFilterResponse) {
              this._tempCIProtocolIDForTrailType.push(allListTrailType.CTProtocolID)
            }
          }
        // }

        for (let i = 0; i < this._protocolNameFilterResponse.length; i++) {
          for (const allListSponsorList of this._allAccebratefilterResponse) {
            if (allListSponsorList.ProtocolName == this._protocolNameFilterResponse[i].protocolName) {
              this._tempCIProtocolIDForProtocolName.push(allListSponsorList.CTProtocolID)
            }
          }
        }

        for (const _tempCTPIDForTrailType of this._tempCIProtocolIDForTrailType) {
          for (const _tempCTPIDForProtocolName of this._tempCIProtocolIDForProtocolName) {
            if (_tempCTPIDForTrailType == _tempCTPIDForProtocolName) {
              this._ctProtocolID.push(_tempCTPIDForTrailType)
            }
          }
        }

        this._responseType = 'true'
        this.selectedSponsor = [{
          name: 'Trial Type List'
        },
        {
          name: 'Protocol Name'
        }]

      } else if (deletedItem == 'Protocol Name') {

        this._allAccebratefilterResponse = this.dashBoardServices.get_accerateFilterALLResponse();
        this._trailTypeFilterResponse = this.dashBoardServices.get_TrailTypeSetFilterElement();
        this._sponsorfilterResponse = this.dashBoardServices.get_SponTypeSetFilterElement();

        // for (let i = 0; i < this._trailTypeFilterResponse.length; i++) {
          for (const allListTrailType of this._allAccebratefilterResponse) {
            if (allListTrailType.TrialListType == this._trailTypeFilterResponse) {
              this._tempCIProtocolIDForTrailType.push(allListTrailType.CTProtocolID)
            }
          }
        // }

        for (let i = 0; i < this._sponsorfilterResponse.length; i++) {
          for (const allListSponsorList of this._allAccebratefilterResponse) {
            if (allListSponsorList.CleanSponsor == this._sponsorfilterResponse[i].CleanSponsor) {
              this._tempCIProtocolIDForSponsor.push(allListSponsorList.CTProtocolID)
            }
          }
        }

        for (const _tempCTPIDForTrailType of this._tempCIProtocolIDForTrailType) {
          for (const _tempCTPIDForSponsor of this._tempCIProtocolIDForSponsor) {
            if (_tempCTPIDForTrailType == _tempCTPIDForSponsor) {
              this._ctProtocolID.push(_tempCTPIDForTrailType)
            }
          }
        }
        this._responseType = 'true'
        this.selectedSponsor = [{
          name: 'Trial Type List'
        },
        {
          name: 'Sponsor'
        }]
      }
    }
    localStorage.setItem('dashBoardActiveType',JSON.stringify(this.selectedSponsor))
    this.dashBoard.selectType(this._responseType)
    this.dashBoard.updateSponsorNameRestDashboard(this._ctProtocolID);
  }

  onsponsornameChanged() {
    this.dashBoard.updateSponsorNameRestDashboard(this.sponsorSelect);
  }
  ngOnDestroy() {
    if (this._forCastsessionTimeOut != undefined)
      this._forCastsessionTimeOut.unsubscribe();
    if (this._IsExacata != undefined)
      this._IsExacata.unsubscribe();
    if (this._messageReadExternalSource != undefined)
      this._messageReadExternalSource.unsubscribe();
    if (this._sponsorAPIResponse != undefined)
      this._sponsorAPIResponse.unsubscribe()
    if (this._sponsorList != undefined)
      this._sponsorList.unsubscribe();
    if (this._selectType != undefined)
      this._selectType.unsubscribe();
     if(this.IsDrawerAPIState != undefined)
     this.IsDrawerAPIState.unsubscribe() 
  }
  backButtonActivity() {
    
    this.dashBoard.headerStatusValue('')
    this.dashBoard.forCastDate('')
    this.dashBoard.exactaDisplayTable('false')
    localStorage.removeItem('noOfClick')
    
    clearTimeout(this.interval);
    clearInterval(this.interval)
    localStorage.setItem('clearSession', 'true')
    localStorage.removeItem('noOfClick')
    localStorage.removeItem('selectedSponsor');
    localStorage.removeItem('dashBoardActiveType')
    // this.idle.clearInterrupts();
    // this.dashBoard.clearsessionTimeOut('true')
    this.userInactive.unsubscribe();
    this.dashBoard.updateSponsorNameRestDashboard('');
    this.dashBoard.batchfirstLoad('')
    this.dashBoard.batchSecondLoadMethod('')
    this.router.navigate(["home/landing"]);
  }
  getBaseUrl(): string {
    var currentAbsoluteUrl = window.location.href;
    var currentRelativeUrl = this.router.url;
    var index = currentAbsoluteUrl.indexOf(currentRelativeUrl);
    var baseUrl: string = currentAbsoluteUrl.substring(0, index);
    return baseUrl;

  }
  closeDrawer(reason: string) {
    
    this.drawer.close();
  }
  stopPropogate(){
    this.dashBoard.stop_collapse('true')
  }

}
