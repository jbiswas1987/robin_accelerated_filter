import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocolMetricsComponent } from './protocol-metrics.component';

describe('ProtocolMetricsComponent', () => {
  let component: ProtocolMetricsComponent;
  let fixture: ComponentFixture<ProtocolMetricsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtocolMetricsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtocolMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
