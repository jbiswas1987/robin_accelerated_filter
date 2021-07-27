import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteBreakdownComponent } from './site-breakdown.component';

describe('SiteBreakdownComponent', () => {
  let component: SiteBreakdownComponent;
  let fixture: ComponentFixture<SiteBreakdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteBreakdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
