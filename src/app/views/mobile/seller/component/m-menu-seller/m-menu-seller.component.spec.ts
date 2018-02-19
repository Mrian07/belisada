import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MMenuSellerComponent } from './m-menu-seller.component';

describe('MMenuSellerComponent', () => {
  let component: MMenuSellerComponent;
  let fixture: ComponentFixture<MMenuSellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MMenuSellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MMenuSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
