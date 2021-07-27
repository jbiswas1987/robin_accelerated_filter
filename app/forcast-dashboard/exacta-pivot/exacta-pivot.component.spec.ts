import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExactaPivotComponent } from './exacta-pivot.component';

describe('ExactaPivotComponent', () => {
  let component: ExactaPivotComponent;
  let fixture: ComponentFixture<ExactaPivotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExactaPivotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExactaPivotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
