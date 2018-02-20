import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MAvatarBuyerComponent } from './m-avatar-buyer.component';

describe('MAvatarBuyerComponent', () => {
  let component: MAvatarBuyerComponent;
  let fixture: ComponentFixture<MAvatarBuyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MAvatarBuyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MAvatarBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
