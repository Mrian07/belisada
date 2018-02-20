import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MAvatarSellerComponent } from './m-avatar-seller.component';

describe('MAvatarSellerComponent', () => {
  let component: MAvatarSellerComponent;
  let fixture: ComponentFixture<MAvatarSellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MAvatarSellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MAvatarSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
