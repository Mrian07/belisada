import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopLayoutSellerComponent } from './top-layout-seller.component';

describe('TopLayoutSellerComponent', () => {
  let component: TopLayoutSellerComponent;
  let fixture: ComponentFixture<TopLayoutSellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopLayoutSellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopLayoutSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
