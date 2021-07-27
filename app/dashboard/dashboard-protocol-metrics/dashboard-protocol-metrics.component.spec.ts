import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProtocolMetricsComponent } from './dashboard-protocol-metrics.component';

describe('DashboardProtocolMetricsComponent', () => {
  let component: DashboardProtocolMetricsComponent;
  let fixture: ComponentFixture<DashboardProtocolMetricsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardProtocolMetricsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardProtocolMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
