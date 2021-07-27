import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KoAnalysisLineComponent } from './ko-analysis-line.component';

describe('KoAnalysisLineComponent', () => {
  let component: KoAnalysisLineComponent;
  let fixture: ComponentFixture<KoAnalysisLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KoAnalysisLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KoAnalysisLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
