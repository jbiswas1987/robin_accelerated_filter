import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocolSiteSunComponent } from './protocol-site-sun.component';

describe('ProtocolSiteSunComponent', () => {
  let component: ProtocolSiteSunComponent;
  let fixture: ComponentFixture<ProtocolSiteSunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtocolSiteSunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtocolSiteSunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
