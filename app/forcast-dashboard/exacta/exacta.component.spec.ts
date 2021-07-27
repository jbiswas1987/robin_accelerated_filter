import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExactaComponent } from './exacta.component';

describe('ExactaComponent', () => {
  let component: ExactaComponent;
  let fixture: ComponentFixture<ExactaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExactaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExactaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
