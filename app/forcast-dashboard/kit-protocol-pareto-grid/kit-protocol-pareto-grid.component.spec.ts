import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KitProtocolParetoGridComponent } from './kit-protocol-pareto-grid.component';

describe('KitProtocolParetoGridComponent', () => {
  let component: KitProtocolParetoGridComponent;
  let fixture: ComponentFixture<KitProtocolParetoGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KitProtocolParetoGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KitProtocolParetoGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
