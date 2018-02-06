import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenCloseShopComponent } from './open-close-shop.component';

describe('OpenCloseShopComponent', () => {
  let component: OpenCloseShopComponent;
  let fixture: ComponentFixture<OpenCloseShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenCloseShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenCloseShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
