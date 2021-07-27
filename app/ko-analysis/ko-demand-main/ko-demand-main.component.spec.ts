import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KoDemandMainComponent } from './ko-demand-main.component';

describe('KoDemandMainComponent', () => {
  let component: KoDemandMainComponent;
  let fixture: ComponentFixture<KoDemandMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KoDemandMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KoDemandMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
