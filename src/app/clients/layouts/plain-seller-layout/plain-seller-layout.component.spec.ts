import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlainSellerLayoutComponent } from './plain-seller-layout.component';

describe('PlainSellerLayoutComponent', () => {
  let component: PlainSellerLayoutComponent;
  let fixture: ComponentFixture<PlainSellerLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlainSellerLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlainSellerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
