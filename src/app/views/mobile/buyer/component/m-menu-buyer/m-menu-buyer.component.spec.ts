import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MMenuBuyerComponent } from './m-menu-buyer.component';

describe('MMenuBuyerComponent', () => {
  let component: MMenuBuyerComponent;
  let fixture: ComponentFixture<MMenuBuyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MMenuBuyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MMenuBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
