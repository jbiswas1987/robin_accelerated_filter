import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FanchartKitsOutComponent } from './fanchart-kits-out.component';

describe('FanchartKitsOutComponent', () => {
  let component: FanchartKitsOutComponent;
  let fixture: ComponentFixture<FanchartKitsOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FanchartKitsOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FanchartKitsOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
