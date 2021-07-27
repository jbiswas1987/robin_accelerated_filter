import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomLoadingCellRenderer.ComponentComponent } from './custom-loading-cell-renderer.component.component';

describe('CustomLoadingCellRenderer.ComponentComponent', () => {
  let component: CustomLoadingCellRenderer.ComponentComponent;
  let fixture: ComponentFixture<CustomLoadingCellRenderer.ComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomLoadingCellRenderer.ComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomLoadingCellRenderer.ComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
