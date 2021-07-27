import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteProtocolComponent } from './site-protocol.component';

describe('SiteProtocolComponent', () => {
  let component: SiteProtocolComponent;
  let fixture: ComponentFixture<SiteProtocolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteProtocolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteProtocolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
