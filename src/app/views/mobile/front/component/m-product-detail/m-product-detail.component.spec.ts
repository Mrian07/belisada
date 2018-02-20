import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MProductDetailComponent } from './m-product-detail.component';

describe('ProductDetailComponent', () => {
  let component: MProductDetailComponent;
  let fixture: ComponentFixture<MProductDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MProductDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
