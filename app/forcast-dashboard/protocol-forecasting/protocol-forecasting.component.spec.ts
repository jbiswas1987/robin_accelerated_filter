import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocolForecastingComponent } from './protocol-forecasting.component';

describe('ProtocolForecastingComponent', () => {
  let component: ProtocolForecastingComponent;
  let fixture: ComponentFixture<ProtocolForecastingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtocolForecastingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtocolForecastingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
