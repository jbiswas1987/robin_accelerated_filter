import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForcastKitsInBarGraphComponent } from './forcast-kits-in-bar-graph.component';

describe('ForcastKitsInBarGraphComponent', () => {
  let component: ForcastKitsInBarGraphComponent;
  let fixture: ComponentFixture<ForcastKitsInBarGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForcastKitsInBarGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForcastKitsInBarGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
