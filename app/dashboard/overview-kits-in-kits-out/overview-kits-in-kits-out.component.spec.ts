import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewKitsInKitsOutComponent } from './overview-kits-in-kits-out.component';

describe('OverviewKitsInKitsOutComponent', () => {
  let component: OverviewKitsInKitsOutComponent;
  let fixture: ComponentFixture<OverviewKitsInKitsOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewKitsInKitsOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewKitsInKitsOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
