import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientBreakdownComponent } from './patient-breakdown.component';

describe('PatientBreakdownComponent', () => {
  let component: PatientBreakdownComponent;
  let fixture: ComponentFixture<PatientBreakdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientBreakdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
