import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthsForwardComponent } from './months-forward.component';

describe('MonthsForwardComponent', () => {
  let component: MonthsForwardComponent;
  let fixture: ComponentFixture<MonthsForwardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthsForwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthsForwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
