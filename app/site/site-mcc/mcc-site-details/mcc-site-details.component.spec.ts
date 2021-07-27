import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MccSiteDetailsComponent } from './mcc-site-details.component';

describe('MccSiteDetailsComponent', () => {
  let component: MccSiteDetailsComponent;
  let fixture: ComponentFixture<MccSiteDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MccSiteDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MccSiteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
