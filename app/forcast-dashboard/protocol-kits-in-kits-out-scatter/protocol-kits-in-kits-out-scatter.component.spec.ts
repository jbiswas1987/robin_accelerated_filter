import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocolKitsInKitsOutScatterComponent } from './protocol-kits-in-kits-out-scatter.component';

describe('ProtocolKitsInKitsOutScatterComponent', () => {
  let component: ProtocolKitsInKitsOutScatterComponent;
  let fixture: ComponentFixture<ProtocolKitsInKitsOutScatterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtocolKitsInKitsOutScatterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtocolKitsInKitsOutScatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
