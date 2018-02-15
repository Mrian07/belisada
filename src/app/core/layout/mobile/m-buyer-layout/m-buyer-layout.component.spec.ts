import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MBuyerLayoutComponent } from './m-buyer-layout.component';

describe('MBuyerLayoutComponent', () => {
  let component: MBuyerLayoutComponent;
  let fixture: ComponentFixture<MBuyerLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MBuyerLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MBuyerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
