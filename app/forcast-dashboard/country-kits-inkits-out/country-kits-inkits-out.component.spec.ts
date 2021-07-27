import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryKitsInkitsOutComponent } from './country-kits-inkits-out.component';

describe('CountryKitsInkitsOutComponent', () => {
  let component: CountryKitsInkitsOutComponent;
  let fixture: ComponentFixture<CountryKitsInkitsOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryKitsInkitsOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryKitsInkitsOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
