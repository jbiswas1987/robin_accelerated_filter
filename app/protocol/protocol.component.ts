import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProtocolService } from "src/app/protocol/protocol.service";
import {BackServiceService} from '../common/back-service.service'
import { LocationStrategy } from '@angular/common';
@Component({
  selector: "app-protocol",
  templateUrl: "./protocol.component.html",
  styleUrls: ["./protocol.component.less"],
  providers: [ProtocolService],
})
export class ProtocolComponent implements OnInit {
  protocolId: any;
  constructor(private route: ActivatedRoute,private backServices : BackServiceService,
    private location: LocationStrategy) {
      history.pushState(null, null, window.location.href);
      this.location.onPopState(() => {  
      history.pushState(null, null, window.location.href);
      });  
    }

  ngOnInit() {}

  title = "Robin";

  backButtonActivity(){
   
    this.backServices.setBackButtonValue("true");
    this.backServices.setZoomLevelFilter('true')
    }


}
