import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KoDemandComponent } from './ko-demand.component';

describe('KoDemandComponent', () => {
  let component: KoDemandComponent;
  let fixture: ComponentFixture<KoDemandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KoDemandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KoDemandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
