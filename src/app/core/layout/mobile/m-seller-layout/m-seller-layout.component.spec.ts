import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MSellerLayoutComponent } from './m-seller-layout.component';

describe('MSellerLayoutComponent', () => {
  let component: MSellerLayoutComponent;
  let fixture: ComponentFixture<MSellerLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MSellerLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MSellerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
