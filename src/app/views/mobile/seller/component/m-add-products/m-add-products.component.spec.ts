import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MAddProductsComponent } from './m-add-products.component';

describe('MAddProductsComponent', () => {
  let component: MAddProductsComponent;
  let fixture: ComponentFixture<MAddProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MAddProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MAddProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
