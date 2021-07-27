import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteMccComponent } from './site-mcc.component';

describe('SiteMccComponent', () => {
  let component: SiteMccComponent;
  let fixture: ComponentFixture<SiteMccComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteMccComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteMccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
