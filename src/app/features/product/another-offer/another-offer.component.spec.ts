import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnotherOfferComponent } from './another-offer.component';

describe('AnotherOfferComponent', () => {
  let component: AnotherOfferComponent;
  let fixture: ComponentFixture<AnotherOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnotherOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnotherOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
