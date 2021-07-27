import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSessionComponent } from './dialog-session.component';

describe('DialogSessionComponent', () => {
  let component: DialogSessionComponent;
  let fixture: ComponentFixture<DialogSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
