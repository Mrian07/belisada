import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderBuyerComponent } from './header-buyer.component';

describe('HeaderBuyerComponent', () => {
  let component: HeaderBuyerComponent;
  let fixture: ComponentFixture<HeaderBuyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderBuyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
