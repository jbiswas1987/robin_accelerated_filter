import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualVforecastComponent } from './actual-vforecast.component';

describe('ActualVforecastComponent', () => {
  let component: ActualVforecastComponent;
  let fixture: ComponentFixture<ActualVforecastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualVforecastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualVforecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
