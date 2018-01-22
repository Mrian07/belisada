import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTerbaruComponent } from './product-terbaru.component';

describe('ProductTerbaruComponent', () => {
  let component: ProductTerbaruComponent;
  let fixture: ComponentFixture<ProductTerbaruComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductTerbaruComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTerbaruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
