import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastDrawerComponent } from './forecast-drawer.component';

describe('ForecastDrawerComponent', () => {
  let component: ForecastDrawerComponent;
  let fixture: ComponentFixture<ForecastDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForecastDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
