import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KitsInOutLineComponent } from './kits-in-out-line.component';

describe('KitsInOutLineComponent', () => {
  let component: KitsInOutLineComponent;
  let fixture: ComponentFixture<KitsInOutLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KitsInOutLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KitsInOutLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
