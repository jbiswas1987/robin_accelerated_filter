import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMccMetricsDetailsComponent } from './dashboard-mcc-metrics-details.component';

describe('DashboardMccMetricsDetailsComponent', () => {
  let component: DashboardMccMetricsDetailsComponent;
  let fixture: ComponentFixture<DashboardMccMetricsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardMccMetricsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMccMetricsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
