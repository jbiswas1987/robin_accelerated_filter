import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KoDemandParetoAnalysisComponent } from './ko-demand-pareto-analysis.component';

describe('KoDemandParetoAnalysisComponent', () => {
  let component: KoDemandParetoAnalysisComponent;
  let fixture: ComponentFixture<KoDemandParetoAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KoDemandParetoAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KoDemandParetoAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
