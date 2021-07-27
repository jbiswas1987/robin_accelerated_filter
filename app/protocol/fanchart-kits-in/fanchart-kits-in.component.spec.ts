import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FanchartKitsINComponent } from './fanchart-kits-in.component';

describe('FanchartKitsINComponent', () => {
  let component: FanchartKitsINComponent;
  let fixture: ComponentFixture<FanchartKitsINComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FanchartKitsINComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FanchartKitsINComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
