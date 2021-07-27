import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KoAnalysisHomeComponent } from './ko-analysis-home.component';

describe('KoAnalysisHomeComponent', () => {
  let component: KoAnalysisHomeComponent;
  let fixture: ComponentFixture<KoAnalysisHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KoAnalysisHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KoAnalysisHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
