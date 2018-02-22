import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MNewSellerComponent } from './m-new-seller.component';

describe('MNewSellerComponent', () => {
  let component: MNewSellerComponent;
  let fixture: ComponentFixture<MNewSellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MNewSellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MNewSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
