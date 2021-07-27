import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MccProtocolListComponent } from './mcc-protocol-list.component';

describe('MccProtocolListComponent', () => {
  let component: MccProtocolListComponent;
  let fixture: ComponentFixture<MccProtocolListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MccProtocolListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MccProtocolListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
