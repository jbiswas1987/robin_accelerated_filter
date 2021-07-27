import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KoAnalysisStackComponent } from './ko-analysis-stack.component';

describe('KoAnalysisStackComponent', () => {
  let component: KoAnalysisStackComponent;
  let fixture: ComponentFixture<KoAnalysisStackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KoAnalysisStackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KoAnalysisStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
