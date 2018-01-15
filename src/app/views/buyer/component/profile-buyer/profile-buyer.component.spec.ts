import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBuyerComponent } from './profile-buyer.component';

describe('ProfileBuyerComponent', () => {
  let component: ProfileBuyerComponent;
  let fixture: ComponentFixture<ProfileBuyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileBuyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
