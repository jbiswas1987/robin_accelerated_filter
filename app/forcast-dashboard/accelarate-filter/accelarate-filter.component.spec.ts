import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccelarateFilterComponent } from './accelarate-filter.component';

describe('AccelarateFilterComponent', () => {
  let component: AccelarateFilterComponent;
  let fixture: ComponentFixture<AccelarateFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccelarateFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccelarateFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
