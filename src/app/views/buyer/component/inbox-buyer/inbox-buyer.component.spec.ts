import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxBuyerComponent } from './inbox-buyer.component';

describe('InboxBuyerComponent', () => {
  let component: InboxBuyerComponent;
  let fixture: ComponentFixture<InboxBuyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InboxBuyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
