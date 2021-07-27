import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitBreakdownComponent } from './visit-breakdown.component';

describe('VisitBreakdownComponent', () => {
  let component: VisitBreakdownComponent;
  let fixture: ComponentFixture<VisitBreakdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitBreakdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
