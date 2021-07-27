import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KitsInOutLinePlotComponent } from './kits-in-out-line-plot.component';

describe('KitsInOutLinePlotComponent', () => {
  let component: KitsInOutLinePlotComponent;
  let fixture: ComponentFixture<KitsInOutLinePlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KitsInOutLinePlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KitsInOutLinePlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
