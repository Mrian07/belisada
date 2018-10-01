import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintProductComponent } from './complaint-product.component';

describe('ComplaintProductComponent', () => {
  let component: ComplaintProductComponent;
  let fixture: ComponentFixture<ComplaintProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
