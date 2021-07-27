import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "src/app/dashboard/dashboard.component";
import { ProtocolComponent } from "src/app/protocol/protocol.component";
import { SiteComponent } from "src/app/site/site.component";
import { DashboardMccMetricsDetailsComponent } from "src/app/dashboard/dashboard-mcc-metrics-details/dashboard-mcc-metrics-details.component";
import { AuthGuard } from "../app/auth/auth.guard";
import { SignInComponent } from "./signin/signin.component";
import { MainComponent } from "./main/main.component";
import { InvestigatorInformation } from "./InvestigatorInfo/investigatorInformation.component";
import { ProtocolDetailsComponent } from "../app/protocol-details/protocol-details.component";
import { ProtocolsInfoComponent } from "../app/protocol/protocols-info/protocols-info.component";
import {ProtocolKitsInKitsOutScatterComponent} from '../app/forcast-dashboard/protocol-kits-in-kits-out-scatter/protocol-kits-in-kits-out-scatter.component'
import {HomeComponent} from '../../src/app/home/home.component'
import {ForcastDashboardComponent} from '../app/forcast-dashboard/forcast-dashboard.component'
import {KoAnalysisHomeComponent} from '../app/ko-analysis/ko-analysis-home/ko-analysis-home.component'
import {KoSupplierHomeComponent} from '../app/ko-supplier/ko-supplier-home/ko-supplier-home.component'

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "investigator/:sid/:sponsor",
    component: InvestigatorInformation,
    pathMatch: "full",
  },
  {
    path: "protocols/:id/:sponsor",
    component: ProtocolDetailsComponent,
    pathMatch: "full",
  },
  {
    path: "protocol/:id/:mccid",
    component: DashboardMccMetricsDetailsComponent,
  },
  {path : "kitsInOutScattered/:id/:type",component:ProtocolKitsInKitsOutScatterComponent},
  {
    path: "home",
    component: MainComponent,
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      {path:'landing',component:HomeComponent},
      {path:'kitsforecasting', component:ForcastDashboardComponent},
      {path:'koanalysis', component:KoAnalysisHomeComponent},
      {path:'Kits-Components-Forecast', component:KoSupplierHomeComponent},
      {
        path: "dashboard",
        component: DashboardComponent,
        // canActivate: [AuthGuard],
      },
      {
        path: "protocol/:id",
        component: ProtocolComponent,
      },
      { path: "site/:sid", component: SiteComponent },
      { path: "mcc/:mccid", component: DashboardMccMetricsDetailsComponent },
    
      // {
      //   path: "protocol/:id/:mccid",
      //   component: DashboardMccMetricsDetailsComponent,
      // },
    ],
  },
  { path: "login", component: SignInComponent },
  { path: "**", redirectTo: "/login", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
