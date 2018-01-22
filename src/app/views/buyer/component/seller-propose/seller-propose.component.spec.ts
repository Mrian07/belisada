import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerProposeComponent } from './seller-propose.component';

describe('SellerProposeComponent', () => {
  let component: SellerProposeComponent;
  let fixture: ComponentFixture<SellerProposeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerProposeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerProposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
