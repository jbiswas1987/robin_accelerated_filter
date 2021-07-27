import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceleratedTrailsFilterComponent } from './accelerated-trails-filter.component';

describe('AcceleratedTrailsFilterComponent', () => {
  let component: AcceleratedTrailsFilterComponent;
  let fixture: ComponentFixture<AcceleratedTrailsFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceleratedTrailsFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceleratedTrailsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
