import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KitsProtocolComponent } from './kits-protocol.component';

describe('KitsProtocolComponent', () => {
  let component: KitsProtocolComponent;
  let fixture: ComponentFixture<KitsProtocolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KitsProtocolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KitsProtocolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
