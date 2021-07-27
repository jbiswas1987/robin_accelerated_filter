import { NgModule, ErrorHandler } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GridModule, PipeModule } from "ng2-qgrid";
import { ThemeModule } from "ng2-qgrid/theme/material";
import { NgxEchartsModule } from "ngx-echarts";
import { MccKpiModule } from "../common/mcc-kpi/mcc-kpi.module";
import { MccModule } from "../mcc/mcc.module";
import { DemoMaterialModule } from "../material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { OverviewKitsInKitsOutComponent } from './overview-kits-in-kits-out/overview-kits-in-kits-out.component';
import {ForcastDashboardComponent} from './forcast-dashboard.component'
import {KitsInOutComponent} from './kits-in-out/kits-in-out.component'
import { ProtocolKitsInKitsOutComponent } from './protocol-kits-in-kits-out/protocol-kits-in-kits-out.component';
import { ProtocolKitsInKitsOutScatterComponent } from './protocol-kits-in-kits-out-scatter/protocol-kits-in-kits-out-scatter.component';
import { CountryKitsInkitsOutComponent } from './country-kits-inkits-out/country-kits-inkits-out.component';
import { KitsBreakDownComponent } from './kits-break-down/kits-break-down.component';
import { ForcastKitsInBarGraphComponent } from './forcast-kits-in-bar-graph/forcast-kits-in-bar-graph.component';
import { ForcastKitsOutbarGraphComponent } from './forcast-kits-outbar-graph/forcast-kits-outbar-graph.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ProtocolForecastingComponent } from './protocol-forecasting/protocol-forecasting.component';
import { TextColorPipe } from './text-color.pipe';
// import { NgxUIModule } from '@swimlane/ngx-ui'
// import { NgxUIModule } from '@swimlane/ngx-ui'
// import {MatSliderModule,MatSlideToggleModule} from '@angular/material/slider';
import {MatSliderModule,MatSlideToggleModule} from '@angular/material';

import { CountryLevelTextFormatPipe } from './country-level-text-format.pipe';
import { TextPaddingPipe } from './text-padding.pipe';
import { KitsInOutLineComponent } from './kits-in-out-line/kits-in-out-line.component';
import { KitsInOutLinePlotComponent } from './kits-in-out-line-plot/kits-in-out-line-plot.component';
import { KitsProtocolComponent } from './kits-protocol/kits-protocol.component';
// import { AgGridModule } from 'ag-grid-angular';

// import { AgGridModule } from '@ag-grid-community/angular';
// import { AgGridModule } from 'ag-grid-angular';
import { AgGridModule } from '@ag-grid-community/angular';
import { ExactaComponent } from './exacta/exacta.component';
import { ExactaPivotComponent } from './exacta-pivot/exacta-pivot.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { ActualVforecastComponent } from './actual-vforecast/actual-vforecast.component';
import { ForecastVactualPipe } from './forecast-vactual.pipe';
import {ExcelService} from '../../app/forcast-dashboard/excel.service';
import { KoDemandParetoAnalysisComponent } from './ko-demand-pareto-analysis/ko-demand-pareto-analysis.component';
import { KitProtocolParetoGridComponent } from './kit-protocol-pareto-grid/kit-protocol-pareto-grid.component';
import { CustomLoadingCellRenderer } from './custom-loading-cell-renderer.component/custom-loading-cell-renderer.component.component';
import { CustomTooltip } from './custom-tooltip/custom-tooltip.component'
import { PdfViewerModule } from 'ng2-pdf-viewer';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngb-modal';
import { ForecastDrawerComponent } from './forecast-drawer/forecast-drawer.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { StopPropagationDirective } from './stoppropagation.directive';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToggleButtonComponent } from './toggle-button/toggle-button.component';
import { AccelarateFilterComponent } from './accelarate-filter/accelarate-filter.component';
import { ToggleFilterComponent } from './toggle-filter/toggle-filter.component';
import { AcceleratedTrailsFilterComponent } from './accelerated-trails-filter/accelerated-trails-filter.component';
import { SearchPipe } from './search.pipe';
//import { AcceleratedTrailsFilterComponent } from './accelerated-trails-filter/accelerated-trails-latest-filter.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
    declarations: [
        OverviewKitsInKitsOutComponent,
        ForcastDashboardComponent,
        KitsInOutComponent,
        ProtocolKitsInKitsOutComponent,
        ProtocolKitsInKitsOutScatterComponent,
        CountryKitsInkitsOutComponent,
        KitsBreakDownComponent,
        ForcastKitsInBarGraphComponent,
        ForcastKitsOutbarGraphComponent,
        ProtocolForecastingComponent,
        TextColorPipe,
        CountryLevelTextFormatPipe,
        TextPaddingPipe,
        KitsInOutLineComponent,
        KitsInOutLinePlotComponent,
        KitsProtocolComponent,
        ExactaComponent,
        ExactaPivotComponent,
        ActualVforecastComponent,
        ForecastVactualPipe,
        KoDemandParetoAnalysisComponent,
        KitProtocolParetoGridComponent,
        CustomLoadingCellRenderer,
        CustomTooltip,
        ForecastDrawerComponent,
        StopPropagationDirective,
        ToggleButtonComponent,
        AccelarateFilterComponent,
        ToggleFilterComponent,
        AcceleratedTrailsFilterComponent,
        SearchPipe
    ],
    imports: [
        CommonModule,
        DemoMaterialModule,
        GridModule,
        PipeModule,
        ThemeModule,
        NgxEchartsModule,
        MccKpiModule,
        MccModule,
        FormsModule,
        ReactiveFormsModule,
        NgxSliderModule,
        MatSliderModule,
        MatSlideToggleModule,
        AgGridModule.withComponents([]),
        PdfViewerModule,
        GoogleChartsModule,
        // NgbModal
        ModalModule,
        // NgbModule
        NgMultiSelectDropDownModule,
        AutocompleteLibModule,
        ConfirmDialogModule,
        MatProgressSpinnerModule
    ],
    exports: [
        ProtocolKitsInKitsOutComponent,
        OverviewKitsInKitsOutComponent,
        KitsBreakDownComponent,
        MatSliderModule,
       
        
    ],
    providers: [ExcelService]
    //providers: [{ provide: ErrorHandler, useClass: GlobalErrorHandlerService }],
  })
  export class ForCastDashboardModule {}