import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KoSupplierHomeComponent } from './ko-supplier-home.component';

describe('KoSupplierHomeComponent', () => {
  let component: KoSupplierHomeComponent;
  let fixture: ComponentFixture<KoSupplierHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KoSupplierHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KoSupplierHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
