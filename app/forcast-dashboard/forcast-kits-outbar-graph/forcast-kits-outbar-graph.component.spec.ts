import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForcastKitsOutbarGraphComponent } from './forcast-kits-outbar-graph.component';

describe('ForcastKitsOutbarGraphComponent', () => {
  let component: ForcastKitsOutbarGraphComponent;
  let fixture: ComponentFixture<ForcastKitsOutbarGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForcastKitsOutbarGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForcastKitsOutbarGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
