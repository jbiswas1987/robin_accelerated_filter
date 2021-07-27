import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSiteTableComponent } from './dashboard-site-table.component';

describe('DashboardSiteTableComponent', () => {
  let component: DashboardSiteTableComponent;
  let fixture: ComponentFixture<DashboardSiteTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardSiteTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSiteTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
