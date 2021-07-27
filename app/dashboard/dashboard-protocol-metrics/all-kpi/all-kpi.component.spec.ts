import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllKpiComponent } from './all-kpi.component';

describe('AllKpiComponent', () => {
  let component: AllKpiComponent;
  let fixture: ComponentFixture<AllKpiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllKpiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
