import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MProfileBuyerComponent } from './m-profile-buyer.component';

describe('MProfileBuyerComponent', () => {
  let component: MProfileBuyerComponent;
  let fixture: ComponentFixture<MProfileBuyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MProfileBuyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MProfileBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
