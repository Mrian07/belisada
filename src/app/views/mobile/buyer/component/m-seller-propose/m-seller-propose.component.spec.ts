import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MSellerProposeComponent } from './m-seller-propose.component';

describe('MSellerProposeComponent', () => {
  let component: MSellerProposeComponent;
  let fixture: ComponentFixture<MSellerProposeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MSellerProposeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MSellerProposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
