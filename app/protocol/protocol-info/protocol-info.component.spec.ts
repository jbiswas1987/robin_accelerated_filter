import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocolInfoComponent } from './protocol-info.component';

describe('ProtocolInfoComponent', () => {
  let component: ProtocolInfoComponent;
  let fixture: ComponentFixture<ProtocolInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtocolInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtocolInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
