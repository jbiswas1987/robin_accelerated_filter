import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderBreadCrumbComponent } from './header-bread-crumb.component';

describe('HeaderBreadCrumbComponent', () => {
  let component: HeaderBreadCrumbComponent;
  let fixture: ComponentFixture<HeaderBreadCrumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderBreadCrumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderBreadCrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
