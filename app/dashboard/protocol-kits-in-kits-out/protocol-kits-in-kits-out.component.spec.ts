import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocolKitsInKitsOutComponent } from './protocol-kits-in-kits-out.component';

describe('ProtocolKitsInKitsOutComponent', () => {
  let component: ProtocolKitsInKitsOutComponent;
  let fixture: ComponentFixture<ProtocolKitsInKitsOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtocolKitsInKitsOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtocolKitsInKitsOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
