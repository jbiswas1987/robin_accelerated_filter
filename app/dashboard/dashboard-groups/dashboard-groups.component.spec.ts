import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardGroupsComponent } from './dashboard-groups.component';

describe('DashboardGroupsComponent', () => {
  let component: DashboardGroupsComponent;
  let fixture: ComponentFixture<DashboardGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
