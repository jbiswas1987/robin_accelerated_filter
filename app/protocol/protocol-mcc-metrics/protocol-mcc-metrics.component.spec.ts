import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocolMccMetricsComponent } from './protocol-mcc-metrics.component';

describe('ProtocolMccMetricsComponent', () => {
  let component: ProtocolMccMetricsComponent;
  let fixture: ComponentFixture<ProtocolMccMetricsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtocolMccMetricsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtocolMccMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
