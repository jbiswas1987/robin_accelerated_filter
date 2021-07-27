import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocolMccMetricsDetailsComponent } from './protocol-mcc-metrics-details.component';

describe('ProtocolMccMetricsDetailsComponent', () => {
  let component: ProtocolMccMetricsDetailsComponent;
  let fixture: ComponentFixture<ProtocolMccMetricsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtocolMccMetricsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtocolMccMetricsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
