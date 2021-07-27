import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KoAnalysisMainComponent } from './ko-analysis-main.component';

describe('KoAnalysisMainComponent', () => {
  let component: KoAnalysisMainComponent;
  let fixture: ComponentFixture<KoAnalysisMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KoAnalysisMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KoAnalysisMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
