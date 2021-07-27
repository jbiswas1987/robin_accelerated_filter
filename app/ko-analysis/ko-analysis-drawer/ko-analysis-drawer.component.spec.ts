import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KoAnalysisDrawerComponent } from './ko-analysis-drawer.component';

describe('KoAnalysisDrawerComponent', () => {
  let component: KoAnalysisDrawerComponent;
  let fixture: ComponentFixture<KoAnalysisDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KoAnalysisDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KoAnalysisDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
