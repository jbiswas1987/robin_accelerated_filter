import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartDistributionComponent } from './chart-distribution.component';

describe('ChartDistributionComponent', () => {
  let component: ChartDistributionComponent;
  let fixture: ComponentFixture<ChartDistributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartDistributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
