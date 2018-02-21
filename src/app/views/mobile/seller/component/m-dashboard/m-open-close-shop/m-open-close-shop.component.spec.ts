import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MOpenCloseShopComponent } from './m-open-close-shop.component';

describe('MOpenCloseShopComponent', () => {
  let component: MOpenCloseShopComponent;
  let fixture: ComponentFixture<MOpenCloseShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MOpenCloseShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MOpenCloseShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
