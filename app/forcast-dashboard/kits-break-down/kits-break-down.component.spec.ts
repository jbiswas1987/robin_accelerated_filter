import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KitsBreakDownComponent } from './kits-break-down.component';

describe('KitsBreakDownComponent', () => {
  let component: KitsBreakDownComponent;
  let fixture: ComponentFixture<KitsBreakDownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KitsBreakDownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KitsBreakDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
