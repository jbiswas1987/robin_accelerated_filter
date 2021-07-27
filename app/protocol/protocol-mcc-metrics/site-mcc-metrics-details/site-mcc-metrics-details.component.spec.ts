import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteMccMetricsDetailsComponent } from './site-mcc-metrics-details.component';

describe('SiteMccMetricsDetailsComponent', () => {
  let component: SiteMccMetricsDetailsComponent;
  let fixture: ComponentFixture<SiteMccMetricsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteMccMetricsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteMccMetricsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
