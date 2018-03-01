import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MSellerCenterComponent } from './m-seller-center.component';

describe('MSellerCenterComponent', () => {
  let component: MSellerCenterComponent;
  let fixture: ComponentFixture<MSellerCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MSellerCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MSellerCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
