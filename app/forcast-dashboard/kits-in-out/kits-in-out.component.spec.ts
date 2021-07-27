import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KitsInOutComponent } from './kits-in-out.component';

describe('KitsInOutComponent', () => {
  let component: KitsInOutComponent;
  let fixture: ComponentFixture<KitsInOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KitsInOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KitsInOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
