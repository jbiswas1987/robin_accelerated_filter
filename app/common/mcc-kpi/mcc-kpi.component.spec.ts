import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MccKpiComponent } from './mcc-kpi.component';

describe('MccKpiComponent', () => {
  let component: MccKpiComponent;
  let fixture: ComponentFixture<MccKpiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MccKpiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MccKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
