import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocolsInfoComponent } from './protocols-info.component';

describe('ProtocolsInfoComponent', () => {
  let component: ProtocolsInfoComponent;
  let fixture: ComponentFixture<ProtocolsInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtocolsInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtocolsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
