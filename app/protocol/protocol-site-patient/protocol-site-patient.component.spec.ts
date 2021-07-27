import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocolSitePatientComponent } from './protocol-site-patient.component';

describe('ProtocolSitePatientComponent', () => {
  let component: ProtocolSitePatientComponent;
  let fixture: ComponentFixture<ProtocolSitePatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtocolSitePatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtocolSitePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
