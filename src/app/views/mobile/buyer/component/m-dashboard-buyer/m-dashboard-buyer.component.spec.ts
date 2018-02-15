import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MDashboardBuyerComponent } from './m-dashboard-buyer.component';

describe('MDashboardBuyerComponent', () => {
  let component: MDashboardBuyerComponent;
  let fixture: ComponentFixture<MDashboardBuyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MDashboardBuyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MDashboardBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
